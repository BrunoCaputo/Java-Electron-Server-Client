process.title = 'myApp';
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const net = require('net').Socket();
const electron = require('electron');
const { app, BrowserWindow, ipcMain, Menu } = electron;

let HOST = "127.0.0.1";
let PORT = 6969;

let mainWindow;
var client = net.connect(PORT, HOST);

client.setEncoding('utf8');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: `${__dirname}/resources/icons/ninja.png`,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        if (client !== null) {
            client.write("Desconectado\n");
            client.end();
        }
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    client.write("Conectado\n");
}

app.on('ready', () => {
    createWindow();
});

ipcMain.on('socket:send', (event, data) => {
    client.write(data + '\n');
});

ipcMain.on("socket:accept", event => {
    client.write("Calling\n");
});

ipcMain.on("socket:decline", event => {
    client.write("Declined\n");
});

client.on("data", data => {
    client.write('return -> ' + data.toString() + '\n');
    mainWindow.webContents.send('received:data', data.toString());
});

client.on('end', () => {
    client = null;
    app.quit();
});

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { role: 'Quit' }
        ]
    }
];

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'ToggleDevTools' }
        ]
    });
}