
const { Command } = require('commander');
const program = new Command();
const { genDiff } = require('./parsers')
program
  .name('gendiff')
  .description('  Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format (default: "stylish")')
  .arguments('<filepath> <filepath2>')
  .action((filepath, filepath2, option) => {
    console.log(genDiff(filepath, filepath2, option.format))
    });
    
program.parse(process.argv );
