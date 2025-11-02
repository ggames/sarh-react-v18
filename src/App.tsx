import './index.css'
import { Route, Routes } from 'react-router-dom'

//import { Login } from './components/Login'
//import { ListOfUsers } from './pages/user/ListOfUsers'

import Layout from './components/Layout'
import { RequireAuth } from './components/RequireAuth'
import { Roles } from './constants/Roles'
import { Unauthorized } from './components/Unauthorized'
import { Login } from './pages/Login/Login'

//import { ListOfAgents } from './pages/agent/ListOfAgents'

import { PlantPositionCreate } from './pages/plant/PlantPositionCreate'
//import { Position } from './pages/position/Position'
import { StaffingPlans } from './pages/plant/StaffingPlans'
import { PlantPositionUpdate } from './pages/plant/PlantPositionUpdate'
import { ListOfAgents2 } from './pages/agent/ListOfAgents2'


import { ToastContainer } from 'react-toastify'
import Transformation from './pages/transformation/Transformation'
import { PageNotFound } from './components/PageNotFound'
import { OrganizationalUnitFC } from './pages/organizational-unit/OrganizationalUnit'

// import { initAxios } from './api/api.axios'
//import { OrganizationalSubunit } from './pages/organizational-subunit/OrganizationalSubunit';
import { PlantReport } from './pages/plant-report/plant-report'
import { Position } from './pages/position/Position'
import { ListPositions } from './pages/position/ListPositions'
import Agent from './pages/agent/Agent'
import { TableOrganizationalUnit } from './pages/organizational-unit/TableOrganizationalUnit'
import { TableSubOrganizational } from './pages/organizational-subunit/TableSubOrganizational'
import { OrganizationalSubunit } from './pages/organizational-subunit/OrganizationalSubunit'
import { Point } from './pages/point/Point'





function App() {



  return (
    <>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />} >
          <Route path="unauthorized" element={<Unauthorized />} />
          
          <Route element={<RequireAuth allowedRoles={[Roles.ROLE_USER]} />} >
          {/*   <Route path='cargos' element={<Position />} />  */}
            <Route path='puntos' element={<Point />} />
            <Route path='cargos/all' element={<ListPositions />} />
            <Route path='agente/create' element={<Agent mode="create" />} />
            <Route path='agente/edit/:id' element={<Agent mode="edit" />} />
            <Route path='transformacion' element={<Transformation />} />
            <Route path='plantas' element={<StaffingPlans/>} />
            <Route path='planta/edit/:id' element={<PlantPositionUpdate/>} />
            <Route path='planta/create' element={<PlantPositionCreate/>} />
            <Route path='cargo/edit/:id' element={<Position mode={'edit'}/> } />
            <Route path='cargo/create' element={<Position mode={'create'}/> } />
            <Route path='agentes/all' element={<ListOfAgents2 />} />
            <Route path='departamento' element={<TableOrganizationalUnit/>} />
            <Route path='departamento/edit/:id' element={<OrganizationalUnitFC mode={"edit"}/>} />
           
            <Route path='departamento/create' element={<OrganizationalUnitFC mode={"create"}/>} />
            <Route path='materias' element={<TableSubOrganizational/>} /> 
            <Route path='materia/edit/:id' element={<OrganizationalSubunit mode={"edit"}/>} /> 

            <Route path='reporte-plantas' element={<PlantReport />} />
             <Route path='*' element={<PageNotFound/>} />
          </Route>
        </Route>
       
      </Routes>
      <ToastContainer position='top-right' autoClose={3000} />

    </>

  )
}

export default App
