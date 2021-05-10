import {
  app,
  BrowserWindow,
  Tray,
  Menu,
} from 'electron';
import path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

class Application {
  window: BrowserWindow | undefined;

  tray: Tray | undefined;

  createTray() {
    this.tray = new Tray(path.join(__dirname, 'assets/icon.ico'));

    this.tray.setToolTip('Moodle TODO');
    this.tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: 'Checar por atualizações...',
          click() {
            console.log('checking for updates');
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Sair',
          click: this.quit.bind(this),
        },
      ]),
    );

    this.tray.addListener('click', () => this.window!.show());
  }

  createWindow() {
    if (this.window) return;

    this.window = new BrowserWindow({
      width: 1100,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    this.window.setMenu(null);
    this.window.setMenuBarVisibility(false);

    if (process.env.NODE_ENV === 'development') this.window.loadURL('http://localhost:4000');
    else this.window.loadURL(`file://${path.join(__dirname, 'renderer/index.html')}`);

    this.window.on('close', (event) => {
      event.preventDefault();
      this.window!.hide();
    });

    this.window.on('closed', () => {
      this.window = undefined;
    });
  }

  createApplication() {
    this.createWindow();
    this.createTray();
  }

  start() {
    app.on('ready', this.createApplication.bind(this))
      .whenReady()
      .then(() => {
        if (process.env.NODE_ENV === 'development') {
          installExtension(REACT_DEVELOPER_TOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));
        }
      });

    app.allowRendererProcessReuse = true;
  }

  quit() {
    this.window!.destroy();
    app.quit();
  }
}

new Application().start();
