const fs = require('node:fs').promises;
const path = require('node:path');

const pathBuilder = './06-build-page/';

async function builderPage() {
  try {
    let dataTemplate = await fs.readFile(
      path.join(pathBuilder, 'template.html'),
      'utf-8',
    );

    const componentsPath = path.join(pathBuilder, 'components');

    const replacePlaceholder = async (placeholder) => {
      const placeholderRegex = new RegExp(`{{${placeholder}}}`, 'g');
      const placeholderFile = path.join(componentsPath, `${placeholder}.html`);

      try {
        const fileContent = await fs.readFile(placeholderFile, 'utf-8');
        dataTemplate = dataTemplate.replace(placeholderRegex, fileContent);
      } catch (err) {
        console.error(err);
      }
    };

    await Promise.all(['header', 'articles', 'footer'].map(replacePlaceholder));

    console.log(dataTemplate);
  } catch (err) {
    console.error(err);
  }
}

builderPage();
