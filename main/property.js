function listProperties(knex, query) {
  let response = knex('properties').where('userId', query.userId);
  
  if (query) {
    if (query.address) {
      response = response.andWhere('address', 'like', `%${query.address}%`)
    }
    if (query.type) {
      response = response.andWhere('type', '=', `${query.type}`)
    }
    if (query.sort === 'active') {
      response = response.whereExists(knex('properties_to_contract').whereRaw('properties.id = properties_to_contract.propertyId')
        .whereExists(knex('contracts').whereRaw('contracts.id = properties_to_contract.contractId')
        .andWhere('start', '<=', Date.now())
        .andWhere('end', '>', Date.now())));
    } else if (query.sort === 'type') {
      response = response.orderBy('type');
    }
  }
  return response;
}

async function addProperty(knex, data) {
  const idProperty = await knex('properties').insert(data).catch((e) => { console.log(e); });;
  return knex('properties').where('id', idProperty);
}

exports.listProperties = listProperties;
exports.addProperty = addProperty;