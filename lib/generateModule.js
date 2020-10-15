const fs = require('fs')
const path = require('path')
const compile = require('./compile')
const dirExists = require('./fsExtend')

module.exports = async name => {
    console.log('name', name)
    const firstAlphabet = name.charAt(0).toUpperCase();
    const subStr = name.substr(1);
    const componentName = `${firstAlphabet}${subStr}`
    const moduleDir = `./${name}`

    await dirExists(`${moduleDir}`);
    compile({componentName, className: name }, `${moduleDir}/index.tsx`, `${path.join(path.resolve(__dirname, '..'), 'template', 'moduleIndex.tsx.hbs' )}`)
    compile({ className: name }, `${moduleDir}/index.less`, `${path.join(path.resolve(__dirname, '..'), 'template', 'index.less.hbs' )}`)
    compile({namespace: name }, `${moduleDir}/model.ts`, `${path.join(path.resolve(__dirname, '..'), 'template', 'model.ts.hbs' )}`)
    compile({modulePath: name }, `${moduleDir}/routes.ts`, `${path.join(path.resolve(__dirname, '..'), 'template', 'routes.ts.hbs' )}`)
    fs.writeFileSync(`${moduleDir}/type.ts`, '// This is type file');
    compile({componentName, className: name}, `${moduleDir}/index.test.tsx`, `${path.join(path.resolve(__dirname, '..'), 'template', 'index.test.tsx.hbs' )}`)
    compile({modulePath: name }, `${moduleDir}/service.ts`, `${path.join(path.resolve(__dirname, '..'), 'template', 'service.ts.hbs' )}`)
    fs.writeFileSync(`${moduleDir}/provider.ts`, '// This is provider file');
}