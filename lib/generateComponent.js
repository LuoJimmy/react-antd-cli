const path = require('path')
const fs = require('fs')
const compile = require('./compile')
const { getStat, dirExists }= require('./fsExtend')
const { camelToHyphenate } = require('./utils');

/**
 * 生产组件
 * 默认：如果是公共组件，用文件夹组织，里面包含index.tsx和index.less文件夹；如果是在业务组件里，直接用组件名扁平化组织
 * 可以通过cmd.folder来手动定义是否为文件夹
 * @param {*} name 
 * @param {*} cmd
 */
module.exports = async (name, cmd)=> {
    // console.log(name)
    // console.log(path.parse(process.cwd()))
    // console.log(path.dirname(process.cwd()))
    // console.log(path.resolve('./'))

    const firstAlphabet = name.charAt(0).toUpperCase();
    const subStr = name.substr(1);
    const componentName = `${firstAlphabet}${subStr}`;
    const className = camelToHyphenate(componentName);
    const cwd = process.cwd();
    const isFolderDir = path.parse(path.parse(cwd).dir).base === 'src' || cmd.folder; // 是否为文件夹形式
    const componentDir = path.join(cwd, cmd.path ? cmd.path : '', isFolderDir ? `${componentName}` : `${componentName}.tsx`);
    
    if(isFolderDir) {
        const isExists = await dirExists(`${componentDir}`);
        if(isExists === true) {
            console.error('❌ 该组件已存在')
            return;
        }
    } else {
        const isExists = await getStat(componentDir)
        if(isExists) {
            console.error('❌ 该组件已存在')
            return;
        }
    }
    const componentPath = path.join(cwd, cmd.path ? cmd.path : '', isFolderDir ? `${componentName}/index.tsx` : `${componentName}.tsx`);
    const componentStylePath = path.join(cwd, cmd.path ? cmd.path : '', isFolderDir ? `${componentName}/index.less` : `${componentName}.less`);
    const stylePath = isFolderDir ? 'index.less' : `${componentName}.less`;
    compile({componentName, className, stylePath}, `${componentPath}`, `${path.join(path.resolve(__dirname, '..'), 'template', 'componentIndex.tsx.hbs' )}`)
    compile({ className },  `${componentStylePath}`, `${path.join(path.resolve(__dirname, '..'), 'template', 'index.less.hbs' )}`)
}