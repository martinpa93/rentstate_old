const { app, BrowserWindow, ipcMain } = require('electron');
const pathdb = `./data.db`;
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: pathdb
  }
});

// Este método se llamará cuando Electron haya finalizado
// la inicialización y esté preparado para crear la ventana del navegador.
// Algunas APIs pueden usarse sólo después de que este evento ocurra.
app.whenReady().then(createWindow);

// Finaliza cuando todas las ventanas estén cerradas.

function createWindow () {
  // Crea la ventana del navegador.
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    autoHideMenuBar : true,
    //frame: false,
    icon: "./dist/rentstate/assets/favicon.ico",
    //useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // y carga el index.html de la aplicación.
  win.loadFile('./dist/rentstate/index.html');

  // Abre las herramientas de desarrollo (DevTools).
  win.webContents.openDevTools();
}

app.on('window-all-closed', () => {
  // En macOS es común para las aplicaciones y sus barras de menú
  // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // En macOS es común volver a crear una ventana en la aplicación cuando el
  // icono del dock es clicado y no hay otras ventanas abiertas.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

// En este archivo puede incluir el resto del código del proceso principal específico
// de su aplicación. También puedes ponerlos en archivos separados y requerirlos aquí.

const users = require('./main/user');

ipcMain.on('list-users', async(event) => {
  users.listUsers(knex).then((res) => {
    event.sender.send('reply-list-users',res);
  });
});

const properties = require('./main/property');

ipcMain.on('list-properties', (event, args) => {
  properties.listProperties(knex, args).then((res) => {
    event.sender.send('reply-list-properties',res);
  });
});

ipcMain.on('add-property', (event, arg) => {
  properties.addProperty(knex, arg).then((res) => {
    event.sender.send('reply-add-property',res);
  });
});

const tenants = require('./main/tenant');

ipcMain.on('list-tenants', (event, args) => {
  tenants.listTenants(knex, args).then((res) => {
    event.sender.send('reply-list-tenants',res);
  });
});

ipcMain.on('add-tenant', (event, arg) => {
  tenants.addTenant(knex, arg).then((res) => {
    event.sender.send('reply-add-tenant',res);
  });
});

const contracts = require('./main/contract');

ipcMain.on('list-contracts', (event, args) => {
  contracts.listContracts(knex, args).then(async(res) => {
    res = await contracts.fetchRels(knex, res);
    event.sender.send('reply-list-contracts',res);
  });
});

ipcMain.on('add-contract', (event, arg) => {
  contracts.addContract(knex, arg).then((res) => {
    event.sender.send('reply-add-contract',res);
  });
});

const files = require('./main/file');

ipcMain.on('upload-files', (event, fls) => {
  files.uploadFiles(knex, fls).then((res) => {
    event.sender.send('reply-upload-files',res);
  });
});

const notes = require('./main/note');

ipcMain.on('list-notes', (event, args) => {
  notes.listNotes(knex, args).then(async(res) => {
    res = await notes.fetchRelations(knex, res);
    event.sender.send('reply-list-notes',res);
  });
});

ipcMain.on('add-note', (event, arg) => {
  notes.addNote(knex, arg).then((res) => {
    event.sender.send('reply-add-note',res);
  });
});