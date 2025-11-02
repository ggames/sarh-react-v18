import { FaPlus } from "react-icons/fa";
import { Button } from "../../components/ui/Button";
import { RootState } from "../../features";
import { useAppDispatch, useAppSelector } from "../../hooks/store";


import { Spinner } from "../../components/ui/Spinner";
import { Link } from "react-router-dom";
import { LuFilePen, LuTrash2 } from "react-icons/lu";
import { useEffect } from "react";
import { fetchOrganizationalUnitDto } from '../../features/organization/organizationalThunk';

export  const TableOrganizationalUnit = () => {

    const dispatch = useAppDispatch();

    const { loading, organizationalsDto } = useAppSelector((state: RootState) => state.organizationals);

useEffect(( )=> {
    dispatch(fetchOrganizationalUnitDto());
},[]);

    return (
        <div className='container max-w-5xl' >

            <div className="left-0 top-0">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-400 sm:text-xl">Información de departamento</h2>

            </div>
            <div className="flex gap-4 pb-4">

                <Button className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#DAA520] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Agregar  <FaPlus /></Button>
            </div>
            <div className='w-full h-[80vh] overflow-y-auto'>
                <table className=" divide-y divide-gray-200">
                    <thead className="bg-[#d5d8d3]">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Departamento</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-winder">Director departamento</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Vicedirector departamento</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="items-center">
                                        <Spinner></Spinner>
                                    </td>
                                </tr>) : Array.isArray(organizationalsDto) && organizationalsDto.length > 0 ?
                                (organizationalsDto.map((organizational) => (
                                    <tr key={organizational.id}>
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-500">
                                                        {organizational.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {organizational.nameUnit}
                                            </div>
                                            
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {organizational.lastname} ,{organizational.firstname}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {organizational.firstnamevice ? (organizational.lastnamevice + ',' + organizational.firstnamevice) : 'No asignado'}
                                            </div>
                                        </td>
                                     
                                        <td className="p-6 py-4 font-medium text-gray-900 
                    dark:text-white break-words max-w-xs">
                                            <div className="grid grid-cols-2 gap-1">
                                                <Link to={`/departamento/edit/${organizational.id}`}>
                                                    <LuFilePen size={20} />
                                                </Link>
                                                <Link to={'#'}>
                                                    <LuTrash2 size={20} />
                                                </Link>
                                            </div>

                                        </td>
                                    </tr>
                                ))) :
                                (<></>)

                            }
                        </tbody>
                    
                </table>

            </div>

        </div>
    )
}