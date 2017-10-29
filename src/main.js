const RiveScript = require('rivescript')
const path = require('path')
const ssbPath = path.join(__dirname, '.ssb')
const ssbServer = require('scuttlebot').use(require('scuttlebot/plugins/master'))
const ssbKeys = require('ssb-keys')
const keys = ssbKeys.loadOrCreateSync(path.join(ssbPath, 'secret'))
const ssbClient = require('ssb-client')
const sbot = require('./sbot')

const ssbConfig = require('ssb-config/inject')('ssb', {
  port: 8080,
  host: 'localhost',
  master: keys.id,
  keys: keys,
  path: ssbPath
})

const server = ssbServer(ssbConfig)
const chatbot = new RiveScript()

const clientOptions = {
  port: 8080,
  manifest: server.manifest(),
  key: keys.id
}

chatbot.loadFile([
  path.join(__dirname, 'chat-scripts', 'main.rive')
], () => {
  chatbot.sortReplies()

  ssbClient(keys, clientOptions, function (err, client) {
    if (err) throw new Error(err)
    /*
      here is the entry point of the app having instantiated
      the ssbClient, the ssbServer and the RiveScript chatbot
    */
    sbot(client, server, chatbot)
  })
}, (err) => {
  throw new Error(err)
})
