const { join } = require('path')
const { exit } = require('process')
const { DeploymentBuilder } = require('@layer0/core/deploy')

const appDir = process.cwd()
const builder = new DeploymentBuilder(appDir)

module.exports = async function build(options) {
  try {
    builder.clearPreviousBuildOutput()
    let command = 'npm run tailwindcss:build'
    await builder.exec(command)
    command = 'npm run build'
    await builder.exec(command)
    builder.addStaticAsset(join(appDir, 'dist'))
    await builder.build()
  } catch (e) {
    console.log(e)
    exit()
  }
}
