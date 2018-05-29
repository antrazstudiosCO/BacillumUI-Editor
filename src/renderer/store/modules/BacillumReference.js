import log from '../../libs/logs'

const state = {
  bacillum_reference_heightMax: 0
}

const mutations = {
  CHANGE_BACILLUMREFERENCE_HEIGHTMAX (state, value) {
    // actualizacion del log del sistema
    log.updateLogEventContent('MUTATION - Cambio de valor de la propiedad global de referencia del paquete BacillumUI - bacillum_reference_hightMax de ' + state.bacillum_reference_heightMax + ' a ' + value, 'info')
    state.bacillum_reference_heightMax = value
  }
}

const actions = {
}

const getters = {
  getBacillumReference_heightMax (state) {
    return state.bacillum_reference_heightMax
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
