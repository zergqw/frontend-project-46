
const { Command } = require('commander');
const program = new Command();
const _ = require('lodash');
const fs = require('fs');

program
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
    const file2 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));
    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    const sortedKeys = Array.from(new Set([...keys1, ...keys2])).sort();
    const result = [];
    sortedKeys.forEach(key => {
      if (keys1.includes(key) && keys2.includes(key)) {
        if (file1[key] === file2[key]) {
          result.push(`  ${key}: ${file1[key]}`);
        } else {
          result.push(`- ${key}: ${file1[key]}`);
          result.push(`+ ${key}: ${file2[key]}`);
        }
      } else if (keys1.includes(key)) {
        result.push(`- ${key}: ${file1[key]}`);
      } else {
        result.push(`+ ${key}: ${file2[key]}`);
      }
    });
    console.log('{\n' + result.join('\n') + '\n}')
    });
program.parse();