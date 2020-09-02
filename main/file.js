const fs = require('fs');

const uploadFiles = (knex, files) => {
  let db = {table: '', data: {}};
  const promises = [];

  for (let index = 0; index < files.length; index++) {
    
    const file = files[index];
    const base64Data = file.file.replace(/^data:.*base64,/, '');
    
    
    fs.writeFile(`./files/${file.name}`, base64Data, 'base64', function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

    processDB(db, file);
    promises.push(knex(db.table).insert(db.data));
  }

  return Promise.all(promises).catch((e) => {
    console.log(e);
  });;

  
}

exports.uploadFiles = uploadFiles;

function processDB(db, file) {
  db.data = {
    date: new Date(),
    name: file.name,
    size: file.size
  }
  switch (file.typeRel) {
    case 'property':
      db.table = 'property_docs';
      db.data.propertyId = file.id;
      break;
    case 'tenant':
      db.table = 'tenant_docs';
      db.data.tenantId = file.id;
      break;
    case 'contract':
      db.table = 'contract_docs';
      db.data.contractId = file.id;
      break;
    case 'income':
      db.table = 'income_docs';
      db.data.incomeId = file.id;
      break;
    case 'outgoing':
      db.table = 'outgoing_docs';
      db.data.outgoingId = file.id;
      break;
  }
  console.log(db.data);
}