const { app, BrowserWindow } = require('electron');
const path = require('path');

function createDB() {
  const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './data/data.db',
    },
  });
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
  }).then();
  knex.schema.createTable('tasks', tasks => {
    tasks.increments();
    tasks.integer('user_id');
    tasks.foreign('user_id').references('id').inTable('users').onDelete('cascade');
    tasks.enu('frequency', ['diario', 'semanal', 'mensual', 'bimensual', 'trimestral', 'cuatrimestral', 'anual']).notNullable();
    tasks.date('frequency_start').notNullable();
    tasks.date('frequency_end').notNullable();
    tasks.integer('income_id');
    tasks.integer('outgoing_id');
  }).then();
  knex.schema.createTable('properties', property => {
    property.increments();
    property.integer('user_id').notNullable();
    property.foreign('user_id').references('id').inTable('users').onDelete('cascade');
    property.string('catastral_reference', 20).unique();
    property.enu('type', ['house', 'garage', 'commerce']).notNullable();
    property.string('country', 45).notNullable();
    property.string('region', 45).notNullable();
    property.string('city', 45).notNullable();
    property.string('address', 45).notNullable();
    property.string('cp', 5).notNullable();
    property.decimal('adquisition_value').notNullable();
    property.date('adquisition_date').notNullable();
  }).then(() => {
    knex.schema.createTable('property_docs', doc => {
      doc.increments();
      doc.integer('property_id').notNullable();
      doc.foreign('property_id').references('id').inTable('properties').onDelete('cascade');
      doc.dateTime('date').notNullable();
      doc.string('name', 45).notNullable();
      doc.string('path', 150).notNullable();
    }).then();
    knex.schema.createTable('property_notes', note => {
      note.increments();
      note.integer('property_id').notNullable();
      note.foreign('property_id').references('id').inTable('properties').onDelete('cascade');
      note.dateTime('date').notNullable();
      note.string('title', 45).notNullable();
      note.string('description', 300).notNullable();
    }).then();
  });
  knex.schema.createTable('tenants', tenant => {
    tenant.increments();
    tenant.integer('user_id').notNullable();
    tenant.foreign('user_id').references('id').inTable('users').onDelete('cascade');
    tenant.string('identity', 9).notNullable().unique();
    tenant.enu('type', ['company', 'private']).notNullable();
    tenant.string('name', 45).notNullable();
    tenant.string('address', 45).notNullable();
    tenant.string('phone', 9).notNullable();
    tenant.string('email', 45).notNullable();
  }).then(() => {
    knex.schema.createTable('tenant_docs', doc => {
      doc.increments();
      doc.integer('tenant_id').notNullable();
      doc.foreign('tenant_id').references('id').inTable('tenants').onDelete('cascade');
      doc.dateTime('date').notNullable();
      doc.string('name', 45).notNullable();
      doc.string('path', 150).notNullable();
    }).then();
  });
  knex.schema.createTable('contracts', contract => {
    contract.increments();
    contract.integer('user_id');
    contract.foreign('user_id').references('id').inTable('users').onDelete('cascade');
    contract.integer('tenant_id');
    contract.foreign('tenant_id').references('id').inTable('tenants').onDelete('cascade');
    contract.date('start').notNullable();
    contract.date('end').notNullable();
  }).then(() => {
    knex.schema.createTable('contract_docs', doc => {
      doc.increments();
      doc.integer('contract_id').notNullable();
      doc.foreign('contract_id').references('id').inTable('contracts').onDelete('cascade');
      doc.dateTime('date').notNullable();
      doc.string('name', 45).notNullable();
      doc.string('path', 150).notNullable();
    }).then();
    knex.schema.createTable('contract_notes', note => {
      note.increments();
      note.integer('contract_id').notNullable();
      note.foreign('contract_id').references('id').inTable('contracts').onDelete('cascade');
      note.dateTime('date').notNullable();
      note.string('title', 45).notNullable();
      note.string('description', 300).notNullable();
    }).then();
  });
  knex.schema.createTable('incomes', income => {
    income.increments();
    income.integer('user_id').notNullable();
    income.foreign('user_id').references('id').inTable('users').onDelete('cascade');
    income.integer('property_id').notNullable();
    income.foreign('property_id').references('id').inTable('properties').onDelete('cascade');
    income.integer('tenant_id');
    income.foreign('tenant_id').references('id').inTable('tenants');
    income.date('date').notNullable();
    income.string('description', 300).notNullable();
    income.decimal('quantity').notNullable();
    income.integer('iva_type').notNullable();
    income.decimal('iva_quantity').notNullable();
    income.integer('irpf_type').notNullable();
    income.decimal('irpf_quantity').notNullable();
    income.boolean('sended');
    income.boolean('payed');
    income.date('paid_expires');
  }).then(() => {
    knex.schema.createTable('income_docs', doc => {
      doc.increments();
      doc.integer('income_id').notNullable();
      doc.foreign('income_id').references('id').inTable('incomes').onDelete('cascade');
      doc.dateTime('date').notNullable();
      doc.string('name', 45).notNullable();
      doc.string('path', 150).notNullable();
    }).then();
  });
  knex.schema.createTable('outgoings', outgoing => {
    outgoing.increments();
    outgoing.integer('user_id').notNullable();
    outgoing.foreign('user_id').references('id').inTable('users').onDelete('cascade');
    outgoing.integer('property_id').notNullable();
    outgoing.foreign('property_id').references('id').inTable('properties').onDelete('cascade');
    outgoing.date('date').notNullable();
    outgoing.string('description', 300).notNullable();
    outgoing.decimal('quantity').notNullable();
    outgoing.integer('iva_type').notNullable();
    outgoing.decimal('iva_quantity').notNullable();
    outgoing.integer('irpf_type').notNullable();
    outgoing.decimal('irpf_quantity').notNullable();
  }).then(() => {
    knex.schema.createTable('outgoing_docs', doc => {
      doc.increments();
      doc.integer('outgoing_id').notNullable();
      doc.foreign('outgoing_id').references('id').inTable('outgoings').onDelete('cascade');
      doc.dateTime('date').notNullable();
      doc.string('name', 45).notNullable();
      doc.string('path', 150).notNullable();
    }).then();
  });
}

function createWindow () {
  // Crea la ventana del navegador.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // y carga el index.html de la aplicación.
  win.loadFile(path.join(__dirname, './dist/rentstate/index.html'));

  // Abre las herramientas de desarrollo (DevTools).
  win.webContents.openDevTools();
}

// Base de datos
app.whenReady().then(createDB);

// Este método se llamará cuando Electron haya finalizado
// la inicialización y esté preparado para crear la ventana del navegador.
// Algunas APIs pueden usarse sólo después de que este evento ocurra.
app.whenReady().then(createWindow)

// Finaliza cuando todas las ventanas estén cerradas.
app.on('window-all-closed', () => {
  // En macOS es común para las aplicaciones y sus barras de menú
  // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // En macOS es común volver a crear una ventana en la aplicación cuando el
  // icono del dock es clicado y no hay otras ventanas abiertas.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// En este archivo puede incluir el resto del código del proceso principal específico
// de su aplicación. También puedes ponerlos en archivos separados y requerirlos aquí.
