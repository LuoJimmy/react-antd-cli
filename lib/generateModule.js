const fs = require('fs')
const path = require('path')
const compile = require('./compile')
const { dirExists } = require('./fsExtend')
const { camelToHyphenate, getRelativePath } = require('./utils')

module.exports = async (name, cmd) => {
    // console.log('name', name)
    // console.log('cmd', cmd)
    
    const firstAlphabet = name.charAt(0).toUpperCase();
    const subStr = name.substr(1);
    const componentName = `${firstAlphabet}${subStr}`
    const cwd = process.cwd();
    const moduleDir = path.join(cwd, cmd.path ? cmd.path : '', `${name}`)
    // console.log("moduleDir", moduleDir);
    const className = camelToHyphenate(name);

    const isExists = await dirExists(`${moduleDir}`);
    if(isExists === true) {
        console.error('❌ 该模块已存在')
        return;
    }
    compile({componentName, className }, `${moduleDir}/index.tsx`, `${path.join(path.resolve(__dirname, '..'), 'template', 'moduleIndex.tsx.hbs' )}`)
    compile({ className }, `${moduleDir}/index.less`, `${path.join(path.resolve(__dirname, '..'), 'template', 'index.less.hbs' )}`)
    compile({namespace: name }, `${moduleDir}/model.ts`, `${path.join(path.resolve(__dirname, '..'), 'template', 'model.ts.hbs' )}`)
    compile({modulePath: camelToHyphenate(name) }, `${moduleDir}/routes.ts`, `${path.join(path.resolve(__dirname, '..'), 'template', 'routes.ts.hbs' )}`)
    fs.writeFileSync(`${moduleDir}/type.ts`, '// This is type file');
    console.log(`✅ ${getRelativePath(moduleDir)}/type.ts 创建成功`)
    compile({componentName, className}, `${moduleDir}/index.test.tsx`, `${path.join(path.resolve(__dirname, '..'), 'template', 'index.test.tsx.hbs' )}`)
    compile({modulePath: name }, `${moduleDir}/service.ts`, `${path.join(path.resolve(__dirname, '..'), 'template', 'service.ts.hbs' )}`)
    fs.writeFileSync(`${moduleDir}/provider.ts`, '// This is provider file');
    console.log(`✅ ${getRelativePath(moduleDir)}/provider.ts 创建成功`)
}