const fs = require('node:fs');
const path = require('node:path');
const sourceDir = './04-copy-directory/files';
const destinationDir = './04-copy-directory/files-copy';

fs.mkdir(destinationDir, { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }

  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      return console.error(err);
    }
    files.forEach((file) => {
      fs.copyFile(
        path.join(sourceDir, file),
        path.join(destinationDir, file),
        (err) => {
          if (err) {
            return console.error(err);
          }
        },
      );
    });
  });
});
