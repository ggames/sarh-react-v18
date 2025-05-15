import { FaChevronDown } from 'react-icons/fa'
import { DocumentType } from '../../constants/DocumentType';

import { useAgentAction } from '../../features/agent/useAgentAction';

//import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
// import { useAppSelector } from '../../hooks/store';
// import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/store';
import { useEffect, useState } from 'react';
import { RootState } from '../../features';
import { AgentWithId } from '../../models/agent';
//import { set } from 'date-fns';


export default function AgentEdit() {

    const { agent } = useAppSelector((state: RootState) => state.agents);

    const [agentLocal, setAgentLocal] = useState<AgentWithId>();


    const { id } = useParams();

    const agentId = parseInt(id || '0', 10);

    const { updateAgent, fetchAgentById } = useAgentAction();

    
    /* useEffect(() => {
        if(agentId){
            setAgent(agents.find((agent: AgentWithId) => Number(agent.id) === agentId) || {
                firstname: '',
                lastname: '',
                documenttype: DocumentType[0],
                document: '',
                birthdate: '',
                leavingdate: '',
                isdeceased: false,
                file: '',
                address: '',
                phone: '',
                email: ''
            });
        }
    }, [agentId]);   */

    useEffect(()=>{
        setAgentLocal(agent)
    },[agent])

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
    }, []);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
       
        console.log('DATOSS DATOS ', { ...agentLocal})

        setAgentLocal((prevAgentLocal) => ({
            ...prevAgentLocal,
            [name]: value || ''
        }) as AgentWithId);
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        // const form = event.target as HTMLFormElement;
        //const formData = new FormData(form);
        /* const firstname = formData.get('firstname') as string;
         const lastname = formData.get('lastname') as string;
         const documenttype = formData.get('documenttype') as (typeof DocumentType)[number];
         const document = formData.get('document') as string;
         const birthdateString = formData.get('birthdate')?.toString() as string;
         const birthdate = new Date(birthdateString).toISOString();
         const leavingdateString = formData.get('leavingdate')?.toString() as string;
         const leavingdate = leavingdateString ? format(new Date(leavingdateString), 'yyyy-MM-dd') : undefined;
         const isdeceasedString = formData.get('isdeceased') as string;
         const isdeceased = isdeceasedString === 'on' ? true : false;
         const file = formData.get('file') as string;
         const address = formData.get('address') as string;
         const phone = formData.get('phone') as string;
         const email = formData.get('email') as string;
        */
        //console.log(birthdate);

        updateAgent(agentId, { ...agentLocal,  id: String(agentId) } as AgentWithId);
        //console.log(agentLocal);

    }


    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Actualización Agentes - Docentes</h2>
            </div>
            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="firstname" className="block text-sm/6 font-semibold text-gray-900">
                            Nombre
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="firstname"
                                name="firstname"
                                type="text"
                                onChange={handleChange}
                                value={agentLocal?.firstname}
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="lastname" className="block text-sm/6 font-semibold text-gray-900">
                            Apellido
                        </label>
                        <div className="mt-2.5">
                            <input

                                name="lastname"
                                onChange={handleChange}
                                value={agentLocal?.lastname}
                                type="text"
                                autoFocus
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="documenttype" className="block text-sm/6 font-semibold text-gray-900">
                            Documento
                        </label>
                        <div className="mt-2.5">
                            <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                    <select
                                        id="documenttype"
                                        name="documenttype"
                                        onChange={handleChange}
                                        defaultValue={agentLocal?.documenttype}
                                        value={agentLocal?.documenttype}
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >

                                        {
                                            DocumentType.map((doc, key) => (
                                                <option key={key} value={doc}>
                                                    {doc}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <FaChevronDown
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                </div>
                                <input
                                    id="document"
                                    name="document"
                                    onChange={handleChange}
                                    value={agentLocal?.document}
                                    type="text"
                                    placeholder="123-456-7890"
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="birthdate" className="block text-sm/6 font-semibold text-gray-900">
                            Fecha Nacimiento
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="birthdate"
                                name="birthdate"
                                type="date"
                                onChange={handleChange}
                                value={agentLocal?.birthdate}
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="leavingdate" className="block text-sm/6 font-semibold text-gray-900">
                            Fecha Salida
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="leavingdate"
                                name="leavingdate"
                                onChange={handleChange}
                                value={agentLocal?.leavingdate}
                                type="date"
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm/6 font-semibold text-gray-900">
                            Domicilio
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="address"
                                name="address"
                                onChange={handleChange}
                                value={agentLocal?.address}
                                type="text"
                                autoComplete="address"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                            Email
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={handleChange}
                                value={agentLocal?.email}
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm/6 font-semibold text-gray-900">
                            Celular
                        </label>
                        <div className="mt-2.5">
                            <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">

                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    onChange={handleChange}
                                    value={agentLocal?.phone}
                                    placeholder="0342-456-7890"
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">

                        <div className="flex items-center">
                            <input type="checkbox" name='isdeceased' 
                            onChange={handleChange}
                            checked={agentLocal?.isdeceased} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="isdeceased" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">¿Fallecido?</label>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="file" className="block text-sm/6 font-semibold text-gray-900">
                            Numero de legajo
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="file"
                                name="file"
                                value={agentLocal?.file}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                type='text'
                            />
                        </div>
                    </div>

                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Guardar
                    </button>
                </div>
            </form>
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