import { IconType } from 'react-icons';
import {  LuLayoutDashboard,

  LuCircleUserRound, LuSettings, LuWalletCards } from 'react-icons/lu'
import { FiUsers } from 'react-icons/fi';

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
          name: "Agentes",
          path: "/agentes",
          icon: FiUsers,
        },
        {
          name: "Payment",
          path: "/payment",
          icon: LuWalletCards,
        },
        {
          name: "Accounts",
          path: "/accounts",
          icon: LuCircleUserRound,
        },
        {
          name: "Settings",
          path: "/settings",
          icon: LuSettings,
          items: [
            {
              name: "General",
              path: "/settings",
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
        return (
         <div className='fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-4'>
           <div className='flex flex-col space-y-10 w-full'>
              <img className='h-10 w-fit'  src="./src/assets/logo_fich.svg" alt="Logo" />
              <div className='flex flex-col space-y-2'>
                   { items.map((item, index) => (
                       <SidebarItem key={index} item={item}  />
                   ))

                   }
              </div>
           </div>

         </div>
        )
      }

      export default Sidebar;