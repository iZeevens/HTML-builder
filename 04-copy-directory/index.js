const fs = require('node:fs');
const path = require('node:path');
const sourceDir = './04-copy-directory/files';
const destinationDir = './04-copy-directory/files-copy';

fs.mkdir(destinationDir, { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }

  fs.readdir(sourceDir, (err, sourceFiles) => {
    if (err) {
      return console.error(err);
    }

    fs.readdir(destinationDir, (err, destFiles) => {
      if (err) {
        return console.error(err);
      }

      destFiles.forEach((destFile) => {
        if (!sourceFiles.includes(destFile)) {
          const filePath = path.join(destinationDir, destFile);
          fs.unlink(filePath, (err) => {
            if (err) {
              return console.error(err);
            }
          });
        }
      });

      sourceFiles.forEach((file) => {
        const sourceFile = path.join(sourceDir, file);
        const destinationFile = path.join(destinationDir, file);

        fs.copyFile(sourceFile, destinationFile, (err) => {
          if (err) {
            return console.error(err);
          }
        });
      });
    });
  });
});
