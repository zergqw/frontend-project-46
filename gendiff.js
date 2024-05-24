
const { Command } = require('commander');
const program = new Command();
const { genDiff } = require('./parsers')
program
  .description('  Compares two configuration files and shows a difference.')
  .version('0.5.0')
  .option('-f, --format [type]', 'output format (default: "stylish")')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, option) => {
    console.log(genDiff(filepath1, filepath2, option.format))
    });
    
program.parse(process.argv);