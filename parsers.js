const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('lodash');

const format = (filepath) => {
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

const forString = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const indent = ' '.repeat(depth * 4);
  const entries = Object.entries(value).map(([key, val]) => `${indent}${key}: ${forString(val, depth + 1)}`);
  return `{\n${entries.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const indent = ' '.repeat(depth * 4);
    const lines = node.map((n) => {
      switch (n.type) {
        case 'Onlyfile1':
          return `${indent}+ ${n.key}: ${forString(n.value, depth + 1)}`;
        case 'Onlyfile2':
          return `${indent}- ${n.key}: ${forString(n.value, depth + 1)}`;
        case 'changed':
          return [
            `${indent}- ${n.key}: ${forString(n.oldValue, depth + 1)}`,
            `${indent}+ ${n.key}: ${forString(n.newValue, depth + 1)}`,
          ].join('\n');
        case 'equivalent':
          return `${indent}  ${n.key}: ${forString(n.value, depth + 1)}`;
        case 'nested':
          return `${indent}  ${n.key}: ${iter(n.children, depth + 1)}`;
      }
    });
    return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
  };
  return iter(tree, 1);
};

const genDiff = (filepath1, filepath2, style = 'stylish') => {
    const file1 = format(filepath1);
    const file2 = format(filepath2);
    switch(style){
        case 'stylish':
            return stylish(diff(file1, file2));
        default:
            console.log('ERROR')
    }
    
};

module.exports = {genDiff};