import './App.css'
import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './router';
import Spinner from './components/statics/Spinner'
function App() {

  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <AppRouter />
      </Suspense>
    </Router>
  )
}

export default App
