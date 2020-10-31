async function listNotes(knex, query) {
  let response = [];

  const subqueryP = knex('properties').select('id').whereIn('userId', knex('users').select('id').where('id', query.userId));
  const subqueryT = knex('tenants').select('id').whereIn('userId', knex('users').select('id').where('id', query.userId));
  const subqueryC = knex('contracts').select('id').whereIn('userId', knex('users').select('id').where('id', query.userId));

  const response1 = knex.select('*',  knex('properties').select('address as propertyAddress')).from('property_notes').whereIn('propertyId', subqueryP);
  const response2 =  knex.select('*').from('tenant_notes').whereIn('tenantId', subqueryT);
  const response3 = knex.select('*').from('contract_notes').whereIn('contractId', subqueryC);
  
  if (query) {
    if (query.typeRel) {
      response = response.andWhere('type', '=', `${query.type}`)
    }
    if (query.type) {
    }
    if (query.sort === 'active') {
     
    } else if (query.sort === 'type') {
    }
  }

  response.push(...await response1);
  response.push(...await response2);
  response.push(...await response3);
  return response;
}

async function addNote(knex, data) {
  if (data && data.typeRel) {
    const table = chooseTable(data.typeRel);
    const formatData = {...data};
    delete formatData.typeRel;
    const idProperty = await knex(table).insert(data).catch((e) => { console.log(e); });;
    return knex('tenants').where('id', idProperty);
  }
}

exports.listNotes = listNotes;
exports.addNote = addNote;

function chooseTable(typeRel) {
  switch(typeRel) {
    case 'property':
      return 'property_notes';
    case 'tenant':
      return 'tenant_notes';
    case 'contract':
      return 'contract_notes';
  }
}