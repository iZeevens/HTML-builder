const fs = require('node:fs');
const readline = require('node:readline');
const writeStream = fs.createWriteStream('./02-write-file/text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.setPrompt('Input text:');
rl.prompt();
rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Good Bye');
    rl.close();
    writeStream.end();
  } else {
    rl.prompt();
    writeStream.write(input + '\n');
  }
});
rl.on('SIGINT', () => {
  console.log('\nGood Bye');
  rl.close();
  writeStream.end();
  process.exit();
});
