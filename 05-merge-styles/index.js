const fs = require('node:fs');
const path = require('node:path');

const pathStyles = './05-merge-styles/styles';
fs.readdir(pathStyles, (err, files) => {
  if (err) {
    return console.error(err);
  }
  files.forEach((file) => {
    if (path.extname(file).slice(1) === 'css') {
      fs.readFile(path.join(pathStyles, file), 'utf8', (err, data) => {
        if (err) {
          return console.error(err);
        }
        console.log(data);
      });
    }
  });
});
