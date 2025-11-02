

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as Tabs from "@radix-ui/react-tabs";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
// import { usePositionAction } from "../../features/position/usePositionAction";
import { useEffect } from "react";

import { PlantStatus } from '../../constants/PlantStatus';
//import { RootState } from "../../features";
import { DocumentType } from "../../constants/DocumentType";
import { CharacterPlant } from "../../constants/CharacterPlant";
//import { PlantPosition } from './PlantPosition';


import { useForm, FormProvider, useFormContext, FieldErrors, Controller } from "react-hook-form";

import { PositionDto } from "../../models/position";
import { PlantPositionRequest } from "../../models/plant-position";
//
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Select } from "../../components/ui/Select";
import { TextArea } from "../../components/ui/TextArea";
import { Button } from "../../components/ui/Button";



import { addPlantPosition } from "../../features/plant/plantPositionThunk";
// import { fetchAgentByDocument } from "../../features/agent/agentThunk";
import { fetchAvailablePositions } from "../../features/position/positionThunk";
import AgentAutocomplete from "../../components/ui/AgentAutocomplete";

// import { AgentWithId } from "../../models/agent";
//import { Unauthorized } from '../../components/Unauthorized';




// Schema for validation (uncomment resolver in useForm to use it)
const formSchema = z.object({
    document: z.string().min(7, "DNI inválido"),
    agent: z.object({
        id: z.number(),
        firstname: z.string(),
        lastname: z.string(),
        documenttype: z.enum(["DNI", "PASAPORTE", "CE", "CI", "LE"]),
        document: z.string()

        // Puedes descomentar estos campos si los necesitas más adelante
        // birthdate: z.string(),
        // file: z.string(),
        // email: z.string(),
        // phone: z.string(),
    }),
    position: z.object({
        id: z.number(),
        namePosition: z.string(),
        nameUnit: z.string(),
        pointsAvailable: z.number(),
        positionStatus: z.enum(['ACTIVO', 'VACANTE_DEFINITIVA', 'VACANTE_TRANSITORIA', 'SUPRIMIDO']),
    }),
    reasonForMovement: z.string().min(10, "El motivo es poco claro"),
    characterPlant: z.enum(["ORDINARIO", "INTERINO", "CONTRATADO"]),
    currentStatus: z.enum(['ACTIVO', 'LICENCIA_TRANSITORIA', 'OCUPADO_TRANSITORIAMENTE', 'FINALIZADO']),
    dateFrom: z.string().refine(
        (val) => /^\d{4}-\d{2}-\d{2}$/.test(val),
        { message: "Fecha desde inválida. Formato esperado: YYYY-MM-DD" }
    ),
    dateTo: z.string(),
});
type FormData = z.infer<typeof formSchema>;


const defaultValues: FormData = {
    document: "",
    agent: {
        id: 0,
        firstname: "",
        lastname: "",
        documenttype: "DNI",
        document: ""

    },
    position: {
        id: 0,
        namePosition: "",
        nameUnit: "",
        pointsAvailable: 0,
        positionStatus: "ACTIVO",
    },
    reasonForMovement: "",
    characterPlant: "ORDINARIO",
    currentStatus: "ACTIVO",
    dateFrom: new Date().toISOString().split("T")[0],
    dateTo: '' //new Date().toISOString().split("T")[0],
};



export const PlantPositionCreate = () => {

    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    // const {} = usePla;
    const dispatch = useAppDispatch();
    // const { addPlantPosition } = usePlantPositionAction();

    const { handleSubmit } = methods;

    const onSubmit = (data: FormData) => {
        console.log("Formulario completo", data);
        const plantPosition: PlantPositionRequest = {
            id: 0,
            positionId: data.position.id,
            agentId: data.agent.id, // Este valor debe ser asignado según tu lógica de negocio
            characterplantID: data.characterPlant as CharacterPlant, // Asignar un ID basado en el índice
            currentStatusID: data.currentStatus as PlantStatus, // Asignar un ID basado en el estado
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            reasonForMovement: data.reasonForMovement
        }
        console.log("Datos del formulario para enviar:", plantPosition);
        dispatch(addPlantPosition(plantPosition));

    };



    const onError = (errors: FieldErrors<FormData>) => {
        console.error("Errores en el formulario", errors);
    };

    return (
        <div>
             <h5 className="p-2 mb-6 text-1xl font-bold text-gray-400 dark:text-white border border-gray-200 bg-[#cddafd] rounded-t-lg">
                Planta de cargos 
            </h5>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit, onError)} >
                <Tabs.Root defaultValue="tab1">
                    <Tabs.TabsList className="flex space-x-5">
                        <Tabs.Trigger value="tab1" className="py-2 px-4 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-pink-500">Datos Personales</Tabs.Trigger>
                        <Tabs.Trigger value="tab2" className="py-2 px-4 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-pink-500">Información de Cargo</Tabs.Trigger>
                        <Tabs.Trigger value="tab3" className="py-2 px-4 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-pink-500">Información de Planta</Tabs.Trigger>
                    </Tabs.TabsList>


                    <Tabs.Content value="tab1" className="pt-4 h-[400px]">
                        <PersonalDataTab />
                    </Tabs.Content>
                    <Tabs.Content value="tab2" className="pt-4 h-[400px]">
                        <PositionTab />

                    </Tabs.Content>
                    <Tabs.Content value="tab3" className="pt-4 h-[400px]">
                        <PlantDataTab />
                    </Tabs.Content>
                </Tabs.Root>
                <div className="flex justify-center">

                    <Button type="submit" className="px-8">Guardar</Button>
                </div>
            </form>
        </FormProvider>
        </div>

        
    )

}

