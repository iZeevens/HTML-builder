const fs = require('node:fs');
const path = require('node:path');

const pathStyles = './05-merge-styles/styles';
const pathProject = './05-merge-styles/project-dist/Bundle.css';
async function readCss() {
  fs.readdir(pathStyles, (err, files) => {
    let arrayStyles = [];
    if (err) {
      return console.error(err);
    }
    files.forEach((file) => {
      if (path.extname(file).slice(1) === 'css') {
        fs.readFile(path.join(pathStyles, file), 'utf8', (err, data) => {
          if (err) {
            return console.error(err);
          }
          arrayStyles.push(data);
        });
      }
    });
    fs.writeFile(pathProject, arrayStyles.join('\n'), (err) => {
      if (err) {
        return console.error(err);
      }
    });
  });
}
readCss();
