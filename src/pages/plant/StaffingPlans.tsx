import { useEffect } from "react"
//import { usePlantPositionAction } from "../../features/plant/usePlantPositionAction"
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { RootState } from "../../features";
import { Link, useLocation } from "react-router-dom";
import { LuFilePen, LuTrash2 } from "react-icons/lu";
import { Spinner } from "../../components/ui/Spinner";
import { Button } from "../../components/ui/Button";
import { fetchPlantPositions } from "../../features/plant/plantPositionThunk";
import { FaPlus } from "react-icons/fa";



export const StaffingPlans = () => {

  const { plantDTOs } = useAppSelector((state: RootState) => state.plants);
  const loading = useAppSelector((state: RootState) => state.plants.loading);
  const dispatch = useAppDispatch();

  //const { fetchPlantPosition } = usePlantPositionAction();
  //  const [plantLast, setPlantLast ] = useState<PlantPositionWithId | null>(null);
  const location = useLocation()
  useEffect(() => {

    if (location.pathname === "/plantas") {
      dispatch(fetchPlantPositions());
    };

  }, [dispatch, location.pathname])

  console.log("STAFF de CARGOS ", plantDTOs);


  return (
    <div className="container max-w-5xl">
     
      <div className="left-0 top-0">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-400 sm:text-xl">Planta de cargos </h2>

      </div>
      <div className="flex gap-4">
       
        <Button className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <FaPlus/>Agregar</Button>
      </div>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">

          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
              Id
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
              Agente
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
              Documento
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Departamento - Cargo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Estado
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>

          {loading ? (
            <tr>
              <td colSpan={6} className="items-center">
                <div className="flex justify-center items-center py-4"><Spinner></Spinner></div></td>
            </tr>
          ) : Array.isArray(plantDTOs) && plantDTOs.length > 0 ? (
            plantDTOs.map((plant, index) => (
              <tr key={index} >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">

                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        { plant.id }
                      </div>

                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    { plant.lastname}
                  </div>
                  <div className="text-sm text-gray-900">{plant.firstname}</div>

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plant.document}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {plant.nameSubUnit}
                  </div>
                  <div className="text-sm text-gray-900">{plant.namePosition}</div>

                </td>



                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {plant.currentStatusID  } 
                  </span>
                </td>



                <td className="p-6 py-4 font-medium text-gray-900 
                    dark:text-white break-words max-w-xs">
                  <div className="flex ">
                    <Link to={`/planta/edit/${plant.id}`}>
                      <LuFilePen />
                    </Link>
                    <Link to={'#'}>
                      <LuTrash2 />
                    </Link>
                  </div>

                </td>
              </tr>


            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-3">No hay registros</td>
            </tr>
          )


          }

        </tbody>


      </table>

    </div>
  )
}

