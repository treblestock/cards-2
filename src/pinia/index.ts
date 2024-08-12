import { createPinia } from 'pinia'
const pinia = createPinia()


import onRegister from './onRegister'
// import withRouter from './withRouter'
// import stateCacher from './stateCacher'
// import exportImportState from './exportImportState'

pinia.use(onRegister)
// pinia.use(withRouter)
// pinia.use(stateCacher)
// pinia.use(exportImportState)



export default pinia