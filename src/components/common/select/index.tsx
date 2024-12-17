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
}

export function CustomSelect({
  options,
  label,
  setOptions,
}: CustomSelectProps) {
  return (
    <Select
      onValueChange={(value) => {
        setOptions(value); 
      }}
    >
      <SelectTrigger className="w-full border-gray-600 hover:border-gray-600">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option, index) => (
            <SelectItem
              key={index}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
