process.title = 'myApp';

const net = require('net').Socket();
const electron = require('electron');
const { app, BrowserWindow, ipcMain, ipcRenderer } = electron;

let HOST = "127.0.0.1";
let PORT = 6969;

let mainWindow;
var client = net.connect(PORT, HOST);

client.setEncoding('utf8');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.webContents.openDevTools();
    client.write("Conectado\n");

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', () => {
        if (client !== null) {
            client.write("Desconectado\n");
            client.end();
        }
    });
}

app.on('ready', () => {
    createWindow();
});

ipcMain.on('socket:send', (event, data) => {
    client.write(data + '\n');
});

client.on("data", data => {
    client.write('return -> ' + data.toString() + '\n');
    mainWindow.webContents.send('received:data', data.toString());
});

client.on('end', () => {
    console.log("desconectado\n");
    client = null;
    app.quit();
});