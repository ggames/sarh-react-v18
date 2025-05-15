import { IconType } from "react-icons";
import { Link } from "react-router-dom";

  interface ISubItem {
    name: string;
    path: string;
    icon?: IconType; // Use the correct type for your icon
  }


  const SubMenuItem = ({ item }: { item: ISubItem }) => {
    const { icon: Icon, name, path } = item;
 

  

  
    return (
      <Link to={path || '#'} className={`flex items-center space-x-2 hover:font-semibold cursor-pointer`} >
        {Icon && <Icon size={18} />}
        <p className="text-2x1 font-sans">{name}</p>
      </Link>
    );
  }     

  export default SubMenuItem;