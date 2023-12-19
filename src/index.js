import { render } from 'react-dom'
import { Suspense } from 'react'
import { Logo } from '@pmndrs/branding'
import './styles.css'
import { App } from './App'

render(
  <>
    <div style={{ position: 'absolute', top: 40, left: 40 }}>Capsule Clump</div>
    <div style={{ pointerEvents: 'none', position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', gap: 35, alignItems: 'center', padding: 40 }}>
      <div style={{ position: 'relative', flex: 1, marginLeft: 35, display: 'flex', alignItems: 'flex-end', gap: 35, justifyContent: 'space-between' }}>
        Mark Franz
        <br />
        Code Experiments
        <div>12/19/2023</div>
      </div>
    </div>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </>,
  document.getElementById('root')
)
