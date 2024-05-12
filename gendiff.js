const { Command } = require('commander');
const program = new Command();

program
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
program.parse();