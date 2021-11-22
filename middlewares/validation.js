const validation = (contactsScheme) => {
  return (req, res, next) => {
    const { error } = contactsScheme.validate(req.body)
    if (error) {
      error.status = 400
      next(error)
      return
    }
    next()
  }
}

module.exports = validation