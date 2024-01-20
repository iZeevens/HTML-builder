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
        console.log(
          `${fileName.split('.')[0]}-${path.extname(fileName).slice(1)}`,
        );
      }
    });
  },
);
