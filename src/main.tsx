import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { LinkContextProvider } from './context/linkContext.tsx'

createRoot(document.getElementById('root')!).render(
  <LinkContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LinkContextProvider>
)
