function listContracts(knex, query) {
  let response = knex('contracts').from('').where('userId', query.userId).;
  
  if (query) {
    if (query.sort === 'active') {
     
    }
  }

  response = response.leftJoin('')
  return response;
}

async function addContract(knex, data) {
  const formatData = {...data};
  delete formatData.properties;
  const idContract = await knex('contracts').insert(formatData).catch((e) => { console.log(e); });
  data.properties = data.properties.forEach(async(value) => {
    await knex('properties_to_contract').insert({'contractId': idContract, 'propertyId': value.id}).catch((e) => { console.log(e); });
  });
  return idContract;
}

exports.listContracts = listContracts;
exports.addContract = addContract;