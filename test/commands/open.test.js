const {expect, test} = require('@oclif/test')

describe('postico:open', () => {
  test
  .stderr()
  .command(['postico:open'])
  .exit(2)
  .it('errors without a team')

  /* DOESN'T WORK DUE TO INQUIRER
  test
  .stdout()
  .nock('https://api.heroku.com', api => api
    .get('/teams/test/addons')
    .reply(200, [
        {
          name: 'test-db',
          addon_service: {
            name: 'heroku-postgresql'
          },
          billing_entity: {
            name: 'test-app'
          },
          plan: {
            name: 'fake-plan'
          }
        },
        {
          name: 'test-ignored-addon',
          addon_service: {
            name: 'ignored-addon-type'
          }
        }
    ])
  )
  .command(['postico:open', '--team', 'test'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello test')
  })
  */
})
