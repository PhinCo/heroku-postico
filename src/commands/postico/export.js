const { Command, flags } = require('@heroku-cli/command')
const HerokuApiCalls = require('../../lib/HerokuApiCalls')
const { cli } = require('cli-ux')
const bplist = require('bplist-creator')
const fs = require('fs')
const path = require('path')
const url = require('url')
const mkdirp = require('mkdirp')
const util = require('util')
const writeFile = util.promisify( fs.writeFile )
const colors = require('colors')

const POSTICO_COLORS = {
    GRAY: 0,
    RED: 1,
    ORANGE: 2,
    YELLOW: 3,
    TEAL: 4,
    BLUE: 5,
    GREEN: 6,
    MAGENTA: 7,
    PURPLE: 8
}

class ExportCommand extends Command {

    static needsAuth = true

    static description = `Export postico favorites for all postgres addons for a team`

    static flags = {
        team: flags.team({ required: true }),
        verbose: flags.boolean({ description: 'Enable extra debug output.' })
    }

    async run() {
        const { flags: { verbose, team } } = this.parse(ExportCommand)
        const apiCalls = new HerokuApiCalls(this)

        const postgresAddons = await apiCalls.fetchPostgresDatabaseAddonsForTeam( team )
        if (!postgresAddons || postgresAddons.length === 0) {
            this.error(`No postgres addons found. Please check your team name.`)
        }

        this.log(`Found ${postgresAddons.length} Heroku postgres database addons. Fetching connection strings.`)
        const resolvedAddons = await this.fetchPostgresUrlsForAddons( apiCalls, postgresAddons )


        const directoryPath = path.resolve( process.cwd(), `${team}-postico-favorites` )
        this.log(`Writing Postico Favorite Files.`)
        await mkdirp( directoryPath )

        await this.writePosticoFavoritesForAddons( directoryPath, resolvedAddons )
        this.log(`\n${colors.blue('Done. Drag & drop this folder into Postico:')} ${colors.yellow(directoryPath)}\n`)
        this.log( colors.red(`BE SURE TO PERMANENTLY DELETE THE FOLDER AFTER IMPORTING INTO POSTICO\n\n`) )

        this.exit()
    }

    async writePosticoFavoritesForAddons( directoryPath, resolvedAddons ){
        for( const { addon, connectionString } of resolvedAddons ){
            await this.writePosticoFavoriteForAddon( directoryPath, addon, connectionString )
        }
    }

    async writePosticoFavoriteForAddon( directoryPath, addon, connectionString ){
        const parsedConnectionString = url.parse( connectionString, true )

        const [user, password] = parsedConnectionString.auth.split(':')

    
        let colorIndex = POSTICO_COLORS.RED // Assume production
        if( addon.name.toLowerCase().indexOf('stage') > -1 ) colorIndex = POSTICO_COLORS.ORANGE
        if( addon.name.toLowerCase().indexOf('dev') > -1 ) colorIndex = POSTICO_COLORS.GRAY

        const favoriteData = {
            type: "at.eggerapps.PG-Commander.favorite",
            nickname: addon.name,
            user,
            password,
            host: parsedConnectionString.hostname,
            port: parsedConnectionString.port || 5432,
            database: parsedConnectionString.path.slice(1),
            colorIndex
        }

        await writeFile( path.resolve( directoryPath, `${addon.name}.pgfav` ), bplist( favoriteData ) )
    }

    async fetchPostgresUrlsForAddons( apiCalls, addons ){
        const output = []

        const simpleBar = cli.progress()
        simpleBar.start( addons.length, 0 )

        for( const addon of addons ){
            const connectionString = await apiCalls.fetchPostgresUrlForAddon( addon )
            output.push({
                addon,
                connectionString
            })
            simpleBar.update(output.length);
        }

        simpleBar.stop()

        return output
    }

}

module.exports = ExportCommand
