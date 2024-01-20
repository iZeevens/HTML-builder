const fs = require('node:fs');
const path = require('node:path');

fs.readdir(
  './03-files-in-folder/secret-folder',
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((file) => {
      if (file.isFile()) {
        const fileName = file.name.toString();
        const filePath = path.join(
          './03-files-in-folder/secret-folder',
          fileName,
        );
        fs.stat(filePath, (err, stat) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(
            `${fileName.split('.')[0]}-${path
              .extname(fileName)
              .slice(1)}-${Math.ceil(stat.size / 1024)}kb`,
          );
        });
      }
    });
  },
);
