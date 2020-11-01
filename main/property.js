function listProperties(knex, query) {
  let response = knex('properties as p').select('p.*').count('pd.id as nDocs').count('pn.id as nNotes')
                  .leftJoin('property_docs as pd', 'p.id', 'pd.propertyId')
                  .leftJoin('property_notes as pn', 'p.id', 'pn.propertyId')
                  .where('p.userId', query.userId);
  
  if (query) {
    if (query.address) {
      response = response.andWhere('p.address', 'like', `%${query.address}%`)
    }
    if (query.type) {
      response = response.andWhere('p.type', '=', `${query.type}`)
    }
    if (query.sort === 'active') {
    /* Filter if exists some contract active at the moment
       response = response.whereExists(knex('properties_to_contract as ptc').whereRaw('p.id = ptc.propertyId')
        .whereExists(knex('contracts as c').whereRaw('c.id = ptc.contractId')
        .andWhere('start', '<=', Date.now())
        .andWhere('end', '>', Date.now()))); */
        //response = response.orderByRaw('convert(datetime, , 103) ASC');
    } else if (query.sort === 'type') {
      response = response.orderBy('p.type');
    }
  }
  response = response.groupBy('p.id');
  return response;
}

async function addProperty(knex, data) {
  const idProperty = await knex('properties').insert(data).catch((e) => { console.log(e); });;
  return knex('properties').where('id', idProperty);
}

exports.listProperties = listProperties;
exports.addProperty = addProperty;