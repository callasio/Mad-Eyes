const { app, BrowserWindow, session, Tray, Menu } = require("electron");
const path = require("path");
const { screen } = require("electron");
const http = require("http");
const { Notification } = require("electron");
const { exec } = require("child_process");

let mainWindow;
let tray;

const checkServerRunning = (url, callback) => {
  http
    .get(url, (res) => {
      if (res.statusCode === 200) {
        callback(true);
      }
    })
    .on("error", () => {
      callback(false);
    });
};

checkServerRunning("http://localhost:3000", (isRunning) => {
  if (!isRunning) {
    exec(
      "npx --yes next start",
      { cwd: path.join(__dirname, "web") },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
  }
});

const waitForServer = (url, callback) => {
  const interval = setInterval(() => {
    http
      .get(url, (res) => {
        if (res.statusCode === 200) {
          clearInterval(interval);
          callback();
        }
      })
      .on("error", () => {
        // Server not ready yet
      });
  }, 1000);
};

waitForServer("http://localhost:3000", () => {
  app.on("ready", () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    mainWindow = new BrowserWindow({
      width: width,
      height: height,
      icon: path.join(__dirname, "icon-large.png"),
      webPreferences: {
        nodeIntegration: false, // Disable Node.js integration for security
        contextIsolation: true, // Enable context isolation
        enableRemoteModule: false, // Disable remote module
        partition: "persist:main", // Ensure cookies and storage persist
        backgroundThrottling: false,
      },
    });

    app.commandLine.appendSwitch("disable-background-timer-throttling");

    mainWindow.setMenu(null);

    const server = http.createServer((req, res) => {
      if (req.method === "GET") {
        new Notification({
          title: "Eyes Warning!",
          body: "You're blinking too unfrequently.",
        }).show();
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello, World!\n");
    });

    server.listen(3478, "127.0.0.1", () => {
      console.log("Server running at http://127.0.0.1:3478/");
    });

    mainWindow.setIcon(path.join(__dirname, "tray-icon.png"));

    mainWindow.webContents.on("did-finish-load", () => {
      mainWindow.webContents.insertCSS(`
      ::-webkit-scrollbar {
        display: none;
      }
    `);
    });

    session.defaultSession.setPermissionRequestHandler(
      (webContents, permission, callback) => {
        if (permission === "media") {
          callback(true);
        } else {
          callback(false);
        }
      }
    );

    // Load the target domain
    mainWindow.loadURL("http://localhost:3000");

    // Optional: Clear cache on app start
    session.defaultSession.clearCache();

    // Tray icon setup
    const iconPath = path.join(__dirname, "tray-icon.png"); // Replace with your tray icon path
    tray = new Tray(iconPath);

    tray.setToolTip("My Electron App");

    const trayMenu = Menu.buildFromTemplate([
      {
        label: "Show App",
        click: () => {
          mainWindow.show();
        },
      },
      {
        label: "Quit",
        click: () => {
          app.isQuiting = true;
          app.quit();
        },
      },
    ]);

    tray.setContextMenu(trayMenu);

    // Handle minimize to tray on close
    mainWindow.on("close", (event) => {
      if (!app.isQuiting) {
        event.preventDefault();
        mainWindow.hide();
      }
    });

    // Restore window when tray icon is clicked
    tray.on("click", () => {
      if (mainWindow.isVisible()) {
        mainWindow.focus();
      } else {
        mainWindow.show();
      }
    });

    mainWindow.on("closed", () => {
      mainWindow = null;
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.emit("ready");
});
