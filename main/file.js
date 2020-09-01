const fs = require('fs');

const uploadFiles = (knex, files) => {
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const base64Data = file.file.replace(/^data:.*base64,/, '');
    fs.writeFile(`./${file.name}`, base64Data, 'base64', function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  }); 
  }
}

exports.uploadFiles = uploadFiles;