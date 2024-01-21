const fs = require('node:fs');
const path = require('node:path');

const pathStyles = './05-merge-styles/styles';
const pathProject = './05-merge-styles/project-dist/Bundle.css';
async function readCss() {
  try {
    fs.readdir(pathStyles, (err, files) => {
      let arrayStyles = [];

      files.forEach((file) => {
        if (path.extname(file).slice(1) === 'css') {
          const filePath = path.join(pathStyles, file);
          const data = await fs.readFile(filePath, 'utf8');
          arrayStyles.push(data);
        }
      }); 
      fs.writeFile(pathProject, arrayStyles.join('\n'), (err) => {
        if (err) {
          return console.error(err);
        }
      });
    });
  } catch{
    console.error(err)
  }
}
readCss();
