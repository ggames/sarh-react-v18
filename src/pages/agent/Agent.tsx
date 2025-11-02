import { DocumentType } from '../../constants/DocumentType';



//import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
// import { useAppSelector } from '../../hooks/store';
// import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useEffect } from 'react';
import { RootState } from '../../features';

import { useForm } from 'react-hook-form';
import { Label } from '../../components/ui/Label';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { format } from 'date-fns';
import { toast } from "react-toastify";
//import { set } from 'date-fns';
import { addAgent, fetchAgentById, updateAgent } from '../../features/agent/agentThunk';
import { AgentWithId } from '../../models/agent';



export default function Agent({ mode }: { mode: "create" | "edit" }) {

    const { id } = useParams<{ id: string }>();
    const { agent } = useAppSelector((state: RootState) => state.agents);

    const dispatch = useAppDispatch();

    type AgentFields = {
        id: number;
        firstname: string;
        lastname: string;
        documenttype: string;
        document: string;
        birthdate: string;
        leavingdate?: string;
        deceased?: boolean;
        email?: string;
        file: string;
        address?: string;
        phone?: string;
    }

    const { register, setValue, handleSubmit } = useForm<AgentFields>()

    // const { updateAgent, fetchAgentById } = useAgentAction();




    useEffect(() => {

        if (mode === "edit" && id) {
            dispatch(fetchAgentById({ agentId: Number(id) }));


            console.log("ID PARAMS ", agent);
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, mode, dispatch]);

    useEffect(() => {

        console.log("AGENTE SELECCIONADO ", agent);


        if (mode === "edit" && agent) {
            console.log("Fecha nacimiento ", agent.birthdate);

            setValue("id", agent.id);
            setValue("firstname", agent?.firstname ?? "");
            setValue("lastname", agent.lastname ?? "");
            setValue("documenttype", agent?.documenttype ?? "DNI");
            setValue("document", agent?.document ?? "");
            setValue("birthdate", agent.birthdate ? format(new Date(agent.birthdate), 'yyyy-MM-dd') : "");
            setValue("leavingdate", agent.leavingdate ? format(new Date(agent.leavingdate), 'yyyy-MM-dd') : undefined);
            setValue("deceased", agent?.deceased);
            setValue("email", agent.email);
            setValue("file", agent.file);
            setValue("address", agent.address);
            setValue("phone", agent.phone);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, agent, setValue])







    const onSubmit = (data: AgentFields) => {

        console.log("Agente para editar ", data);
        const leavingdateString = data.leavingdate?.toString() as string;
        const birthdateString = data.birthdate?.toString() as string;

        const agentRequest: AgentWithId = {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            documenttype: data.documenttype,
            document: data.document,
            birthdate: birthdateString ? format(new Date(birthdateString), 'yyyy-MM-dd') : undefined,
            leavingdate: leavingdateString ? format(new Date(leavingdateString), 'yyyy-MM-dd') : undefined,
            deceased: data.deceased,
            file: data.file,
            address: data.address,
            phone: data.phone,
            email: data.email
        };
        if (mode === "edit") {
            dispatch(updateAgent({ agentId: data.id, agent: data })).unwrap().then(
                () => {
                    toast.success("Agente actualizado correctamente ");
                }
            ).catch(
                () => {
                    toast.error("Error al actualizar el agente ");
                })
        } else {
            dispatch(addAgent(agentRequest)).unwrap().then(
                () => {
                    toast.success("Agente creado correctamente ");
                }
            ).catch(
                () => {
                    toast.error("Error al crear el agente ");
                });
        }



    }


    return (

        <div>

            <h5 className="p-2 mb-1 text-1xl font-bold text-gray-400 dark:text-white border border-gray-200 bg-[#cddafd] rounded-t-lg">
                {mode === "create" ? "Nuevo Agente" : "Editar Agente"}
            </h5>
            <div className="p-6 space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className="grid grid-cols-6 gap-6 sm:grid-cols-6">
                        <div className='col-span-6 sm:col-span-3'>
                            <Label htmlFor='firstname'>Nombre</Label>
                            <Input {...register('firstname')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />

                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <Label htmlFor='lastnane'>Apellido</Label>
                            <Input {...register('lastname')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />
                        </div>

                        <div className='col-span-6 grid grid-cols-4 gap-6'>


                            <div>
                                <Label htmlFor='documenttype'  >Tipo Doc.</Label>
                                <Select {...register('documenttype')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                                >
                                    {
                                        DocumentType.map((doc, key) => (
                                            <option key={key} value={doc}>
                                                {doc}
                                            </option>
                                        ))
                                    }
                                </Select>
                            </div>


                            <div>
                                <Label htmlFor='document'>Documento</Label>
                                <Input {...register('document')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />

                            </div>
                            <div>
                                <Label htmlFor='birthdate'>Fecha de Nacimiento</Label>
                                <Input type='date' {...register('birthdate')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />


                            </div>
                            <div>
                                <Label htmlFor='phone'>Celular</Label>
                                <Input {...register('phone')} placeholder="0342-456-7890" className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />

                            </div>

                        </div>


                        <div className='col-span-6 sm:col-span-3'>
                            <Label htmlFor='email'>Email</Label>

                            <Input type='email' {...register('email')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />


                        </div>

                        <div className='col-span-6 sm:col-span-3'>
                            <Label htmlFor='address'>Domicilio</Label>
                            <Input {...register('address')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />

                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <Label>Numero de Legajo</Label>


                            <Input {...register('file')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />


                        </div>


                        <div className='col-span-6 sm:col-span-3'>
                            <Label htmlFor='leavingdate'>Fecha Salida</Label>


                            <Input type='date' {...register('leavingdate')} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5' />


                        </div>



                        <div className="sm:col-span-2">

                            <label className="flex items-center space-x-3 cursor-pointer">
                                <div className="relative">
                                    <input type="checkbox" {...register("deceased")} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-700 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:left-6"></div>
                                </div>
                                <span className="text-black">Fallecido?</span>
                            </label>
                        </div>





                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>

        </div>


    )
}

/*
   useEffect(() => {
       const fetchData = async () => {
           try {
               await fetchAgentById(agentId);
           } catch (error) {
               if (error instanceof Error) {
                   console.error("Error fetching agents:", error.message);                                                                                                                                                                                                                                                                                  
               }
           }
       }

       fetchData();
   }, [agentId]); */