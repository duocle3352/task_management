import { useState } from 'react'
import { addDays } from 'date-fns'

function useCalendar() {
  const today: Date = new Date()
  const defaultSelected: Date = addDays(today, 4)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultSelected)

  return { selectedDate, setSelectedDate }
}

export default useCalendar
