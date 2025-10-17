"use client"

import { addDays, formatISO, parseISO } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatDate } from "@/lib/utils"

import { Input } from "../ui/input"

type PropsType = {
  defaultValue?: string
  name: string
}

function DatePicker({ defaultValue, name }: PropsType) {
  const [date, setDate] = useState(() => {
    const currentDate = new Date()

    const nextDay = addDays(currentDate, 1)

    return defaultValue ? parseISO(defaultValue) : nextDay
  })

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full justify-start text-left" variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDate(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            disabled={(date) => date < new Date()}
            mode="single"
            onSelect={(day) => day && setDate(day)}
            selected={date}
          />
        </PopoverContent>
      </Popover>
      <Input name={name} type="hidden" value={formatISO(date)} />
    </>
  )
}

export default DatePicker
