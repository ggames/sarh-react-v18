import { IconType } from 'react-icons';
import {
  LuLayoutDashboard,
  // LuUserRoundCog
} from 'react-icons/lu'
import { GrUserWorker } from "react-icons/gr";

// import { GrBusinessService } from "react-icons/gr";
import { FaFileInvoiceDollar, FaUsersCog } from "react-icons/fa";
import { LiaUserClockSolid } from "react-icons/lia";

//import { FaUserClock } from "react-icons/fa6";

//import { FiUsers } from 'react-icons/fi';
import { PiTreeStructureDuotone } from "react-icons/pi";
import { VscLibrary } from "react-icons/vsc";
import { TbReport, TbTransformFilled } from "react-icons/tb";

import SidebarItem from './SidebarItem';



interface ISidebarItem {
  name: string;
  path: string;
  icon: IconType; // Use the correct type for your icon
  items?: ISubItem[]; // Nested items
}

interface ISubItem {
  name: string;
  path: string;
}

const items: ISidebarItem[] =
  [  
   
    {
      name: "Dashboard",
      path: "/",
      icon: LuLayoutDashboard,
    },
     {
      name: "Configuracion Paritaria",
      path: "/puntos",
      icon: FaFileInvoiceDollar
    },
    {
      name: "Agentes",
      path: "/agentes/all",
      icon: FaUsersCog,
    },
    {
      name: "Cargos",
      path: "/cargos/all",
      icon: GrUserWorker,
    },
    {
      name: "Planta de cargos",
      path: "/plantas",
      icon: LiaUserClockSolid,
    },
    {
      name: "Transformación",
      path: "/transformacion",
      icon: TbTransformFilled
    },
    {
      name: "Departamento",
      path: "/departamento",
      icon: PiTreeStructureDuotone

    },
    {
      name: 'Materias',
      path: '/materias',
      icon: VscLibrary
    },
    {
      name: "Informes",
      path: "/settings",
      icon: TbReport,
      items: [
        {
          name: "De planta",
          path: "/reporte-plantas",
        },
        {
          name: "Security",
          path: "/settings/security",
        },
        {
          name: "Notifications",
          path: "/settings/notifications",
        },
      ],
    },
  ];



const Sidebar = () => {

  {/* <div className='flex justify-center'>
          <img className='h-10 w-fit' src='/src/assets/logo_fich.svg' alt="Logo" />

        </div> */}
  return (
    <>

      <aside className='p-2 w-64 shadow-md'>
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <img src="/src/assets/unl.png" alt="Logo" className="h-16 w-fit" />
            
          </div>
        </div>

          { /* <!-- User Profile --> */  }
       

        <nav className='mt-8'>
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))

          }
        </nav>
      </aside>
    </>


  )
}


/*  const Sidebar = () => {

const isSidebarOpen = useAppSelector((state: RootState) => state.isSideBarOpen);
const dispatch = useAppDispatch();

return (
  <>
    {isSidebarOpen && (<div
      className="fade-in absolute top-0 left-0 w-screen 
      h-screen backdrop-blur-xs backdrop-filter z-10"
      onClick={() => dispatch(closeSidebar())}
    />)}
    <img className='h-10 w-fit' src="./src/assets/logo_fich.svg" alt="Logo" />
    <nav   className={clsx(
        "h-full w-[200px] px-3 bg-red-50 absolute top-0 -left-[200px] ",
        "transform transition-all duration-300 z-20",
        { "translate-x-[200px]": isSidebarOpen }
      )}>
      {items.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))

      }
    </nav>
  </>
)
} */



export default Sidebar;