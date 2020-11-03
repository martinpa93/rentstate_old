async function listNotes(knex, query) {
  let response = [];

  const subqueryP = knex('properties as p').select('p.id').whereIn('p.userId', knex('users').select('id').where('id', query.userId));
  const subqueryT = knex('tenants as t').select('t.id').whereIn('t.userId', knex('users').select('id').where('id', query.userId));
  const subqueryC = knex('contracts as c').select('c.id').whereIn('c.userId', knex('users').select('id').where('id', query.userId));

  const response1 = knex('property_notes as pn').select('pn.*').whereIn('pn.propertyId', subqueryP);
  const response2 = knex('tenant_notes as tn').select('tn.id', 'tn.tenantId', 'tn.date', 'tn.title', 'tn.description', 'tn.type').whereIn('tn.tenantId', subqueryT);
  const response3 = knex('contract_notes as cn').select('cn.id', 'cn.contractId', 'cn.date', 'cn.title', 'cn.description', 'cn.type').whereIn('cn.contractId', subqueryC);
  
  if (query) {
    if (query.typeRel) {
    }
    if (query.type) {
    }
    if (query.sort === 'active') {
     
    } else if (query.sort === 'type') {
    }
  }

  response.push(...await response1, ...await response2, ...await response3);
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
exports.fetchRelations = fetchRelations;
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

async function fetchRelations(knex, result) {
  await Promise.all(result.map(async(el) => {
    if (el.propertyId) {
      el.rel = await knex('properties').first('address').where('id', el.propertyId);
    } else if (el.tenantId) {
      el.rel = await knex('tenants').first('name').where('id', el.tenantId);
    } else if (el.contractId) {
      const ct =  await knex('contracts as c').where('id', el.contractId);
      el.rel = {
        start: ct[0].start,
        end: ct[0].end,
        ...await knex('properties as p').first('p.address').where('p.id', ct[0].propertyId),
        ...await knex('tenants as t').first('t.name').where('t.id', ct[0].tenantId),
      }
    }
  }));
  return result;
}