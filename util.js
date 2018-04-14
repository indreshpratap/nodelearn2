var moment = require('moment');

function generateWelcomeMsg(name) {
  return "Hi " + name + " you are registered with us. And today is"+moment().format('dddd'); + " Thanks";
}

function sendMail(content) {
  console.log("Sending email for:", content);
  return true;
}

// module.exports = generateWelcomeMsg;
// module.exports = {
//   showMessage: function(name) {
//     var msg = generateWelcomeMsg(name);
//     console.log(msg);
//   }
// };

module.exports = function(name) {
        var msg = generateWelcomeMsg(name);
        console.log(msg);
      }
