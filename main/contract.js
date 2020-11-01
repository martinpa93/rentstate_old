function listContracts(knex, query) {
  let response = knex('contracts as c').select('c.*').count('cd.id as nDocs').count('cn.id as nNotes')
                  .leftJoin('contract_docs as cd', 'c.id', 'cd.contractId')
                  .leftJoin('contract_notes as cn', 'c.id', 'cn.contractId')
                  .where('userId', query.userId)
  
  if (query) {
    if (query.start && query.end) {
      response = response.andWhere('start', '>=', query.start).andWhere('end', '<=', query.end);
    }
    if (query.sort === 'active') {
     
    }
  }
  response = response.groupBy('c.id');
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

async function fetchPropertiesAndTenantForEachContract(knex, cts) {
  await Promise.all(cts.map(async(el) => {
    el.tenant = await knex('tenants as t').select('t.name').where('id', el.tenantId);
    el.properties = await knex('properties_to_contract as ptc').select('p.address').leftJoin('properties as p', 'ptc.propertyId', 'p.id')
    .where('ptc.contractId', el.id);
  }))
  return cts;
}

exports.listContracts = listContracts;
exports.fetchRels = fetchPropertiesAndTenantForEachContract;
exports.addContract = addContract;