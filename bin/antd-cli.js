#!/usr/bin/env node
// console.log("hello antd-cli");
const { Command } = require('commander')
const program = new Command();
program.version(require('../package.json').version)

program
    .command('init <name>')
    .description('init project')
    .action(require('../lib/init'))

const generate = program
    .command('generate')
    .alias('g')
    .description('generate [module|page|component]')

generate
    .command('module <name>')
    .description('generate module <my-module-name>')
    .action(require('../lib/generateModule'))
    .option('-p, --path <pathName>', 'the path where you want to generate file')

generate
    .command('page <name>')
    .description('generate page <my-page-name>')
    .action(require('../lib/generatePage'))
    .option('-p, --path <pathName>', 'the path where you want to generate file')
    .option('-f, --father <pageName>', 'with father route')
    .option('-r, --redirect', 'as redirect route')

generate
    .command('component <name>')
    .description('generate component <component-name>')
    .action(require('../lib/generateComponent'))
    .option('-p, --path <pathName>', 'the path where you want to generate file')
    .option('-f, --folder', 'component name is folder')


program.parse(process.argv)