const fs = require('fs');
// const { promisify } = require('util');

const { connection, mongo } = require('../db');

module.exports = (fileName, filePath) => {
  // console.log('persistFileGrid.js');
  try {
    // console.log('fileName: ', fileName);
    if (!fileName || !filePath) {
      const missedValue = !fileName ? 'fileName' : 'filePath';
      throw new Error(`${missedValue} is required`);
    }

    if (!fs.existsSync(filePath)) {
      throw new Error("File doen't exist");
    }
    // console.log(filePath);
    const bucket = new mongo.GridFSBucket(connection.db, {
      bucketName: 'audioFiles'
    });

    const uploadStream = bucket.openUploadStream(fileName);
    fs.createReadStream(filePath).pipe(uploadStream);
    return new Promise((resolve, reject) => {
      uploadStream
        .on('error', function (error) {
          console.log('error uploadStream');
          assert.ifError(error);
        })
        .on('finish', () => {
          fs.unlinkSync(filePath);
          resolve(true);
        });
    });
  } catch (err) {
    throw err;
  }
};