const PersonalDataTab = () => {
    // register, setValue,
    const { control, watch } = useFormContext<FormData>();
    // const document = watch('document');
    const agent = watch('agent');
    //const { agent } = useAppSelector((state: RootState) => state.agents);





    // const dispatch = useAppDispatch();


    /*  const searchByDocument = async () => {
 
         const result = await dispatch(fetchAgentByDocument(document)).unwrap();
         /// console.log("Buscando agente por documento:", );
         setValue("agent.id", result.id ?? 0);
         setValue("agent.firstname", result.firstname ?? "");
         setValue("agent.lastname", result.lastname ?? "");
         setValue("agent.document", result.document ?? "")
 
         console.log("AGENTE PERSONAL ", JSON.stringify(agent));
     } */



    return (
        <div className="space-y-5">
            <div>

                <Controller
                    name="agent"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <div className="flex items-center border border-gray-300 rounded-md p-2">
                            <svg fill="#a6a2a2" className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" width="42px" height="42px" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.875 4.5a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM0 4.5a4.5 4.5 0 007.05 3.708l3.45 3.463.796-.796-3.41-3.41A4.5 4.5 0 100 4.5z" />
                            </svg>
                            <div className="flex-1">
                                <AgentAutocomplete onSelect={(a) => onChange(a)} />
                            </div>
                        </div>

                    )}
                />

                {/*   <label>DNI</label>
                <div className="flex gap-2">
                    <Input type="text" {...register("document")} placeholder="Ingrese DNI" />
                        <button type="button" onClick={searchByDocument} className="bg-gray-500 text-white px-3 rounded">
                        Buscar
                    </button>
                </div> */}
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="firstname">Nombre: </Label>
                    <Input value={agent?.firstname} readOnly />
                </div>

                <div>
                    <Label htmlFor="lastname">Apellido: </Label>
                    <Input value={agent?.lastname} readOnly />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div>
                    <Label htmlFor="documenttype">Tipo Doc. </Label>
                    <Select value={agent?.documenttype} disabled>
                        {DocumentType.map((doctype, key) => <option key={key} value={doctype}>
                            {doctype}
                        </option>)}
                    </Select>
                </div>


                <div>
                    <Label htmlFor="document">Documento: </Label>
                    <Input value={agent?.document} readOnly />
                </div>

            </div>


        </div>)
};



