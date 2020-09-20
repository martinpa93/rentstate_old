function listContracts(knex, query) {
  let response = knex('contracts').where('userId', query.userId);
  
  if (query) {
    if (query.sort === 'active') {
     
    }
  }
  return response;
}

async function addContract(knex, data) {
  const idProperty = await knex('contracts').insert(data).catch((e) => { console.log(e); });;
  return knex('contracts').where('id', idProperty);
}

exports.listContracts = listContracts;
exports.addContract = addContract;