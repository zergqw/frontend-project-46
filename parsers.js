const fs = require('fs');
const yaml = require('js-yaml');
const format = (filepath) => {
    if (filepath.endsWith('yaml')) {
        return yaml.load(fs.readFileSync(filepath, 'utf8'));
    } 
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'))
    
}
const genDiff = (filepath1, filepath2) => {
    const file1 = format(filepath1)
    const file2 = format(filepath2)
    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    const sortedKeys = Array.from(new Set([...keys1, ...keys2])).sort();
    const result = [];
    const popresult = []
    sortedKeys.forEach(key => {
    if (keys1.includes(key) && keys2.includes(key)) {
        if (file1[key] === file2[key]) {
            result.push(`  ${key}: ${file1[key]}`);
        } else {
            result.push(`- ${key}: ${file1[key]}`);
            popresult.push(`+ ${key}: ${file2[key]}`);
        }
    } else if (keys1.includes(key)) {
        result.push(`- ${key}: ${file1[key]}`);
    } else {
        popresult.push(`+ ${key}: ${file2[key]}`);
    }
    });
    return result.concat(popresult)
  }
module.exports = {genDiff};