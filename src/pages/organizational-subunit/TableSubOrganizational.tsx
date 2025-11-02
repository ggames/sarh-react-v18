import { FaPlus } from "react-icons/fa";
import { Button } from "../../components/ui/Button";
import { RootState } from "../../features";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect } from "react";
//import { fetchSuborganizationalUnits } from '../features/agent/suborganizational/suborganizationalThunk';
import { Spinner } from "../../components/ui/Spinner";
import { Link } from "react-router-dom";
import { LuFilePen, LuTrash2 } from "react-icons/lu";
import { fetchSuborganizationalUnits } from "../../features/suborganizational/suborganizationalThunk";

export const TableSubOrganizational = () => {

    const dispatch = useAppDispatch();
    const { suborganizationalDTOs, loading } = useAppSelector((state: RootState) => state.suborganizationals);

    useEffect(() => {
         dispatch(fetchSuborganizationalUnits());
    }, []);

    return (
        <div >

            <h5 className="p-2 mb-1 text-1xl font-bold text-gray-400 dark:text-white border border-gray-200 bg-[#cddafd] rounded-t-lg">
                Información de materias
            </h5>
            <div className="flex gap-4 pb-4">

                <Button className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#DAA520] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Agregar  <FaPlus /></Button>
            </div>
            <div className='p-6 space-y-6'>
                <table className=" divide-y divide-gray-200">
                    <thead className="bg-[#d5d8d3]">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Materia</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-winder">Cod Guarani</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Departamento</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="items-center">
                                    <Spinner></Spinner>
                                </td>
                            </tr>) : Array.isArray(suborganizationalDTOs) && suborganizationalDTOs.length > 0 ?
                            (suborganizationalDTOs.map((suborganizational) => (
                                <tr key={suborganizational.id}>
                                    <td className="px-6 py-2 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-500">
                                                    {suborganizational.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {suborganizational.nameSubUnit}
                                        </div>

                                    </td>
                                     <td className="px-6 py-3 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {suborganizational.guaraniCode ?? 'N/A'} 
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {suborganizational.nameUnit} 
                                        </div>
                                    </td>
                                  

                                    <td className="p-6 py-4 font-medium text-gray-900 
                    dark:text-white break-words max-w-xs">
                                        <div className="grid grid-cols-2 gap-1">
                                            <Link to={`/materia/edit/${suborganizational.id}`}>
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
    );
}