import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from './pages/auth'
import Expense from './pages/expense-tracker'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Auth />} />
        <Route path='/expense-tracker' element={<Expense />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
