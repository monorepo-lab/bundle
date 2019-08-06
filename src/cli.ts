import program from 'commander';
process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection:', err);
})


program.version('0.0.1')
.description('公共库sdk')
.command('build', '编译库')
.command('bump', '升级版本')
.command('publish', '发布npm')
.parse(process.argv);

if (!program.args.length) program.help();
