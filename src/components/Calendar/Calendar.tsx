import classNames from 'classnames/bind'
import { useState } from 'react'
import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  offset,
  type Placement,
  flip
} from '@floating-ui/react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import 'react-day-picker/dist/style.css'

import { CalendarDaysIcon } from '../Icons'
import styles from './Calendar.module.scss'

const cx = classNames.bind(styles)

interface Props {
  selectedDate: Date | undefined
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  placement?: Placement
}

function Calendar({ selectedDate, placement = 'bottom', setSelectedDate }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: placement,
    middleware: [offset(4), flip({ fallbackPlacements: ['right', 'left', 'bottom'] })]
  })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  const handleDayClick = () => setIsOpen(false)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('top-content')} ref={refs.setReference} {...getReferenceProps()}>
        <span className={cx('inner')}>{selectedDate && format(selectedDate, 'dd/MM/yyyy')}</span>
        <CalendarDaysIcon className={cx('icon')} />
      </div>
      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className={cx('bottom-content')}>
          <DayPicker
            mode='single'
            showOutsideDays
            fixedWeeks
            required
            onDayClick={handleDayClick}
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>
      )}
    </div>
  )
}

export default Calendar
