function listTenants(knex, query) {
  let response = knex('tenants').where('userId', query.userId);
  
  if (query) {
    if (query.name) {
      response = response.andWhere('name', 'like', `%${query.name}%`)
    }
    if (query.address) {
      response = response.andWhere('address', 'like', `%${query.address}%`)
    }
    if (query.type) {
      response = response.andWhere('type', '=', `${query.type}`)
    }
    if (query.sort === 'active') {
     
    } else if (query.sort === 'type') {
      response = response.orderBy('type');
    }
  }
  return response;
}

async function addTenant(knex, data) {
  const idProperty = await knex('tenants').insert(data).catch((e) => { console.log(e); });;
  return knex('tenants').where('id', idProperty);
}

exports.listTenants = listTenants;
exports.addTenant = addTenant;