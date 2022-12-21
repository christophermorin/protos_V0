const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`LOGGER:`, ...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`LOGGER:`, ...params)
  }
}

module.exports = {
  info,
  error
}