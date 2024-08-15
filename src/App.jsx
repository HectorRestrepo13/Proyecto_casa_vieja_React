import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './router';
import Spinner from './components/statics/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';

// <!-- Vendor CSS Files -->
import './assets/vendor/quill/quill.snow.css'
import './assets/vendor/quill/quill.bubble.css'
import './assets/vendor/remixicon/remixicon.css'
import './assets/vendor/simple-datatables/style.css'
import './assets/vendor/simple-datatables/style.css'
{/* <!-- Template Main CSS File --> */ }
import './assets/css/style.css'

// <!-- Vendor JS Files -->
import './assets/vendor/apexcharts/apexcharts.min.js'
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js'
import './assets/vendor/chart.js/chart.umd.js'
import './assets/vendor/echarts/echarts.min.js'
import './assets/vendor/quill/quill.js'
import './assets/vendor/simple-datatables/simple-datatables.js'
import './assets/vendor/tinymce/tinymce.min.js'
import './assets/vendor/php-email-form/validate.js'
// <!-- Template Main JS File -->
import './assets/js/main.js'


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
