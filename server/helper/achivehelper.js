const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

module.exports = (data) => {
  const assetsFolder = data.assets
  const htmlFile = data.html
  const htmlName = data.htmlName
  const zipPath = data.zipPath
  const output = fs.createWriteStream(path.join(__dirname, zipPath));

  const zipArchiver = archiver('zip');
  zipArchiver.pipe(output);
  zipArchiver.directory(path.join(__dirname, assetsFolder), 'assets');
  zipArchiver.file(path.join(__dirname, htmlFile), { name: htmlName })
  zipArchiver.finalize();
}
