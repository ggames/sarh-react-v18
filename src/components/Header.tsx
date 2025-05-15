import { FaAlignJustify } from "react-icons/fa"

import { useAppDispatch } from "../hooks/store";
import { openSidebar } from "../features/sidebar/sidebarSlice";

export const Header = () => {

     const dispatch  = useAppDispatch();
    
    return (
        <header className="h-14 bg-blue-950 flex flex-row justify-between text-white">
            <div className="w-2/12 flex flex-row justify-center items-center">
                <button
                    className="bg-transparent hover:bg-blue-500 font-semibold
                      hover:text-white py-2 px-4 border border-white hover:border-transparent
                      rounded active:scale-95 "
                    onClick={() => dispatch(openSidebar())}
                >
                    <FaAlignJustify size={25} />
                </button>
            </div>
            <span className="flex justify-center items-center w-10/12 bg-blue-600">aqui puedes colocar un nav menu</span>
        </header>
    )
}