import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Form from './Form'
import Result from './Result'
import './index.css'
import { BrowserRouter   as Router, Route ,Routes} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>

    <Routes>
      <Route exact path="/"  element={<App/>} />
      <Route path="/form" exact  element={<Form/>} />
      <Route
          path="/profile/:profile"
          exact
          element={<Result/>}
        />
    </Routes>

    {/* <App /> */}
  </Router>
)
