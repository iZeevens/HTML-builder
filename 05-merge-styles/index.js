const fs = require('node:fs').promises;
const path = require('node:path');

const pathStyles = './05-merge-styles/styles';
const pathProject = './05-merge-styles/project-dist/Bundle.css';
async function readCss() {
  try {
    const files = await fs.readdir(pathStyles);
    const arrayStyles = [];

    for (const file of files) {
      if (path.extname(file).slice(1) === 'css') {
        const data = await fs.readFile(path.join(pathStyles, file), 'utf-8');
        arrayStyles.push(data);
      }
    }

    await fs.writeFile(pathProject, arrayStyles.join('\n'), 'utf-8');
  } catch (err) {
    console.error(err);
  }
}
readCss();
