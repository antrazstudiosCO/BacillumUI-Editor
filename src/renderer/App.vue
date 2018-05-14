<template>
  <div id="app">
    <!-- content -->
    <transition enter-active-class="animated fadeIn" :duration="{ enter: 500 }" >
      <router-view class="content-area" v-bind:style="{ heightMax: bacillum_reference_heightMax + 'px', height: bacillum_reference_heightMax + 'px', marginTop: '55px' }"></router-view>
    </transition>
    <!-- footer -->
    <div class="footer">
      <Row type="flex" justify="space-between">
        <!-- Contenedor Izquierdo -->
        <div class="footer-container">
          <!-- Version del sistema, se recomienda usar la funcion para ocultarla mas no eliminarla -->
          <Tooltip placement="top-start" :content="'Version: ' + bacillum_base_packageRemote.release + '.' + bacillum_base_packageRemote.version">
            <Tag v-if="bacillum_base_showVersion" class="footer-item-tag clicker" v-bind:style="{ backgroundColor: bacillum_base_colorsVersion[bacillum_base_packageRemote.release], color: 'white'}" @click="gotoAbout()">
              {{bacillum_base_packageRemote.version}}
            </Tag>
          </Tooltip>
          <!-- Tags personalizados -->
          <div class="footer-aux" v-if="bacillum_custom_tagLeft.length !== 0" v-for="item in bacillum_custom_tagLeft" :key="item.id">
            <!-- En caso que no use ningun control auxiliar adicional -->
            <Tag v-if="item.useTooltip === false" :class="'footer-item-tag ' + item.type" @click="item.click()">
              {{item.title}}
            </Tag>
            <!-- En caso que elija el auxiliar Tooltip-->
            <Tooltip v-if="item.useTooltip === true" placement="top-start" :content="item.contentTooltip">
              <Tag :class="'footer-item-tag ' + item.type" @click="item.click()">
                {{item.title}}
              </Tag>
            </Tooltip>
          </div>
        </div>
        <!-- Contenedor Derecho -->
        <div class="footer-container">
          <!-- Tags personalizados -->
          <div class="footer-aux" v-if="bacillum_custom_tagRight.length !== 0" v-for="item in bacillum_custom_tagRight" :key="item.id">
            <!-- En caso que no use ningun control auxiliar adicional -->
            <Tag v-if="item.useTooltip === false" :class="'footer-item-tag ' + item.type" @click="item.click()">
              {{item.title}}
            </Tag>
            <!-- En caso que elija el auxiliar Tooltip-->
            <Tooltip v-if="item.useTooltip === true" placement="top-end" :content="item.contentTooltip">
              <Tag :class="'footer-item-tag ' + item.type" @click="item.click()">
                {{item.title}}
              </Tag>
            </Tooltip>
          </div>
          <!-- Verificadorde actualizaciones -->
          <Tooltip placement="top-end" content="Haga click para comenzar la instalacion.">
            <Tag v-if="bacillum_base_updates" class="footer-item-tag clicker" v-bind:style="{ backgroundColor: '#27ae60', color: 'white'}" @click="gotoAbout()">
              Existe una actualizacion
            </Tag>
          </Tooltip>
        </div>
      </Row>
    </div>
    <!-- titlebar -->
    <div class="titlebar-base titlebar-base-shadow">
      <Row type="flex" :gutter="16" align="middle">
        <!-- Espacio para botones de accion de MacOS -->
        <i-col v-if="bacillum_base_platformName === 'darwin'" span="1"></i-col>
        <!-- Botones de Menu Desplegable Izquierdo-->
        <i-col :span="bacillum_base_platformName === 'darwin' ? 9 : 10">
          <!-- Menu de acciones -->
          <div v-if="bacillum_base_showMenu" class="titlebar-base-navigation" v-bind:style="{ marginLeft: bacillum_base_platformName === 'darwin' ? 10 + 'px' : 5 + 'px' }">
            <!-- Base Manu Dropdown -->
            <Dropdown v-for="option in bacillum_custom_menubar" :key="option.id">
              <!-- Boton de acciones en caso de no tener childrens -->
              <i-button style="margin-right: 1px" type="text" @click="option['action'] ? option.action() : null">
                {{option.title}}
                <Icon v-if="option['childrens']" type="arrow-down-b"></Icon>
              </i-button>
              <!-- Lista de Botones Hijos -->
              <DropdownMenu v-if="option['childrens']" slot="list">
                <div v-for="suboption in option.childrens" :key="suboption.id">
                  <DropdownItem v-if="suboption.type === 'option'">
                    <i-button type="text" style="margin: 0px; padding: 0px; width: 100%; text-align: left" @click="suboption.action()">{{suboption.title}}
                      <div v-if="suboption['shortcut']" v-for="command in suboption.shortcut" :key="command.id" class="titlebar-command-navigation">
                        {{bacillum_base_platformName === 'darwin' ? command.macOS : command.win}}
                      </div>
                    </i-button>
                  </DropdownItem>
                  <hr class="titlebar-separator-navigation" v-if="suboption.type === 'separator'">
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
        </i-col>
        <!-- Texto de titulo de medio -->
        <i-col span="4">
          <label class="titlebar-title">UI
            <div class="titlebar-title-additional">
              Editor
            </div>
          </label>
        </i-col>
        <!-- Botones de accion rapida personalizables Derechos -->
        <i-col :span="bacillum_base_platformName === 'darwin' ? 10 : 8">
          <Tooltip v-if="bacillum_base_showActions" v-for="item in bacillum_custom_shorcut" :key="item.id" :disabled="item.type === 'icon' ? false : true" placement="bottom-end">
            <div slot="content">
              {{item.title}}
              <div class="titlebar-command-navigation" v-if="item['shortcut']" v-for="command in item.shortcut" :key="command.id">
                {{bacillum_base_platformName === 'darwin' ? command.macOS : command.win}}
              </div>
            </div>
            <i-button v-bind:style="{ marginRight: bacillum_custom_shorcut.length !== 0 ? '5px' : '0px' }" class="titlebar-button-additional" size="large" type="ghost" @click="item.action()">
              <Icon v-bind:style="{ marginRight: item.type === 'mix' ? '5px' : '0px', verticalAlign: 'middle' }" v-if="item.type === 'icon' || item.type === 'mix'" :type="item.icon"></Icon>
              <label style="vertical-align: middle" v-if="item.type === 'text' || item.type === 'mix'">{{item.title}}</label>
            </i-button>
          </Tooltip>
        </i-col>
        <!-- Espacio para botones de accion de Windows -->
        <i-col v-if="bacillum_base_platformName !== 'darwin'" :span="bacillum_base_platformName === 'darwin' ? 0 : 2">
          <Tooltip v-if="bacillum_base_showMinButton" content="Minimizar" placement="bottom-end">
            <i-button class="titlebar-button-window" v-if="bacillum_base_platformName !== 'darwin'" type="text" icon="minus" size="small" @click="bacillum_windowMinimize()"></i-button>
          </Tooltip>
          <Tooltip v-if="bacillum_base_showResizeButton" :content="bacillum_base_windowState === 'maximized' ? 'Restaurar' : 'Maximizar'" placement="bottom-end">
            <i-button class="titlebar-button-window" v-if="bacillum_base_platformName !== 'darwin'" type="text" :icon="bacillum_base_windowState === 'maximized' ? 'arrow-shrink' : 'arrow-expand'" size="small" @click="bacillum_base_windowState === 'maximized' ? bacillum_windowRestore() : bacillum_windowMaximize()"></i-button>
          </Tooltip>
          <Tooltip v-if="bacillum_base_showCloseButton" content="Cerrar" placement="bottom-end">
            <i-button class="titlebar-button-window" v-if="bacillum_base_platformName !== 'darwin'" type="text" icon="close" size="small" @click="bacillum_windowClose()"></i-button>
          </Tooltip>
        </i-col>
      </Row>
    </div>
    <!-- loading -->
    <Spin v-if="bacillum_base_loading" fix>
      <div>
        <Icon v-if="bacillum_base_loadingType === 'normal'" class="spin-icon-load" type="load-d" size="40"/>
        <i-progress v-if="bacillum_base_loadingType === 'progress'" :percent="bacillum_base_loadingPercent" :status="bacillum_base_loadingPercentStatus"></i-progress>
        <p v-if="bacillum_base_loadingPercentStatus !== 'success'" class="spin-text-load">{{bacillum_base_loadingText}}</p>
        <i-button v-if="bacillum_base_loadingPercentStatus === 'success'" @click="bacillum_base_loadingAction()">{{bacillum_base_loadingActionText}}</i-button>
      </div>
    </Spin>
  </div>
