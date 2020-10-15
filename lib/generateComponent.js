const path = require('path')

module.exports = name => {
    console.log(name)
    // console.log(path.parse(process.cwd()))
    console.log(path.dirname(process.cwd()))
    // console.log(path.resolve('./'))
}