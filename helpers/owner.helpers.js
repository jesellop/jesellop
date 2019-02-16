module.exports = (hbs) => {
    hbs.registerHelper('isOwner', (item, session, options) => {
      if (item.owner._id.toString() === session._id.toString()) {
        console.info('ItemOwner => ', item)
        return options.fn(this);
      } else {
        console.info('OtherItems => ', item)
        return options.inverse(this);
      }
    })
  }