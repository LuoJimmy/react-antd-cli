const {promisify} = require('util')
const figlet = promisify(require('figlet'))

const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))

module.exports = async name => {
    // 打印欢迎界面
    clear()
    const data = await figlet('antd-cli welcome')
    log(data)
    console.log('name', name)
}