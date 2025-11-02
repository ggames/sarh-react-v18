import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { useTransformationAction } from "../../features/transformation/useTransformationAction";
import { useAppDispatch } from "../../hooks/store";
import { BodyResolutions } from '../../constants/BodyResolutions';
import { useForm } from "react-hook-form";
import { SelectYears } from "../../components/ui/SelectYears";
import { TextArea } from "../../components/ui/TextArea";
import { Select } from "../../components/ui/Select";

export default function Transformation() {

  const dispatch = useAppDispatch();
  const { addTransformation } = useTransformationAction();

  interface TransformationFields {
    id: number;
    bodyResolutions: (typeof BodyResolutions)[number];
    resolutionNo: string;
    resolutionYear: string;
    date: string | undefined;
    reason: string;
  }

  const { register, reset, handleSubmit } = useForm<TransformationFields>();

  const onSubmit = (data: TransformationFields) => {

    const dateString = data.resolutionYear as string;

    console.log("Nro de Resolución  ", data.bodyResolutions.concat(" ", data.resolutionNo as string, "/", dateString))

    dispatch(addTransformation({
      resolutionNumber: data.bodyResolutions.concat(" ", data.resolutionNo as string, "/", dateString),
      date: data.date,
      reason: data.reason
    }));

    reset({
      bodyResolutions: "-1",
      resolutionYear: "-1"
    });
  }

  return (
    <div>
      <h5 className="p-2 mb-0 text-1xl font-bold text-gray-900 dark:text-white bg-[#ffffef] ">Información de la Transformación</h5>

      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="mt-6">
            <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
              <div>
                <Label htmlFor="bodyResolutions">Organo Emisor</Label>
                <Select {...register('bodyResolutions')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' >
                  <option value="-1">Elegir un organismo</option>
                  {
                    BodyResolutions.map((organ, index) => (
                      <option key={index} value={organ}>
                        {organ}
                      </option>
                    ))
                  }
                </Select>
              </div>
              <div>
                <Label htmlFor="resolutionNo">Nro Resolución</Label>
                <Input {...register('resolutionNo')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />
              </div>
              <div>
                <Label htmlFor="resolutionYear">Año Res.</Label>

                <SelectYears {...register('resolutionYear')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />

              </div>
              <div>
                <Label htmlFor="date">Fecha Resol.</Label>
                <Input type="date" {...register('date')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'/>
              </div>



            </div>
            <div className="mt-6">
              <Label htmlFor="reason">Motivo</Label>

              <TextArea {...register('reason')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />

            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <button className="block  rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus:outline-offset-2 focus:outline-indigo-600"> Guardar</button>
          </div>
        </form>
      </div>
    </div>

  );
};
