import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";

interface TableProps {
    column: any,
    tableData: any
}

const CustomTable  = ({column,tableData}:TableProps) => {
    
    const table = useReactTable({
        columns: column? column : [],
        getCoreRowModel: getCoreRowModel(),
        data: tableData
    })
<<<<<<< HEAD
=======
    console.log(tableData)
>>>>>>> feature/dashboard
    return(
        <div className="w-full flex flex-col">
            <table className="w-full border">
                <thead className="w-full h-12 bg-secondary text-white">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} scope="col" className="w-12">
                                    {header.placeholderId ? null : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel()?.rows?.map((row,index) => (
                        <tr className={clsx("",{
                            "bg-gray-100": (index % 2) !== 0
                        })} key={index}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="text-center py-4">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default CustomTable;