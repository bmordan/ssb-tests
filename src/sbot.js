const pull = require('pull-stream')

module.exports = function (sbot, server) {
  sbot.publish({
    type: 'post',
    text: `My message created at ${new Date()}`
  }, (err, msg) => {
    if (err) return console.error(err)

    pull(
      sbot.createFeedStream(),
      pull.collect((err, msgs) => {
        if (err) return console.error(err)

        msgs.forEach((msg) => console.log(msg.value))
        sbot.close()
        server.close()
      })
    )
  })
}
