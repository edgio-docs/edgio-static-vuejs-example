const { createDevServer } = require('@layer0/core/dev')

module.exports = function () {
  return createDevServer({
    label: 'Vue 3.0',
    command: (port) => `PORT=${port} npm run serve`,
    ready: [/listening on/i],
  })
}
