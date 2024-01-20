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
        console.log(file);
        console.log(path.extname(file.name));
      }
    });
  },
);
