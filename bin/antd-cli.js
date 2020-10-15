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

generate
    .command('page <name>')
    .description('generate page <my-page-name>')
    .action(require('../lib/generatePage'))
    .option('-f, --father <pageName>', 'with father route')
    .option('-r, --redirect', 'as redirect route')

generate
    .command('component <name>')
    .description('generate component <component-name>')
    .action(() => {
        console.log("generate component");
    })


program.parse(process.argv)