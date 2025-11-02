import { RootState } from "../features"
import { useAppSelector } from "../hooks/store"



export const Header = () => {

    const { user } = useAppSelector((state: RootState) => state.auth)

    console.log("EL USUARIO ACTUAL ", user);

    return (
        <header >
           <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-5">
                <div className="flex items-center justify-between">

            <div className="text-md font-bold">
                <span className="font-light">Buenos días,
                </span> {user?.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()) || "Invitado"}
            </div>

            <div className="p-0 ">
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">Tom Cook</p>
                        <p className="text-xs text-gray-400">View profile</p>
                    </div>
                </div>
            </div>

          </div>
         </div>
      
            

        </header>
    )
}