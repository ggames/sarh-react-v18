import { useParams } from "react-router-dom"
// import { usePlantPositionAction } from '../../features/plant/usePlantPositionAction';

import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { RootState } from "../../features";
import { useEffect } from "react";
import { CharacterPlant } from "../../constants/CharacterPlant";
import { StatusOfPosition } from "../../constants/StatusOfPosition";
// import { usePlantHistoryAction } from "../../features/planthistory/usePlantHistoryAction";
import { useForm } from "react-hook-form";

import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Table } from "../../components/ui/Table";
import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Select";
import { PlantStatus } from "../../constants/PlantStatus";
import { fetchPlantsOfPositionById, updatePlantPosition } from "../../features/plant/plantPositionThunk";
import { PlantPositionRequest } from "../../models/plant-position";
import { fetchPlantHistoryLast, fetchPlantHistoryList } from "../../features/planthistory/PlantHistoryThunk";



interface PlantEditableFields {
  id: number,
  positionId: number,
  agentId: number,
  characterPlantID?: (typeof CharacterPlant),
  currentStatusID?: (typeof StatusOfPosition),
  dateFrom?: string | undefined,
  dateTo?: string | undefined
}


export const PlantPositionUpdate = () => {

  const { id } = useParams<{ id: string }>()
  // const { fetchPlantPositionById, updatePlantPosition } = usePlantPositionAction();
  //const { fetchPlantHistoryList, fetchPlantHistoryLast } = usePlantHistoryAction();

  const dispatch = useAppDispatch();
  const { plant } = useAppSelector((state: RootState) => state.plants);
  const { plantHistories, plantHistory } = useAppSelector((state: RootState) => state.planthistory);

  const { register, reset, handleSubmit } = useForm<PlantEditableFields>();


  useEffect(() => {
     console.log("ID Planta a editar: ", id);
    if(id) {
       console.log("ENTRO AL IF: ", id);
        dispatch(fetchPlantsOfPositionById({plantId: Number(id)}));
        dispatch(fetchPlantHistoryList({planthistory_id: Number(id)}));
        dispatch(fetchPlantHistoryLast({ planthistory_id: Number(id)}));
    }
 
     console.log("Planta actualizada ", plant);
    
  //  
  //  
   

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  useEffect(() => {
     
    if(!plant) return;

    if (plantHistory && plantHistory?.dateTo == undefined) {
      reset(
        {
          id: plant.id,
          positionId: plant.position.id,
          agentId: plant.agent.id,
          characterPlantID: plant.characterplantID,
          currentStatusID: plantHistory.plantStatus,
          dateFrom: plantHistory.dateFrom,
          dateTo: plantHistory.dateTo
        }
      )
    }
    
   else {
      reset(
        {
          positionId: plant.position.id,
          agentId: plant.agent.id,
          characterPlantID: plant.characterplantID,
          currentStatusID: plant.currentStatusID,
          id: 0,
          dateFrom: '',
          dateTo: '',

        }
      )
    }

    console.log("Plant para editar", plant);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ plant, plantHistory, reset])

  const onSubmit = (data: PlantEditableFields) => {
    
    const updatePlant: PlantPositionRequest  = {
      positionId: data.positionId,
      agentId: data.agentId,
      characterplantID: typeof data.characterPlantID === "string" ? data.characterPlantID : "" ,
      currentStatusID: typeof data.currentStatusID === "string" ? data.currentStatusID : "",
      dateFrom: data.dateFrom ?? '',
      dateTo: data.dateTo ?? '',
      id: 0,
      reasonForMovement: ""
    }

    console.log("Edición Planta de Cargos ", data);
    
    dispatch(updatePlantPosition( { plantId: data.id, plantPositionRequest: updatePlant } ));
    
   // dispatch(fetchPlantsOfPositionById(Number(id)));
   // dispatch(fetchPlantHistoryList(Number(id)));
   // dispatch(fetchPlantHistoryLast(Number(id)));
    

  }

  return (
    <div className='mx-auto max-w-2xl sm:mt-6 border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800'>


      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <h5 className="p-2 mb-0 text-1xl font-bold  text-gray-900 dark:text-white border border-gray-200 bg-gray-100">Información Personal</h5>
        <div className="flex flex-wrap justify-evenly">
          <div className="w-1/2 p-2">
            <Label htmlFor="firstname">Nombre</Label>
            <Input value={plant?.agent.firstname}
              readOnly
            />

          </div>
          <div className="w-1/2 p-2">
            <label htmlFor="lastname">Apellido</label>
            <input value={plant?.agent.lastname} readOnly className="block w-full rounded-md bg-white py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
          <div className="w-1/2 p-2">
            <label htmlFor="documenttype">Tipo Doc.</label>
            <input value={plant?.agent.lastname} readOnly className="block w-full rounded-md bg-white py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
          <div className="w-1/2 p-2">
            <label htmlFor="lastname">Documento</label>
            <input value={plant?.agent.lastname} readOnly className="block w-full rounded-md bg-white py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
        </div>
        <h5 className="p-2 mb-0 text-1xl font-bold  text-gray-900 dark:text-white border border-gray-200 bg-gray-100">Datos de Cargo.</h5>

        <div className="flex flex-wrap justify-evenly">
          <div className="w-1/2 p-2">
            <label htmlFor="positionCode">Cod. Cargo</label>
            <input value={plant?.position.pointID.positionCode} readOnly className="block w-full rounded-md bg-white py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-indigo-600" />

          </div>
          <div className="w-1/2 p-2">
            <label htmlFor="namePosition">Tipo Cargo</label>
            <input value={plant?.position.pointID.namePosition} readOnly className="block w-full rounded-md bg-white py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
          <div className="w-1/2 p-2">
            <label htmlFor="pointsAvailable">Ptos Disponibles.</label>
            <input value={plant?.position.pointsAvailable} readOnly className="block w-full rounded-md bg-white py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
          <div className="w-1/2 p-2">
            <label htmlFor="characterplantID">Caracter Cargo</label>
            <input value={plant?.characterplantID} readOnly className="block w-full rounded-md bg-white py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
          <div className="w-1/2 p-2">
            <label htmlFor="currentStatusID">Estado Actual</label>
            <input value={plant?.currentStatusID} readOnly className="block w-full rounded-md bg-white py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
          <div className="w-1/2 p-2">
            <label htmlFor="nameUnit">Unidad Org.</label>
            <input value={plant?.position.organizationalUnitID.nameUnit} readOnly className="block w-full rounded-md bg-white py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
        </div>
        <h5 className="p-2 mb-0 text-1xl font-bold  text-gray-900 dark:text-white border border-gray-200 bg-gray-100">Datos de Planta.</h5>

        <div className="py-2 flex flex-wrap justify-evenly">
          <div className="w-1/2 p-2">
            <Label htmlFor="dateFrom">Fecha Desde</Label>
            <Input type="date" {...register('dateFrom')} />
          </div>
          <div className="w-1/2 p-2">
            <Label htmlFor="dateTo">Fecha Hasta</Label>
            <Input type="date" {...register('dateTo')} />
          </div>
          <div className="w-2/2 p-2">
            <Label htmlFor="movementForReason">Estado Planta</Label>
            <Select {...register('currentStatusID')}>
              {Object.entries(PlantStatus).map(([key, plantState]) => (
                <option key={key} value={key}>
                  {plantState}
                </option>
              ))}

            </Select>
          </div>
        </div>
        <Button onSubmit={() => onSubmit} className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"> Modificar</Button>

        <div>

        </div>
        <div className="p-2">
          <Table
            columns={[
              { key: "plantStatus", header: "Estado Actual" },
              { key: "dateFrom", header: "Fecha Desde" },
              { key: "dateTo", header: "Fecha Hasta" }
            ]}
            data={plantHistories}
            className="table-auto"
          />
        </div>

      </form>
    </div>

  )
}

