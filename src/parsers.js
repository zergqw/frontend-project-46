const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('lodash');
const {format} = require('../formatters/index')

const Parse = (filepath) => {
    if (filepath.endsWith('yaml')) {
        return filepath.includes('./__fixtures__/') ? yaml.load(fs.readFileSync(filepath, 'utf8')) : yaml.load(fs.readFileSync('./__fixtures__/' + filepath, 'utf8'));
    } 
    return filepath.includes('./__fixtures__/') ? JSON.parse(fs.readFileSync(filepath, 'utf-8')) : JSON.parse(fs.readFileSync('./__fixtures__/' + filepath, 'utf-8'))
    
}

const diff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { type: 'Onlyfile1', key, value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { type: 'Onlyfile2', key, value: obj1[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { type: 'nested', key, children: diff(obj1[key], obj2[key]) };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        type: 'changed', key, oldValue: obj1[key], newValue: obj2[key],
      };
    }
    return { type: 'equivalent', key, value: obj1[key] };
  });
};
const genDiff = (filepath1, filepath2, style = 'stylish') => {
    const file1 = Parse(filepath1);
    const file2 = Parse(filepath2);
    return format(diff(file1, file2), style);
    
};

module.exports = {genDiff};