</template>

<script>
  export default {
    name: 'bacillum.ui.editor',
    data () {
      return {
        // Propiedades del sistema de interfaz de bacillumUI.
        bacillum_base_packageRemote: null,
        bacillum_base_electronRemote: null,
        bacillum_base_platformName: 'darwin',
        bacillum_base_updates: false,
        bacillum_base_windowState: 'restored',
        bacillum_base_showMenu: true,
        bacillum_base_showActions: true,
        bacillum_base_showCloseButton: true,
        bacillum_base_showResizeButton: true,
        bacillum_base_showMinButton: true,
        bacillum_base_loading: false,
        bacillum_base_loadingType: 'normal',
        bacillum_base_loadingText: 'Un momento por favor, esta operacion solo tomara unos segundos',
        bacillum_base_loadingPercent: 600,
        bacillum_base_loadingPercentStatus: 'active',
        bacillum_base_loadingAction: null,
        bacillum_base_loadingActionText: 'Listo!',
        bacillum_base_showVersion: true,
        bacillum_base_colorsVersion: {
          dev: '#c0392b',
          alpha: '#d35400',
          beta: '#f39c12',
          release: '#27ae60'
        },
        // Propiedades de referencias.
        bacillum_reference_heightMax: 0,
        // Propiedades costumizables de interfaz de bacillumUI.
        // Para cambiar el contenido de estas variables se recomienda ver la documentacion.
        bacillum_custom_menubar: [
          // Basico aplicacion
          {
            title: 'Bacillum',
            childrens: [
              // Acerca de
              {
                title: 'Acerca de BacillumUI Editor',
                action: null,
                type: 'option'
              },
              // Buscar actualizaciones
              {
                title: 'Buscar actualizaciones',
                action: null,
                type: 'option'
              },
              // Preferencias
              {
                title: 'Preferencias',
                action: null,
                type: 'option',
                shortcut: [
                  {
                    macOS: 'Command',
                    win: 'Ctrl'
                  },
                  {
                    macOS: ',',
                    win: ','
                  }
                ]
              },
              // Separador
              {
                type: 'separator'
              },
              // Salir de la app
              {
                title: 'Salir de BacillumUI Editor',
                action: null,
                type: 'option',
                shortcut: [
                  {
                    macOS: 'Command',
                    win: 'Ctrl'
                  },
                  {
                    macOS: 'Q',
                    win: 'Q'
                  }
                ]
              }
            ]
          },
          // Archivo
          {
            title: 'Archivo',
            childrens: [
              // Nuevo
              {
                title: 'Nuevo proyecto',
                type: 'option',
                action: null,
                shortcut: [
                  {
                    macOS: 'Command',
                    win: 'Ctrl'
                  },
                  {
                    macOS: 'N',
                    win: 'N'
                  }
                ]
              },
              // Abrir
              {
                title: 'Abrir proyecto',
                type: 'option',
                action: null,
                shortcut: [
                  {
                    macOS: 'Command',
                    win: 'Ctrl'
                  },
                  {
                    macOS: 'O',
                    win: 'O'
                  }
                ]
              },
              // Guardar
              {
                title: 'Guardar',
                type: 'option',
                action: null,
                shortcut: [
                  {
                    macOS: 'Command',
                    win: 'Ctrl'
                  },
                  {
                    macOS: 'G',
                    win: 'G'
                  }
                ]
              },
              // Guardar como
              {
                title: 'Guardar como...',
                type: 'option',
                action: null,
                shortcut: [
                  {
                    macOS: 'Shift',
                    win: 'Shift'
                  },
                  {
                    macOS: 'Command',
                    win: 'Ctrl'
                  },
                  {
                    macOS: 'Q',
                    win: 'Q'
                  }
                ]
              },
              // Cerrar
              {
                title: 'Cerrar proyecto',
                type: 'option',
                action: null,
                shortcut: [
                  {
                    macOS: 'Command',
                    win: 'Ctrl'
                  },
                  {
                    macOS: 'W',
                    win: 'W'
                  }
                ]
              }
            ]
          },
          // Editar
          {
            title: 'Editar',
            childrens: [
              // Deshacer
              {
                title: 'Deshacer',
                type: 'option',
                action: null,
                shortcut: [
                  {
                    macOS: 'Command',
                    win: 'Ctrl'
                  },
                  {
                    macOS: 'Z',
                    win: 'Z'
                  }
                ]
              },
              // Rehacer
              {
                title: 'Rehacer',
                type: 'option',
                action: null,
                shortcut: [
                  {
                    macOS: 'Shift',
                    win: 'Shift'
                  },
                  {
                    macOS: 'Command',
                    win: 'Ctrl'
                  },
                  {
                    macOS: 'Z',
                    win: 'Z'
                  }
                ]
              },
              // Separador
              {
                type: 'separator'
              },
              // Cortar
              {
                title: 'Cortar',
                type: 'option',
                action: null,
                shortcut: [
                  {
                    macOS: 'Command',
                    win: 'Ctrl'
                  },
                  {
                    macOS: 'X',
                    win: 'X'
                  }
                ]
              },
              // Copiar
              {
                title: 'Copiar',
                type: 'option',
                action: null,
                shortcut: [
                  {
                    macOS: 'Command',
                    win: 'Ctrl'
                  },
                  {
                    macOS: 'C',
                    win: 'C'
                  }
                ]
              },
              // Pegar
              {
                title: 'Pegar',
                type: 'option',
                action: null,
                shortcut: [
                  {
                    macOS: 'Command',
                    win: 'Ctrl'
                  },
                  {
                    macOS: 'V',
                    win: 'V'
                  }
                ]
              }
            ]
          },
          // Ver
          {
            title: 'Ver',
            childrens: []
          },
          // Ir
          {
            title: 'Ir',
            childrens: []
          },
          // Ayuda
          {
            title: 'Ayuda',
            childrens: [
              // Bienvenido
              {
                title: 'Bienvenido',
                type: 'option',
                action: null
              },
              // Documentacion
              {
                title: 'Documentacion',
                type: 'option',
                action: null
              },
              // Notas de la version
              {
                title: 'Notas de la version',
                type: 'option',
                action: null
              },
              // Separador
              {
                type: 'separator'
              },
              // Herramientas de desarrollo
              {
                title: 'Ver herramientas de Desarrollo',
                type: 'option',
                action: null
              },
              // Consola de Log
              {
                title: 'Consola de Log',
                type: 'option',
                action: null
              }
            ]
          }
        ],
        bacillum_custom_shorcut: [
          {
            title: 'Crear proyecto',
            type: 'mix',
            icon: 'plus',
            action: null,
            shortcut: [
              {
                macOS: 'Command',
                win: 'Ctrl'
              },
              {
                macOS: 'N',
                win: 'N'
              }
            ]
          },
          {
            title: 'Importar proyecto',
            type: 'icon',
            icon: 'android-folder-open',
            action: null,
            shortcut: [
              {
                macOS: 'Command',
                win: 'Ctrl'
              },
              {
                macOS: 'O',
                win: 'O'
              }
            ]
          }
        ],
        bacillum_custom_tagLeft: [
          {
            title: 'Prueba1',
            type: 'clicker',
            useTooltip: false,
            contentTooltip: '',
            click: () => {
              console.log('prueba')
            }
          },
          {
            title: 'Prueba2',
            type: 'noclicker',
            useTooltip: true,
            contentTooltip: 'Ayuda de accion',
            click: () => {
              console.log('prueba')
            }
          },
          {
            title: 'Prueba3',
            type: 'text',
            useTooltip: false,
            contentTooltip: '',
            click: () => {
              console.log('prueba')
            }
          }
        ],
        bacillum_custom_tagRight: []
        // Propiedades del Desarrollador
      }
    },
    created () {
      // Obtiene la instancia de la configuracion.
      this.bacillum_base_packageRemote = require('../../package.json')
      // Obtiene la instancia remota de Electron.
      this.bacillum_base_electronRemote = require('electron').remote
      // Cambiar el estado de la ventana para visualizar el cambio de controles de ventana
      this.bacillum_base_electronRemote.getCurrentWindow().on('maximize', () => {
        this.bacillum_base_windowState = 'maximized'
      })
      // Cambiar el estado de la ventana para visualizar el cambio de controles de ventana
      this.bacillum_base_electronRemote.getCurrentWindow().on('unmaximize', () => {
        this.bacillum_base_windowState = 'restored'
      })
      // Obtenemos el tamaño maximo disponible para vistas dependiendo del tamaño de la ventana
      this.bacillum_base_electronRemote.getCurrentWindow().on('resize', () => {
        this.bacillum_reference_heightMax = this.bacillum_base_electronRemote.getCurrentWindow().getSize()[1] - 88
      })
      // Obtenemos el nombre de la plataforma desde donde se obtuvo
      this.bacillum_base_platformName = process.platform
      // Maximizamos la aplicacion al iniciar
      this.bacillum_windowMaximize()
    },
    methods: {
      // Area de Procedimientos de BacillumUI
      /**
       * Cambia la visibilidad de los botones de accion de la ventana.
       *
       * @param {boolean} buttonclose Cambia la visibilidad del boton de cerrar.
       * @param {boolean} buttonmin Cambia la visibilidad del boton de Minimizar.
       * @param {boolean} buttonrest Cambia la visibilidad del boton de Restaurar.
       */
      bacillum_windowShowControls (buttonclose, buttonmin, buttonrest) {
        this.bacillum_base_showCloseButton = buttonclose
        this.bacillum_base_showMinButton = buttonmin
        this.bacillum_base_showResizeButton = buttonrest
      },
      /**
       * Cambia la visibilidad de las areas de botones de la barra de titulos.
       *
       * @param {boolean} showMenu Cambia la visibilidad del area de Menu de la aplicacion.
       * @param {boolean} showActions Cambia la visibilidad del area de accesos rapidos.
       */
      bacillum_titlebar_showAreas (showMenu, showActions) {
        this.bacillum_base_showMenu = showMenu
        this.bacillum_base_showActions = showActions
      },
      /**
       * Maximiza la ventana principal del sistema.
       */
      bacillum_windowMaximize () {
        this.bacillum_base_electronRemote.getCurrentWindow().maximize()
      },
      /**
       * Reatura el tamaño la ventana principal del sistema.
       */
      bacillum_windowRestore () {
        this.bacillum_base_electronRemote.getCurrentWindow().unmaximize()
      },
      /**
       * Minimiza la ventana principal del sistema.
       */
      bacillum_windowMinimize () {
        this.bacillum_base_electronRemote.getCurrentWindow().minimize()
      },
      /**
       * Cierra la ventana principal del sistema.
       */
      bacillum_windowClose () {
        this.bacillum_base_electronRemote.getCurrentWindow().close()
      },
      /**
       * Crea una pantalla de espera para mostrar al usuario.
       *
       * @param {string} message Mensaje que se mostrara al usuario en texto.
       * @param {string} type Tipo de pantalla a mostrar, puede ser 'normal' para una pantalla de texto, o 'progress' para una pantalla de espera con porcentaje de progreso.
       * @param {number} percent Valor del porcentaje del avance inicial.
       */
      bacillum_handleSpinShow (message = 'Un momento por favor, esta operacion solo tardara unos segundos', type = 'normal', percent = 0) { // type ? normal : progress;;;; percent ? progreso del proceso
        this.bacillum_base_loading = true
        this.bacillum_base_loadingType = type
        this.bacillum_base_loadingText = message
        this.bacillum_base_loadingPercent = percent
        this.bacillum_base_loadingPercentStatus = 'active'
      },
      /**
       * Actualiza la pantalla de espera para mostrar al usuario.
       *
       * @param {number} percent Valor del porcentaje del avance inicial.
       * @param {string} message Si el valor es diferente 'no-update' el valor del texto sera cambiado por el de este parametro.
       * @param {function} action Procedimiento a ejecutarse en caso de terminar el proceso.
       * @param {string} actionText Muestra un mensaje de finalizacion en el boton de accion.
       */
      bacillum_handleSpinProgressUpdate (percent, message = 'no-update', action = null, actionText = 'Listo!') {
        if (message !== 'no-update') {
          this.bacillum_base_loadingText = message
        }
        this.bacillum_base_loadingPercent = Number(percent).toFixed(0)
        this.bacillum_base_loadingActionText = actionText
        this.bacillum_base_loadingAction = action
        if (this.bacillum_base_loadingPercent >= 100) {
          this.bacillum_base_loadingPercentStatus = 'success'
        }
      },
      /**
       * Oculta la pantalla de espera.
       */
      bacillum_handleSpinHide () {
        this.bacillum_base_loading = false
      }
      // Area de procedimientos del programador
    }
  }
