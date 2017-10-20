const p = require('path')
const path = p.join(__dirname, '.ssb')
const ssbServer = require('scuttlebot')
  .use(require('scuttlebot/plugins/master'))
const ssbKeys = require('ssb-keys')
const keys = ssbKeys.loadOrCreateSync(p.join(path, 'secret'))
const ssbClient = require('ssb-client')
const sbot = require('./sbot')

const ssbConfig = require('ssb-config/inject')('ssb', {
  port: 8080,
  host: 'localhost',
  master: keys.id,
  keys,
  path
})

const server = ssbServer(ssbConfig)

const clientOptions = {
  port: 8080,
  manifest: server.manifest(),
  key: keys.id
}

ssbClient(keys, clientOptions, function (err, client) {
  if (err) throw new Error(err)
  sbot(client, server)
})
