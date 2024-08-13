import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './router';
import Spinner from './components/statics/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

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
