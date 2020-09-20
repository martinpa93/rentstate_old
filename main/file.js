const fs = require('fs').promises;

async function uploadFiles(knex, files) {
  let db = {table: '', data: {}};
  const promises = [];
  
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    if (!file || !file.file || !file.name || !file.size || !file.typeRel || !file.relId) { return; }
    
    processDB(db, file);
    
    await fs.access(`./files/${file.name}`)
    .then(() => { })
    .catch(async() => {
      const base64Data = file.file.replace(/^data:.*base64,/, '');
      await fs.writeFile(`./files/${file.name}`, base64Data, 'base64')
      .then(() => { console.log("The file has been saved!"); })
      .catch((e) => { console.log(e); });
      const idFile = await knex(db.table).insert(db.date).catch((e) => { console.log(e); });
      promises.push(knex.select().from(db.table).where('id', idFile));
    });
  }
  
  return Promise.all(promises).catch((e) => {
    console.log(e);
  });
}

function processDB(db, file) {
  db.data = {
    date: new Date().toUTCString(),
    name: file.name,
    size: file.size
  }
  switch (file.typeRel) {
    case 'property':
      db.table = 'property_docs';
      db.data.propertyId = file.relId;
      break;
    case 'tenant':
      db.table = 'tenant_docs';
      db.data.tenantId = file.relId;
      break;
    case 'contract':
      db.table = 'contract_docs';
      db.data.contractId = file.relId;
      break;
    case 'income':
      db.table = 'income_docs';
      db.data.incomeId = file.relId;
      break;
    case 'outgoing':
      db.table = 'outgoing_docs';
      db.data.outgoingId = file.relId;
      break;
  }
}


exports.uploadFiles = uploadFiles;