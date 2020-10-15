const fs = require('fs');
const handlerBars = require('handlebars')

/**
 * 
 * @param {*} source 源数据
 * @param {*} filePath 目标文件
 * @param {*} templatePath 模板文件
 */
module.exports = (source, filePath, templatePath) => {
    console.log("source", source);
    console.log("filePath", filePath);
    console.log("templatePath", templatePath);
    if(fs.existsSync(templatePath)) {
        const content = fs.readFileSync(templatePath).toString();
        const result = handlerBars.compile(content)(source)
        fs.writeFileSync(filePath, result)
        console.log(`🚀 ${filePath} 创建成功`)
    }
}