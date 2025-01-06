const { app, BrowserWindow, session, Tray, Menu } = require('electron');
const path = require('path');
const { screen } = require('electron');

let mainWindow;
let tray;

app.on('ready', () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: false, // Disable Node.js integration for security
      contextIsolation: true, // Enable context isolation
      enableRemoteModule: false, // Disable remote module
      partition: 'persist:main', // Ensure cookies and storage persist
    },
  });

  mainWindow.setMenu(null);

  mainWindow.setIcon(path.join(__dirname, 'tray-icon.png'));

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS(`
      ::-webkit-scrollbar {
        display: none;
      }
    `);
  });

  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'media') {
      callback(true);
    } else {
      callback(false);
    }
  });

  // Load the target domain
  mainWindow.loadURL('http://localhost:3000');

  // Optional: Clear cache on app start
  session.defaultSession.clearCache();

  // Tray icon setup
  const iconPath = path.join(__dirname, 'tray-icon.png'); // Replace with your tray icon path
  tray = new Tray(iconPath);

  tray.setToolTip('My Electron App');
  
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: 'Quit',
      click: () => {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(trayMenu);

  // Handle minimize to tray on close
  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // Restore window when tray icon is clicked
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.focus();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
