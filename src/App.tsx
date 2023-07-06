import { BrowserRouter as Router } from 'react-router-dom';
import WebRoutes  from './routes/index';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <WebRoutes />
      </Router>
    </>
  )
}

export default App
