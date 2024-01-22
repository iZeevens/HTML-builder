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

    await fs.mkdir(path.join(pathBuilder, 'project-dist'), { recursive: true });
    await fs.writeFile(
      path.join(pathBuilder, 'project-dist/index.html'),
      dataTemplate,
    );

    const readCss = async (pathStyles, pathProject) => {
      try {
        const files = await fs.readdir(pathStyles);
        const arrayStyles = [];

        for (const file of files) {
          if (path.extname(file).slice(1) === 'css') {
            const data = await fs.readFile(
              path.join(pathStyles, file),
              'utf-8',
            );
            arrayStyles.push(data);
          }
        }

        await fs.writeFile(pathProject, arrayStyles.join('\n'), 'utf-8');
      } catch (err) {
        console.error(err);
      }
    };
    readCss(
      path.join(pathBuilder, 'styles'),
      path.join(pathBuilder, 'project-dist/style.css'),
    );
  } catch (err) {
    console.error(err);
  }

  const destinationDir = path.join(pathBuilder, 'assets');
  const sourceDir = path.join(pathBuilder, 'project-dist/assets');

  const copyFiles = async (destinationDir, sourceDir) => {
    try {
      const files = await fs.readdir(destinationDir);

      for (const file of files) {
        const srcPath = path.join(sourceDir, file);
        const destPath = path.join(destinationDir, file);
        const stats = await fs.stat(destPath);

        if (stats.isFile()) {
          await fs.copyFile(destPath, srcPath);
        } else if (stats.isDirectory()) {
          await fs.mkdir(srcPath, { recursive: true });
          await copyFiles(destPath, srcPath);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  await copyFiles(destinationDir, sourceDir);
}

builderPage();
