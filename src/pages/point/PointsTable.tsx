import { useEffect, useState } from "react";
import { RootState } from "../../features";
import { useAppDispatch, useAppSelector } from "../../hooks/store"
import { fetchPoints, updatePoint } from "../../features/point/pointThunk";
import { Spinner } from "../../components/ui/Spinner";
import { LuFilePen } from "react-icons/lu";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";


export const PointsTable = () => {

    interface RowData {
        id: number;
        amountPoint: number;
    }

    const dispatch = useAppDispatch();

    const { points, loading } = useAppSelector((state: RootState) => state.points);
    const [editingCell, setEditingCell] = useState<{ id: number; field: keyof RowData } | null>(null);
    const [editedvalue, setEditedValue] = useState<string>("");
  //  const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        dispatch(fetchPoints());
    }, [dispatch]);

    const handleDoubleClick = (id: number, field: keyof RowData, currentValue: string) => {
        setEditingCell({ id, field });
        setEditedValue(currentValue);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedValue(e.target.value);
        
    };

    const handleSave = async (id: number) => {
        if(!editedvalue.trim()) return;

          await dispatch(updatePoint({ point_id: id, 
                               amount_point:{ amountPositionNew: Number(editedvalue)} 
                            }));

                dispatch(fetchPoints());            
                setEditingCell(null);
      
    }

    return (
        <div className="mt-4 ">
            <h5 className="p-2 mb-1 text-1xl font-bold  text-gray-400 dark:text-white border border-gray-200 bg-[#cddafd] rounded-t-lg">Tipos de Cargos</h5>
            <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow">
                <thead className="bg-gray-100">
                    <tr>

                        <th className="p-3 font-medium text-center">
                            ID Punto
                        </th>
                        <th className="p-3 font-medium text-center">
                            Nombre Cargo
                        </th>
                        <th className="p-3 font-medium text-center">
                            Cod. Cargo
                        </th>
                        <th className="p-3 font-medium text-center">
                            Cant. Puntos
                        </th>
                        <th className="p-3 font-medium text-center">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {loading ?
                        (
                            <tr>
                                <td colSpan={6} className="items-center">
                                    <div className="flex justify-center items-center py-4"><Spinner></Spinner></div></td>
                            </tr>
                        )
                        : Array.isArray(points) && points.length > 0 ? (points.map(
                            point => {

                                return (

                                    <tr key={point.id}>

                                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{point.id}</td>
                                        <td className='px-6 py-4 font-medium text-gray-900 dark:text-white break-words max-w-xs'>{point.namePosition}</td>
                                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{point.positionCode}</td>
                                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white' 
                                             onDoubleClick={() => handleDoubleClick(point.id,"amountPoint", point.amountPoint.toString() )} >
                                           {editingCell?.id === point.id && editingCell?.field === "amountPoint" ?(
                                           <Input type="number" value={editedvalue} onChange={handleChange} 
                                                    onBlur={() => handleSave(point.id) } autoFocus
                                            
                                           />) : (
                                            point.amountPoint
                                           )}

                                        </td>
                                        <td className="p-6 py-4 font-medium text-gray-900 
                    dark:text-white break-words max-w-xs">
                                            <div className="flex ">
                                                <Button onClick={() => handleSave(point.id)}
                                                      disabled={editingCell?.id !== point.id || !editedvalue.trim()}
                                                    >
                                                    <LuFilePen />
                                                </Button>
                                            
                                            </div>

                                        </td>
                                    </tr>
                                )
                            }
                        )) : (
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