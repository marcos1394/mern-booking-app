import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import './App.css'
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SingIn"

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Pagina de Inicio</p>
        </Layout>}/>
        <Route path="/search" element={<Layout>
          <p>Pagina de Busqueda</p>
        </Layout>}/>
        <Route path="/register" element={<Layout><Register/></Layout>}/>
        <Route path="/sign-in" element={<Layout><SignIn/></Layout>}/>
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Routes>
    </Router>
  )
}



export default App
