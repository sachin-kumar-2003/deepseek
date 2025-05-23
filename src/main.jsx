import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
// const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const clerkFrontendApi = 'pk_test_Zmlyc3Qtd2hhbGUtMy5jbGVyay5hY2NvdW50cy5kZXYk'

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkFrontendApi}>
    <AppContextProvider values={{}}>
    <App />
    </AppContextProvider>
  </ClerkProvider>,
)