const PositionTab = () => {


    const dispatch = useAppDispatch();
    const { positions, loading } = useAppSelector((state) => state.positions);



    //const [selectedItem, setSelectedItem] = useState<PositionDto | null>(null);

    const { watch, setValue } = useFormContext<FormData>();

    const selectedItemId = watch("position.id");

    useEffect(() => {
        dispatch(fetchAvailablePositions());
    }, [])

    const handleSelectedItem = (item: PositionDto) => {

        setValue("position.id", item.id);
        setValue("position.namePosition", item.namePosition);
        setValue("position.nameUnit", item.nameUnit ?? "");
        setValue("position.pointsAvailable", item.pointsAvailable);
        setValue("position.positionStatus", item.positionStatus as unknown as "ACTIVO" | "VACANTE_DEFINITIVA" | "VACANTE_TRANSITORIA" | "SUPRIMIDO");
        console.log("Cargo seleccionado:", item);
    }

    const handleUnselectItem = () => {

        setValue("position.id", 0);
        setValue("position.namePosition", "");
        setValue("position.nameUnit", "");
        setValue("position.pointsAvailable", 0);
        setValue("position.positionStatus", "ACTIVO");
    }

    const selectedItem = positions.find((p) => p.id === selectedItemId) || null;

    return (
        <div className="max-h-64 overflow-y-auto overflow-x-auto border border-gray-300 rounded-lg shadow">
            <table className="min-w-full table-fixed border-collapse">
                <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr>
                        <th className="p-3 text-center">Id Cargo</th>
                        <th className="p-3 text-center">Nombre Cargo</th>
                        <th className="p-3 text-center">Estado Cargo</th>
                        <th className="p-3 text-center">Cantidad Puntos</th>
                        <th className="p-3 text-center">Seleccionar</th>
                    </tr>

                </thead>
                <tbody>
                    {loading ? ((
                        <tr>
                            <td colSpan={3} className="text-center text-gray-500">
                                Cargando...
                            </td>
                        </tr>
                    )
                    ) : (
                        positions.map(position => {
                            return (
                                <tr key={position.id}>
                                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{position.id}</td>
                                    <td className='px-6 py-4 font-medium text-gray-900 dark:text-white break-words max-w-xs'>{position.namePosition.toLowerCase()}</td>
                                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{position.positionStatus.toLowerCase()}</td>
                                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{position.pointsAvailable}</td>
                                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <input type="radio" name="selected" checked={selectedItem?.id === position.id}
                                            onChange={() => handleSelectedItem(position)} />
                                    </td>
                                </tr>
                            )
                        })
                    )

                    }
                </tbody>
            </table>
            {positions && <p> No hay datos para cargar </p>}

            <h2 className="p-2 mb-0 text-1xl font-bold  text-gray-900 dark:text-white border border-gray-200 bg-gray-100">Cargo Seleccionado</h2>

            <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow">

                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-center">Id Cargo</th>
                        <th className="px-6 py-4 font-medium text-gray-900 dark:text-white break-words max-w-xs">Nombre Cargo</th>
                        <th className="p-3 text-center">Estado Cargo</th>
                        <th className="p-3 text-center">Cantidad Puntos</th>
                        <th className="p-3 text-center">Acción</th>
                    </tr>

                </thead>
                <tbody>
                    {selectedItem ? (
                        <tr key={selectedItem.id}>
                            <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{selectedItem.id}</td>
                            <td className='px-6 py-4 font-medium text-gray-900 dark:text-white break-words max-w-xs'>{selectedItem.namePosition.toLowerCase()}</td>
                            <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{selectedItem.positionStatus}</td>
                            <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{selectedItem.pointsAvailable}</td>
                            <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                <button onClick={() => handleUnselectItem()}>Eliminar</button>
                            </td>

                        </tr>
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center text-gray-500">
                                No hay elementos en la tabla destino.
                            </td>
                        </tr>
                    )

                    }
                </tbody>

            </table>
        </div>
    )

}

const PlantDataTab = () => {

    const { register, formState } = useFormContext<FormData>();
    const { errors } = formState;
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-4 gap-2">
                <div>
                    <Label htmlFor="characterPlant">Caract. Planta</Label>
                    <Select {...register("characterPlant")}>
                        {
                            Object.entries(CharacterPlant).map(([key, charac]) =>
                                <option key={key} value={key}>{charac}</option>
                            )
                        }
                    </Select>
                </div>
                <div>
                    <Label htmlFor="currentStatus">Estado Actual</Label>
                    <Select {...register("currentStatus")}>
                        {
                            Object.entries(PlantStatus).map(([key, status]) =>
                                <option key={key} value={key}>{status}</option>
                            )
                        }
                    </Select>
                </div>

            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="dateFrom">Fecha Desde</Label>
                    <Input type="date" {...register("dateFrom")} />

                </div>
                <div>
                    <Label htmlFor="dateTo">Fecha Hasta</Label>
                    <Input type="date" {...register("dateTo")} />

                </div>
            </div>


            <div>
                <Label htmlFor="reasonForMovement">Razón de Movimiento</Label>
                <TextArea  {...register("reasonForMovement")} />
                {errors.reasonForMovement && <p>Debe ingresar una razón valida</p>}
            </div>


        </div>)
}

/* const FormSchema = z.object({

    document: z.string().min(7, "DNI invalido"),
    agent: z.object({

        firstname: z.string().optional(),
        lastname: z.string().optional(),
        documenttype: z.enum(["DNI", "PASAPORTE", "CE", "CI", "LE"]).optional(),
        document: z.string().optional(),
        birthdate: z.string(),
        file: z.string(),
        email: z.string(),
        phone: z.string()
    }),
    position: z.object({
        id: z.number(),
        namePosition: z.string(),
        nameUnit: z.string(),
        pointsAvailable: z.number(),
        positionStatus: z.enum(['ACTIVO', 'VACANTE_DEFINITIVA', 'VACANTE_TRANSITORIA', 'SUPRIMIDO',]),
        discountedQuantity: z.number()
    }),
    reasonForMovement: z.string().min(10, "El motivo es poco claro"),
    characterPlant: z.enum(['ORDINARIO', 'INTERINO', 'CONTRATADO']),
    dateFrom: z.string().refine((arg) =>
        arg.match(
            /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/
        )),
    dateTo: z.string().refine((arg) =>
        arg.match(
            /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/
        )),

}); */