
const createDB = (knex) => {
  knex.schema.createTable('users', users => {
    users.increments();
    users.string('dni', 9).unique().notNullable();
    users.string('name', 45).unique().notNullable();
    users.string('country', 50).notNullable();
    users.string('city', 50).notNullable();
    users.string('address', 50).notNullable();
    users.string('email', 50).notNullable();
    users.string('cp', 5).notNullable();
    users.string('phone', 9).notNullable();
    users.string('iban', 34).notNullable();
  }).then(() => {
    knex('users').insert({
      id: 1,
      dni: '44888602P',
      name: 'Martín Palacios Albors',
      address: 'C/Pintor Pizcual Capuz n9',
      country: 'Spain',
      city: 'Valencia',
      cp: '46018',
      email: 'martinpa_93@hotmail.com',
      phone: '675543321'
    }).then();
  });
  knex.schema.createTable('properties', property => {
    property.increments();
    property.integer('userId').notNullable();
    property.foreign('userId').references('id').inTable('users').onDelete('cascade');
    property.string('catastralReference', 20).unique();
    property.enu('type', ['house', 'garage', 'commerce']).notNullable();
    property.string('country', 45).notNullable();
    property.string('region', 45).notNullable();
    property.string('city', 45).notNullable();
    property.string('address', 45).notNullable();
    property.string('cp', 5).notNullable();
    property.decimal('adquisitionValue').notNullable();
    property.date('adquisitionDate').notNullable();
  }).then(() => {
    knex.schema.createTable('property_docs', doc => {
      doc.increments();
      doc.integer('propertyId').notNullable();
      doc.foreign('propertyId').references('id').inTable('properties').onDelete('cascade');
      doc.dateTime('date').notNullable();
      doc.string('name', 45).notNullable();
      doc.string('path', 150).notNullable();
    }).then();
    knex.schema.createTable('property_notes', note => {
      note.increments();
      note.integer('propertyId').notNullable();
      note.foreign('propertyId').references('id').inTable('properties').onDelete('cascade');
      note.dateTime('date').notNullable();
      note.string('title', 45).notNullable();
      note.string('description', 300).notNullable();
    }).then();
  });
  knex.schema.createTable('tenants', tenant => {
    tenant.increments();
    tenant.integer('userId').notNullable();
    tenant.foreign('userId').references('id').inTable('users').onDelete('cascade');
    tenant.string('identity', 9).notNullable().unique();
    tenant.enu('type', ['company', 'private']).notNullable();
    tenant.string('name', 45).notNullable();
    tenant.string('address', 45).notNullable();
    tenant.string('country', 45).notNullable();
    tenant.string('city', 45).notNullable();
    tenant.string('phone', 9).notNullable();
    tenant.string('email', 45).notNullable();
    tenant.string('iban', 34);
  }).then(() => {
    knex.schema.createTable('tenant_docs', doc => {
      doc.increments();
      doc.integer('tenantId').notNullable();
      doc.foreign('tenantId').references('id').inTable('tenants').onDelete('cascade');
      doc.dateTime('date').notNullable();
      doc.string('name', 45).notNullable();
      doc.string('path', 150).notNullable();
    }).then();
  });
  knex.schema.createTable('contracts', contract => {
    contract.increments();
    contract.integer('userId');
    contract.foreign('userId').references('id').inTable('users').onDelete('cascade');
    contract.integer('tenantId');
    contract.foreign('tenantId').references('id').inTable('tenants').onDelete('cascade');
    contract.date('start').notNullable();
    contract.date('end').notNullable();
  }).then(() => {
    knex.schema.createTable('contract_docs', doc => {
      doc.increments();
      doc.integer('contractId').notNullable();
      doc.foreign('contractId').references('id').inTable('contracts').onDelete('cascade');
      doc.dateTime('date').notNullable();
      doc.string('name', 45).notNullable();
      doc.string('path', 150).notNullable();
    }).then();
    knex.schema.createTable('contract_notes', note => {
      note.increments();
      note.integer('contractId').notNullable();
      note.foreign('contractId').references('id').inTable('contracts').onDelete('cascade');
      note.dateTime('date').notNullable();
      note.string('title', 45).notNullable();
      note.string('description', 300).notNullable();
    }).then();
    knex.schema.createTable('properties_to_contract', pivot => {
      pivot.increments();
      pivot.integer('propertyId').notNullable();
      pivot.foreign('propertyId').references('id').inTable('properties');
      pivot.integer('contractId').notNullable();
      pivot.foreign('contractId').references('id').inTable('contracts');
    }).then();

  });0
  knex.schema.createTable('incomes', income => {
    income.increments();
    income.integer('userId').notNullable();
    income.foreign('userId').references('id').inTable('users').onDelete('cascade');
    income.integer('propertyId').notNullable();
    income.foreign('propertyId').references('id').inTable('properties').onDelete('cascade');
    income.integer('contractId');
    income.foreign('contractId').references('id').inTable('contracts');
    income.date('date').notNullable();
    income.string('description', 300).notNullable();
    income.decimal('quantity').notNullable();
    income.integer('ivaType').notNullable();
    income.integer('irpfType').notNullable();
    income.boolean('sended');
    income.boolean('payed');
    income.date('paid_expires');
  }).then(() => {
    knex.schema.createTable('income_docs', doc => {
      doc.increments();
      doc.integer('incomeId').notNullable();
      doc.foreign('incomeId').references('id').inTable('incomes').onDelete('cascade');
      doc.dateTime('date').notNullable();
      doc.string('name', 45).notNullable();
      doc.string('path', 150).notNullable();
    }).then();
  });
  knex.schema.createTable('outgoings', outgoing => {
    outgoing.increments();
    outgoing.integer('userId').notNullable();
    outgoing.foreign('userId').references('id').inTable('users').onDelete('cascade');
    outgoing.integer('propertyId').notNullable();
    outgoing.foreign('propertyId').references('id').inTable('properties').onDelete('cascade');
    outgoing.date('date').notNullable();
    outgoing.string('description', 300).notNullable();
    outgoing.decimal('quantity').notNullable();
    outgoing.integer('ivaType').notNullable();
  }).then(() => {
    knex.schema.createTable('outgoing_docs', doc => {
      doc.increments();
      doc.integer('outgoingId').notNullable();
      doc.foreign('outgoingId').references('id').inTable('outgoings').onDelete('cascade');
      doc.dateTime('date').notNullable();
      doc.string('name', 45).notNullable();
      doc.string('path', 150).notNullable();
    }).then();
  });
/*   knex.schema.createTable('tasks', tasks => {
    tasks.increments();
    tasks.integer('userId');
    tasks.foreign('userId').references('id').inTable('users').onDelete('cascade');
    tasks.enu('frequency', ['diario', 'semanal', 'mensual', 'bimensual', 'trimestral', 'cuatrimestral', 'anual']).notNullable();
    tasks.date('frequency_start').notNullable();
    tasks.date('frequency_end').notNullable();
    tasks.integer('incomeId');
    tasks.foreign('incomeId').references('id').inTable('incomes').onDelete('cascade');
    tasks.integer('outgoingId');
    tasks.foreign('outgoingId').references('id').inTable('outgoings').onDelete('cascade');
  }).then(); */
  knex.schema.createTable('notifications', not => {
    not.increments();
    not.integer('userId');
    not.foreign('userId').references('id').inTable('users').onDelete('cascade');
    not.date('date').notNullable();
    not.string('description', 200).notNullable();
    not.enu('type', ['endOfContract', 'pendingPayment']).notNullable();
  }).then();
}

exports.createDB = createDB;