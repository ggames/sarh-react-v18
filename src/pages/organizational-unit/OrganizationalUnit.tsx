import { Controller, useForm } from "react-hook-form"
import AgentAutocomplete from "../../components/ui/AgentAutocomplete"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Button } from "../../components/ui/Button"
import { useAppDispatch, useAppSelector } from "../../hooks/store"
import { addOrganizationalUnit, fetchOrganizationalById } from "../../features/organization/organizationalThunk"
import { OrganizationalUnit } from "../../models/organizationalUnit"
import { AgentWithId } from "../../models/agent"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { RootState } from "../../features"



export const OrganizationalUnitFC = ({ mode }: { mode: "edit" | "create" }) => {

  interface OrganizationalFields {
    id: number;
    nameUnit: string;
    director: AgentWithId;
    viceDirector?: AgentWithId;
  }

  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const { organizational } = useAppSelector((state: RootState)=> state.organizationals);

  const { control, watch, register, handleSubmit, setValue } = useForm<OrganizationalFields>();

  const directorDetails = watch('director');
  const viceDirectorDetails = watch('viceDirector');

  useEffect(() => {
    if (mode === "edit" && id) {
      dispatch(fetchOrganizationalById({ organizational_id: Number(id) }));
    }
  }, [id, mode, dispatch]);

  useEffect(()=> {
    if(mode === "edit" && organizational){
      setValue("id", organizational.id);
      setValue("nameUnit", organizational.nameUnit);
      setValue("director", organizational?.director);
      setValue("viceDirector", organizational.viceDirector?? undefined);
    }
    console.log(organizational);      
   
  }, [mode, organizational, setValue]);

  const organizationSubmit = (data: OrganizationalFields) => {
    const organizational: OrganizationalUnit = {
      nameUnit: data.nameUnit,
      director: data.director,
      viceDirector: data.viceDirector
    };



    dispatch(addOrganizationalUnit(organizational));
  }


  return (
    <div>
      <h5 className="p-2 mb-1 text-1xl font-bold text-gray-400 dark:text-white border border-gray-200 bg-[#cddafd] rounded-t-lg">
        Crear Departamento Academico
      </h5>
      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit(organizationSubmit)} >

          <div className="mb-4">
            <Label htmlFor="nameUnit">Departamento academico</Label>
            <Input {...register("nameUnit")} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Label htmlFor="director">Director Departamento</Label>
              <Controller
                name="director"
                control={control}
                render={({ field: { onChange } }) => (
                  <div className="flex items-center space-x-2">
                    <div>
                      <svg fill="#a6a2a2" className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" width="42px" height="42px" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.875 4.5a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM0 4.5a4.5 4.5 0 007.05 3.708l3.45 3.463.796-.796-3.41-3.41A4.5 4.5 0 100 4.5z" />
                      </svg>
                    </div>
                    <AgentAutocomplete onSelect={(a) => onChange(a)} />

                  </div>
                )}

              />
            </div>
            <h5 className="col-span-3">Información de Director</h5>

            <div className="card col-[1/2] pl-2">
              <Label>Apellido</Label>
              <span>{directorDetails?.lastname}</span>
            </div>
            <div className="card col-[2/2] pl-2">
              <Label>Nombres</Label>
              <span>{directorDetails?.firstname}</span>
            </div>
            <div className="card col-[3/3] pl-2">
              <Label>Documento</Label>
              <span>{directorDetails?.document}</span>
            </div>


          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Label htmlFor="viceDirector">Vicedirector Departamento</Label>
              <Controller
                name="viceDirector"
                control={control}
                render={({ field: { onChange } }) => (
                  <div className="flex items-center space-x-2">
                    <svg
                      fill="#a6a2a2"
                      className="w-5 h-5 text-gray-400 flex-shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7.875 4.5a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM0 4.5a4.5 4.5 0 007.05 3.708l3.45 3.463.796-.796-3.41-3.41A4.5 4.5 0 100 4.5z" />
                    </svg>
                    <AgentAutocomplete onSelect={(a) => onChange(a)} />
                    <div className="flex-1">

                    </div>
                  </div>
                )}
              />
            </div>
            <h5 className="col-span-3">Información de Vicedirector</h5>

            <div className="card col-[1/2] pl-2">
              <Label>Apellido</Label>
              <span>{viceDirectorDetails?.lastname}</span>
            </div>
            <div className="card col-[2/2] pl-2">
              <Label>Nombres</Label>
              <span>{viceDirectorDetails?.firstname}</span>
            </div>
            <div className="card col-[3/3] pl-2">
              <Label>Documento</Label>
              <span>{viceDirectorDetails?.document}</span>
            </div>


          </div>



          <Button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Agregar</Button>
        </form>
      </div>

    </div>
  )
}
