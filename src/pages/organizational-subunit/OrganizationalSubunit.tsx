import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useParams } from "react-router-dom";
//import { addSuborganizational, fetchSuborganizationalById, updateSuborganizational } from "../../features/agent/suborganizational/suborganizationalThunk";
import { useForm } from "react-hook-form";
import { Label } from "../../components/ui/Label";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { fetchOrganizationalUnit } from "../../features/organization/organizationalThunk";
import { OrganizationalSubUnitWithId } from '../../models/organizationalSubUnit.d';
import { toast } from "react-toastify";
import { addSuborganizational, fetchSuborganizationalById, updateSuborganizational } from "../../features/suborganizational/suborganizationalThunk";

export const OrganizationalSubunit = ({ mode }: { mode: "create" | "edit" }) => {

  interface SubOrganizationalFields {
    id: number;
    nameSubUnit: string;
    guaraniCode?: string;
    organizationalUnitId: number;
  }

  const dispatch = useAppDispatch();

  const { suborganizational } = useAppSelector((state) => state.suborganizationals);
  const { organizationals } = useAppSelector((state) => state.organizationals);

  const { id } = useParams<{ id: string }>();

  const { register, handleSubmit, setValue } = useForm<SubOrganizationalFields>();

  useEffect(() => {
    if (mode === "edit" && id) {
      dispatch(fetchSuborganizationalById({ suborganizational_id: Number(id) }));
    }

    dispatch(fetchOrganizationalUnit());

  }, [id, mode, dispatch]);

  useEffect(() => {
    if (mode === "edit" && suborganizational) {
      setValue("id", suborganizational.id);
      setValue("nameSubUnit", suborganizational.nameSubUnit);
      setValue("guaraniCode", suborganizational.guaraniCode ?? undefined);
      setValue("organizationalUnitId", suborganizational.organizationalUnit);
      console.log(suborganizational);
    }
  }, [mode, suborganizational]);

  const suborganizationSubmit = (data: SubOrganizationalFields) => {
    const subOrganizationalRequest: OrganizationalSubUnitWithId = {
      id: data.id,
      nameSubUnit: data.nameSubUnit,
      guaraniCode: data.guaraniCode,
      organizationalUnit: data.organizationalUnitId
    };
    if (mode === "edit") {
      dispatch(addSuborganizational(subOrganizationalRequest)).unwrap().then(() => {
        toast.success("Departamento Academico actualizado con exito");
      }).catch(() => {
        toast.error("Error al actualizar el Departamento Academico");
      });
    } else {
      dispatch(updateSuborganizational({
        suborganizational_id: Number(id),
        suborganizational: subOrganizationalRequest
      })).unwrap().then(() => {
        toast.success("Departamento Academico creado con exito");
      }).catch(() => {
        toast.error("Error al crear el Departamento Academico");
      });
    }
  }

  return (
    <div>
      <h5 className="p-2 mb-1 text-1xl font-bold text-gray-400 dark:text-white border border-gray-200 bg-[#cddafd] rounded-t-lg">
        Crear Departamento Academico
      </h5>
      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit(suborganizationSubmit)} >
         <div className="grid grid-cols-2 gap-6">
          <div className="mb-4">
            <Label htmlFor="nameSubUnit">Materia</Label>
            <Input {...register("nameSubUnit")} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />
          </div>
          <div className="mb-4">
            <Label htmlFor="nameUnit">Cod. Guarani</Label>
            <Input {...register("guaraniCode")} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />
          </div>
          <div className="mb-4">
            <Label htmlFor="organizationalUnitId">Departamento Academico</Label>
            <select {...register("organizationalUnitId")} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' >
              <option value={0}>Seleccione un departamento academico</option>
              {organizationals.map((org) => (
                <option key={org.id} value={org.id}>{org.nameUnit}</option>
              ))}
            </select>
          </div>
         </div>
          

          <Button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Agregar</Button>
        </form>
      </div>

    </div>
  )

}
