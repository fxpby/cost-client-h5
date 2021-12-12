import React, { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import routes from './router'

function App() {
  return <Router>
    <Routes>
      {
        routes.map(route => 
          <Route exact key={route.path} path={route.path} element={<route.component />} />
        )
      }
    </Routes>
  </Router>
}

export default App
