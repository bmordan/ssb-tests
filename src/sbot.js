const pull = require('pull-stream')

// function helloWorld (sbot, server, chatbot) {
//   sbot.publish({
//     type: 'post',
//     text: `My message created at ${new Date()}`
//   }, (err, msg) => {
//     if (err) return console.error(err)
//
//     pull(
//       sbot.createFeedStream(),
//       pull.collect((err, msgs) => {
//         if (err) return console.error(err)
//
//         msgs.forEach((msg) => console.log(msg.value.content.text))
//
//         console.log({chatbot: chatbot.reply(null, 'hi bot')})
//
//         sbot.close()
//         server.close()
//       })
//     )
//   })
// }

module.exports = function (sbot, server, chatbot) {

}
