import { DialogTrigger } from "@radix-ui/react-dialog";
import AddMenuIcon from "../icons/addMenuicon";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";

export interface TableProps {
  id: string;
  isSelected: boolean;
}

export interface SelectTableProps {
  setSelectedTable: Dispatch<SetStateAction<TableProps | null>>;
  tableList: TableProps[];
}

function SelectTable({ setSelectedTable, tableList }: SelectTableProps) {
  const [selectedTable, setSelectedCheckBox] =
    useState<TableProps[]>(tableList);
  const onSelectTable = (tableId: string) => {
    setSelectedTable(() => {
      return {
        id: tableId,
        isSelected: true,
      };
    });
    setSelectedCheckBox((prev) => {
      return prev.map((currentTable) => {
        if (currentTable.id === tableId) {
          return { ...currentTable, isSelected: true };
        }
        return currentTable;
      });
    });
  };
  return (
    <>
      <Dialog>
        <DialogTrigger className="p-0 border-0 flex items-center justify-center bg-transparent">
          <AddMenuIcon />
        </DialogTrigger>
        <DialogContent className=" flex flex-col w-full sm:w-[50vw] items-start justify-center">
          <div className="flex justify-center ">
            <span className=" font-bold flex-shrink-0">Choose Table</span>
          </div>
          <div className="flex w-full flex-col items-center gap-y-2">
            <div className="flex flex-col items-center gap-y-2">
              {selectedTable.map((table) => {
                return (
                  <div className="flex gap-x-[15px] w-[140px] justify-start" key={table.id+Date.now().toString()}>
                    <input
                      type="checkbox"
                      placeholder={`Table ${table.id}`}
                      value={table.id}
                      onChange={() => onSelectTable(table.id)}
                    />
                    <span className="text-[18px]">Table {table.id}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex w-[140px] justify-center">
              {" "}
              <DialogClose className="p-0 border-0">
                <button className="bg-[#009258] w-full  rounded-[10px] px-[44px] py-[10px] text-white font-[500]">
                  Done
                </button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SelectTable;
