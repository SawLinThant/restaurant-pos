import clsx from "clsx";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type DropdownProps = {
  options: Array<{
    id: number;
    value: string;
    label: string;
  }>;
  defaultLabel: string;
  setOption: (value:string) => void
};

const DropDownMenu = ({ options, defaultLabel, setOption }: DropdownProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [filter, setFilter] = useState<any>(null);
  return (
    <div className="relative w-full">
      <div
        onClick={() => setIsOpenDropdown(!isOpenDropdown)}
        className="w-full"
      >
        <div className="flex w-full flex-row items-center justify-between rounded border border-gray-500 px-4 py-2">
          <div>{filter ? filter : defaultLabel}</div>
          <FaChevronDown size={15} />
        </div>
      </div>
      <div
        className={clsx(
          "absolute z-10 min-h-9 w-full flex-col rounded-b border border-gray-400 bg-white",
          {
            hidden: !isOpenDropdown,
            flex: isOpenDropdown,
          },
        )}
      >
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => {
                setFilter(option.value);
                setOption(option.value);
                setIsOpenDropdown(!isOpenDropdown);
            }}
            className="px-4 py-1 hover:bg-primary hover:text-white hover:cursor-pointer"
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
export default DropDownMenu;
