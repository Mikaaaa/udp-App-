const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const {ipcMain} = require("electron");

const uid = null;

function getUid() {
  return uid;
}
function setUid(puid) {
  this.uid =puid;
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1366, height: 720, frame:false})
  // First, initialize the JavaScript SDK
  //mainWindow.loadURL("http://www.deezer.com");

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))


  //---------------------UDP SERVER---------------------------
  //recupè l'id client du rederer
  
  server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
  });
ipcMain.on('uid', (event, arg) => {  
    // Print 1
    console.log("uid :"+ arg);
    });
server.on('message', (msg, rinfo) => {
  mainWindow.webContents.send('info' ,msg.toString());
  msg = '' + msg;
  ipcMain.on('uid', (event, arg) => {  
    setUid(arg);
    });
  if (msg.substring(0,4) == "png#") {
    console.log('uid send');
    var message = new Buffer('add#' + getUid());
    
    server.send(message, 0, message.length, 12000, rinfo.address, function(err, bytes) {
        if (err) {
          console.log("ça a merdé : "+ err);
        }else {
        console.log('UDP message sent to ' + rinfo.address +': 12000');
      }
        //server.close();
    });
  }
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(12000);
// server listening 0.0.0.0:41234
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
