const fs = require('node:fs').promises;
const path = require('node:path');

// const mainPath = './06-build-page/project-dist';
const pathBuilder = './06-build-page/';
async function builderPage() {
  try {
    const dataTemplate = await fs.readFile(
      path.join(pathBuilder, 'template.html'),
      'utf-8',
    );
    dataTemplate.split('\n').forEach((item) => console.log(item));
    // await fs.mkdir(mainPath);
  } catch (err) {
    console.error(err);
  }
}
builderPage();
