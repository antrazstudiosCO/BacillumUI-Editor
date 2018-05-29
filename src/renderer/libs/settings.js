const Config = require('electron-config') // Config es la constante de la libreria de manejo de archivos de configuracion encriptados.
// const fs = require('fs') // fs es una constante global para el manejo de archivos.
// Se genera una nueva configuracion de Config para almacenar los ajustes globales del sistema
const config = new Config({
  encryptionKey: 'oiV32mVp5lOwYneFESjrWq2xFByNOvNj'
})

/**
 * Funcion que retorna el path de la carpeta en donde se encuentran los archivos de configuracion
 */
exports.getSettingsPath = () => {
  return config.path.replace('config.json', '')
}