</script>

<style>
  /* CSS */
  @font-face {
    font-family: 'Questrial';
    src: url('./assets/fonts/Questrial-Regular.ttf');
  }
  body {
    user-select: none;
    height:100%;
    margin:0;
    padding:0;
    overflow-x: hidden;
  }
  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ebe5e5;
    margin: 1em 0;
    padding: 0;
  }
  /* Area de ScrollBar */
  ::-webkit-scrollbar {
    background-color: rgba(255, 255, 255, 0);
    width: .2em;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(143, 143, 143);
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  /* Animacion de Loading */
  .spin-icon-load{
    animation: ani-load-spin 5s linear infinite;
  }
  .spin-text-load{
    animation: ani-load-text 2s linear infinite;
  }
  @keyframes ani-load-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  @keyframes ani-load-text {
    from { opacity: 1; }
    50% { opacity: 0.5; }
    to { opacity: 1; }
  }
  /* Diseño de la Barra de titulos */
  .titlebar-base{
    user-select: none;
    -webkit-app-region: drag;
    position: fixed;
    padding-top: 4px;
    padding-bottom: 4px;
    text-align: center;
    width: 100%;
    top: 0px;
    z-index: 1000;
    background-color: white;
  }
  .titlebar-base-navigation{
    background-color: rgba(109, 115, 128, 0.108);
    border-radius: 10px;
    text-align: left;
  }
  .titlebar-separator-navigation {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ebe5e5;
    padding: 0;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .titlebar-command-navigation{
    display: inline;
    margin-left: 3px;
    padding-left: 7px;
    padding-top: 3px;
    padding-right: 5px;
    padding-bottom: 2px;
    vertical-align: middle;
    background-color: rgb(73, 80, 96);
    color: white;
    border-radius: 4px;
    opacity: 0.25;
  }
  .titlebar-base-shadow{
    -webkit-box-shadow: 0 4px 6px -6px #222;
    -moz-box-shadow: 0 4px 6px -6px #222;
    box-shadow: 0 4px 6px -6px #222;
    z-index: 999;
  }
  .titlebar-title{
    font-weight: bold;
    opacity: 0.8;
    font-size: 20px;
    vertical-align: middle;
  }
  .titlebar-title .titlebar-title-additional{
    display: inline;
    padding-left: 7px;
    padding-top: 3px;
    padding-right: 5px;
    padding-bottom: 2px;
    vertical-align: middle;
    background-color: rgb(73, 80, 96);
    color: white;
    border-radius: 4px;
  }
  .titlebar-button-window{
    cursor: default;
    z-index: 99;
  }
  .titlebar-button-additional{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  /* Area del Footer */
  .footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    color: rgba(0, 0, 0, 0.43);
    -webkit-box-shadow: 0px -6px 4px -6px #949494;
    -moz-box-shadow: 0px -6px 4px -6px #949494;
    box-shadow: 0px -6px 4px -6px #949494;
    /* z-index: 999; */
    padding-bottom: 3px;
    padding-left: 3px;
  }
  .footer-container{
    display: inline-block;
  }
  .footer-aux{
    display: inline;
  }
  .footer-item-tag{
    margin-top: 1px;
    margin-bottom: 0px;
    vertical-align: middle;
    font-weight: bold;
    font-size: 11px;
    text-transform: uppercase;
    border-radius: 6px;
  }
  .footer-item-tag.clicker{
    cursor: pointer;
    background-color: #F7F7F7;
  }
  .footer-item-tag.noclicker{
    cursor: not-allowed;
    background-color: #87898a;
    color: white;
  }
  .footer-item-tag.text{
    cursor: not-allowed;
    background-color: rgba(0, 0, 0, 0);
    border-color: rgba(0, 0, 0, 0);
  }
  /* Area de Contenido */
  .content-area {
    overflow-y: scroll;
    position: relative;
    height: 100%;
    width: 100%;
    top: 0px;
    overflow-x: hidden;
    background: transparent;
  }
</style>
