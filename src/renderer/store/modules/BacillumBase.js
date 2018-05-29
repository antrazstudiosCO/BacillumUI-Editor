import log from '../../libs/logs'

const state = {
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
  bacillum_base_menubar: [
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
  bacillum_base_shorcut: [
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
  bacillum_base_tagLeft: [
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
  bacillum_base_tagRight: []
}

const mutations = {
  CHANGE_BACILLUMBASE_PACKAGEREMOTE (state, value) {
    state.bacillum_base_packageRemote = value
  }
}

const actions = {
}

const getters = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
