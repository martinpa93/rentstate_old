function listTenants(knex, query) {
  let response = knex('tenants as t').select('t.*').count('td.id as nDocs').count('tn.id as nNotes')
                  .leftJoin('tenant_docs as td', 't.id', 'td.tenantId')
                  .leftJoin('tenant_notes as tn', 't.id', 'tn.tenantId')
                  .where('t.userId', query.userId);
  
  if (query) {
    if (query.name) {
      response = response.andWhere('t.name', 'like', `%${query.name}%`)
    }
    if (query.address) {
      response = response.andWhere('t.address', 'like', `%${query.address}%`)
    }
    if (query.type) {
      response = response.andWhere('t.type', '=', `${query.type}`)
    }
    if (query.sort === 'active') {
     
    } else if (query.sort === 'type') {
      response = response.orderBy('t.type');
    }
  }
  response = response.groupBy('t.id');
  return response;
}

async function addTenant(knex, data) {
  const idProperty = await knex('tenants').insert(data).catch((e) => { console.log(e); });;
  return knex('tenants').where('id', idProperty);
}

exports.listTenants = listTenants;
exports.addTenant = addTenant;