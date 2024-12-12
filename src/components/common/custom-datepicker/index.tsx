"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    setSelectedDate: (e:Date | undefined) => void
    label: string
}

export function DatePicker({setSelectedDate,label}:DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>();
  const handleSelectDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedDate(selectedDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-full justify-start text-left font-normal border border-gray-500",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => handleSelectDate(e)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}