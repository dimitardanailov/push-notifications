const path = require('path')
const BASE_DIR = __dirname.replace('/utils', '')

module.exports.APP_DIR = path.resolve(BASE_DIR, 'app')
module.exports.DIST_DIR = path.resolve(BASE_DIR, 'dist')