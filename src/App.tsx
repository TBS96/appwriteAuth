import React from 'react'
import { AppwriteProvider } from './appwrite/AppwriteContext'
import Loading from './components/Loading'
import Router from './routes/Router'

const App = () => {
  return (
    <AppwriteProvider>
      <React.Suspense fallback={<Loading/>}>
        <Router/>
      </React.Suspense>
    </AppwriteProvider>
  )
}

export default App