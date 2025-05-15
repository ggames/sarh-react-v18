import './index.css'
import { Route, Routes } from 'react-router-dom'

//import { Login } from './components/Login'
//import { ListOfUsers } from './pages/user/ListOfUsers'

import Layout from './components/Layout'
import { RequireAuth } from './components/RequireAuth'
import { Roles } from './constants/Roles'
import { Home } from './components/Home'
import { Unauthorized } from './components/Unauthorized'
import { Login } from './pages/Login/Login'
import Agent from './pages/agent/Agent'
import { ListOfAgents } from './pages/agent/ListOfAgents'
import AgentEdit from './pages/agent/AgentEdit'



function App() {

  return (
    <Routes>
     
      <Route path="login" element={<Login/>}/>
     
      <Route path="/" element={<Layout/>} >
    
      <Route path="unauthorized" element={<Unauthorized/>} /> 
      <Route element={<RequireAuth allowedRoles={[Roles.ROLE_USER]}/>} >
         <Route path="/" element={<Home/>} /> 
         <Route path="agentes" element={<Agent/>} />
         <Route path="agentes/:id" element={<AgentEdit/>} />
         <Route path="agentes/all" element={<ListOfAgents/>} />
      </Route>
      </Route>
    </Routes>  
    )
}

export default App
