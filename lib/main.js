const ssbClient = require('ssb-client')
// const ssbKeys = require('ssb-keys')
const ssbServer = require('scuttlebot')
  .use(require('scuttlebot/plugins/master'))
const sbot = require('./sbot')

// const keys = ssbKeys.generate()

const keys = {
  curve: 'ed25519',
  public: 'Z36q/TH7Q6jJUQ0ATzPZPq4fiSfCWLcWiejQPDh2g64=.ed25519',
  private: '9q/t0knEtuaZZ8ZoWUNg7yePWfz0Xpl7OCy7nezd83Rnfqr9MftDqMlRDQBPM9k+rh+JJ8JYtxaJ6NA8OHaDrg==.ed25519',
  id: '@Z36q/TH7Q6jJUQ0ATzPZPq4fiSfCWLcWiejQPDh2g64=.ed25519'
}

const server = ssbServer({
  port: 8080,
  temp: 'connect',
  host: 'localhost',
  master: keys.id,
  keys: keys
})

const clientOptions = {
  port: 8080,
  manifest: server.manifest()
}

ssbClient(keys, clientOptions, function (err, client) {
  if (err) throw new Error(err)
  sbot(client, server)
})
