import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import {Buffer} from 'buffer'
import {Provider} from 'react-redux'
import {store} from './store/store'
import '@near-wallet-selector/modal-ui/styles.css'
import {NearAPIContextProvider} from './near/NearAPIContext'


// @ts-ignore
window['Buffer'] = window['Buffer'] || Buffer

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
          <NearAPIContextProvider>
              <App />
          </NearAPIContextProvider>
      </Provider>
  </React.StrictMode>
)
