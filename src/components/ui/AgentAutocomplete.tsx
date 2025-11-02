import axiosWithAuth from "../../api/api.axios";
import { AgentWithId } from "../../models/agent";
import Autocomplete from "../Autocomplete";

interface AgentAutocompleteProps {

     onSelect: (agent: AgentWithId) => void;
}

export default function AgentAutocomplete({ onSelect }: AgentAutocompleteProps) {
     async function fetchAgents(query: string, signal?: AbortSignal): Promise<AgentWithId[]> {
          if (!query || query.trim().length === 0) return [];

          const res = await axiosWithAuth.get(`agent/search/${encodeURIComponent(query)}`, { signal })
          return res.data;
     }

     return (
               <Autocomplete<AgentWithId>
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                    placeholder="Buscar agente"
                    fetchItems={fetchAgents}
                    onSelect={onSelect}
                    renderItem={(a) => (
                         <div>
                              <div className="font-medium">
                                   {a.lastname} {a.firstname}
                              </div>
                              <div className="text-sm text-gray-500"> ID: {a.id}</div>
                         </div>
                    )}
                    itemToString={(a) => (a ? `${a.lastname} ${a.firstname}` : '')}
                    debounceMs={300}
                    minChars={2}
               />
          

     )
}