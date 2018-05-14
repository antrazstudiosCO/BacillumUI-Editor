'use strict'

import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  // Variable que define el tipo de Barra de titulo.
  let titleBarStylev
  // Si no es macOS oculta los botones para utilizar los generados por bacillum
  if (process.platform !== 'darwin') {
    titleBarStylev = 'customButtonsOnHover'
    // Si es macOS Muestra los botones de la plataforma en la Barra de titulo personalizada
  } else if (process.platform === 'darwin') {
    titleBarStylev = 'hidden'
  }
  /**
   * Opciones iniciales de la Ventana.
   */
  mainWindow = new BrowserWindow({
    height: 650,
    useContentSize: true,
    width: 1000,
    minHeight: 650,
    minWidth: 1000,
    center: true,
    autoHideMenuBar: true,
    titleBarStyle: titleBarStylev,
    enableLargerThanScreen: true
  })

  // Carga de la URL por defecto, dependiendo si esta en modo de Desarrollador o en Produccion.
  mainWindow.loadURL(winURL)

  // Accion al momento de cerrar la ventalla
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Cuando la ventana este lista.
app.on('ready', createWindow)

// Cuando todas las ventanas esten cerradas.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Cuando se active la ventana.
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
