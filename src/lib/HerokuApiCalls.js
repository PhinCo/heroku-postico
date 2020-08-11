
class HerokuApiCalls {

    constructor( command ){
        this.command = command
    }

    async fetchPostgresDatabaseAddonsForTeam( team ){
        const { body: addons } = await this.command.heroku.get(`/teams/${team}/addons`)

        const postgresAddonsByBillingApp = addons.reduce( ( collector, addon ) => {
            if( addon.addon_service.name !== 'heroku-postgresql' ) return collector

            // Heroku returns the same addon JSON object multiple times if the addon
            // is shared with multiple apps - first one wins
            if( !collector[addon.name] ) collector[addon.name] = addon

            return collector
        }, {} )

        return Object.values( postgresAddonsByBillingApp )
    }

    async fetchPostgresUrlForAddon( addon ){
        const { body: config } = await this.command.heroku.get(`/apps/${addon.app.name}/config-vars`)
        return config[addon.config_vars[0]]
    }

}

module.exports = HerokuApiCalls
