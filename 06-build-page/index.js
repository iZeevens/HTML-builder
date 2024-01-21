const fs = require('node:fs').promises;
// const path = require('node:path');

const mainPath = './06-build-page/project-dist';
async function builderPage() {
  try {
    
    // await fs.mkdir(mainPath);
  } catch (err) {
    console.error(err);
  }
}
builderPage();
