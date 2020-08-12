const { Command, flags } = require('@heroku-cli/command')
const inquirer = require('inquirer')
const openurl = require('openurl')
const HerokuApiCalls = require('../../lib/HerokuApiCalls')

class OpenCommand extends Command {

    static needsAuth = true

    static description = `Fetch Heroku postgres databases for a team to choose from a list and connect in Postico.`

    static flags = {
        team: flags.team({ required: true }),
        verbose: flags.boolean({ description: 'Enable extra debug output.' })
    }

    async run() {
        const { flags: { verbose, team } } = this.parse(OpenCommand)
		const apiCalls = new HerokuApiCalls( this );

        const postgresAddons = await apiCalls.fetchPostgresDatabaseAddonsForTeam( team )
        if( !postgresAddons || postgresAddons.length === 0 ){
            this.error(`No postgres addons found. Please check your team name.`)
        }

        const selectedPostgresAddon = await this.selectAPostgresDatabase( postgresAddons, verbose )
        if( !selectedPostgresAddon ) return

        const postgresUrl = await apiCalls.fetchPostgresUrlForAddon( selectedPostgresAddon )
        if( !postgresUrl ){
            this.error(`Could not resolve the connection string for addon: ${selectedPostgresAddon.name}`)
        }

        openurl.open(`${postgresUrl}?nickname=${selectedPostgresAddon.name}`)
        this.exit()
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
