const { Command, flags } = require('@heroku-cli/command')
const inquirer = require('inquirer')
const openurl = require('openurl')

class OpenCommand extends Command {

    static needsAuth = true

    static description = `Fetch a list of Heroku postgres databases for a team and connect in Postico
    ...
    `

    static flags = {
        // app: flags.app({ required: true, description: 'the app you want to open the DB for.' }),
        team: flags.team({ required: true }),
        verbose: flags.boolean({ description: 'Enable extra debug output.' })
    }

    async run() {
        const { flags: { verbose, team } } = this.parse(OpenCommand)

        const postgresAddons = await this.fetchPostgresDatabasesForTeam( team, verbose )
        if( !postgresAddons || postgresAddons.length === 0 ){
            this.error(`No postgres addons found. Please check your team name.`)
        }

        const selectedPostgresAddon = await this.selectAPostgresDatabase( postgresAddons, verbose )
        if( !selectedPostgresAddon ) return

        const postgresUrl = await this.fetchPostgresUrlForAddon( selectedPostgresAddon )
        if( !postgresUrl ){
            this.error(`Could not resolve the connection string for addon: ${selectedPostgresAddon.name}`)
        }

        openurl.open(`${postgresUrl}?nickname=${selectedPostgresAddon.name}`)
        this.exit()
    }

    async fetchPostgresUrlForAddon( addon ){
        const { body: config } = await this.heroku.get(`/apps/${addon.app.name}/config-vars`)
        return config[addon.config_vars[0]]
    }

    async fetchPostgresDatabasesForTeam( team, verbose = false ){
        const { body: addons } = await this.heroku.get(`/teams/${team}/addons`)

        const postgresAddonsByBillingApp = addons.reduce( ( collector, addon ) => {
            if( addon.addon_service.name !== 'heroku-postgresql' ) return collector

            // Heroku returns the same addon JSON object multiple times if the addon
            // is shared with multiple apps - first one wins
            if( !collector[addon.name] ) collector[addon.name] = addon

            return collector
        }, {} )

        return Object.values( postgresAddonsByBillingApp )
    }

    async selectAPostgresDatabase( postgresAddons, verbose ){

        let prompt = 'Select a heroku postgres database'

        const choices = []
        for( const addon of postgresAddons ){
          choices.push({
            name: `${addon.name} - ${addon.billing_entity.name} (${addon.plan.name})`,
            value: addon
          })
        }
    
        const responses = await inquirer.prompt([{
          name: 'database',
          message: prompt,
          type: 'list',
          choices
        }])
    
        const { database } = responses

        return database
      }

}

module.exports = OpenCommand
