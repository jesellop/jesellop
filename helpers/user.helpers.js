module.exports = (hbs) => {
  hbs.registerHelper('isUser', (message, session, options) => {
    if (message.recipient._id.toString() === session._id.toString()) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
}