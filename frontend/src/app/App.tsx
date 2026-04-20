import { Provider } from 'react-redux'
import { Suspense } from 'react'
import { AppRouter } from './router'
import { store } from '@state/store'
import LoadingSpinner from '@components/Widgets/LoadingSpinner'

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingSpinner />}>
        <AppRouter />
      </Suspense>
    </Provider>
  )
}

export default App
