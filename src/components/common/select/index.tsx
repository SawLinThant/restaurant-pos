import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: option[];
  label: string;
  setOptions: (option: string) => void;
  initialValue?: string;
}

export function CustomSelect({
  options,
  label,
  setOptions,
  initialValue,
}: CustomSelectProps) {
  const [value, setValue] = useState<string>("");

  // Set initial value if provided
  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
      setOptions(initialValue);
    }
  }, [initialValue, setOptions]);

  return (
    <Select
      value={value}
      onValueChange={(selectedValue) => {
        setValue(selectedValue);
        setOptions(selectedValue);
      }}
    >
      <SelectTrigger className="w-full border-gray-600 hover:border-gray-600">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
