
// 驼峰写法转成连接符
function camelToHyphenate(str){
    var reg=/\B([A-Z])/g;
    return str.replace(reg,"-$1").toLowerCase();

}

/**
 * 获取相对地址，从src开始
 * @param {*} filePath 
 */
function getRelativePath(filePath) {
    return filePath.substr(filePath.indexOf('src/'));
}

module.exports = {
    camelToHyphenate,
    getRelativePath
}
