// https://github.com/typicode/json-server/issues/453#issuecomment-491251488
module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.originalUrl === '/message') {
    console.log(req.body)
    return res.jsonp({
      // For 'error' status:
      // status: 'error',
      // message: 'Cannot submit your form, please try again.'

      // for 'ok' status:
      status: 'ok',
      message: 'Your message has been sent successfully. We will be in touch soon.'
    })
  }
  next()
}
