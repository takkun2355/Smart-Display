const path = require('node:path');
const { app, BrowserWindow } = require('electron');

function createWindow() {
    const window = new BrowserWindow({
        width: 1280,
        height: 720
    });

    window.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
    createWindow();
});