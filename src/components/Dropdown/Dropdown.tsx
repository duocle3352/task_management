import classNames from 'classnames/bind'
import { useState } from 'react'
import { useClick, useDismiss, useFloating, useInteractions, useRole, offset, type Placement } from '@floating-ui/react'
import { ChevronDownIcon } from '../Icons'
import styles from './Dropdown.module.scss'

const cx = classNames.bind(styles)

interface Props {
  options: string[]
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
  placement?: Placement
}

function Dropdown({ options, selected, placement = 'bottom-start', setSelected }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: placement,
    middleware: [offset(4)]
  })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  const handleChangePriority = (value: string) => {
    setSelected(value)
    setIsOpen(false)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('top-content')} ref={refs.setReference} {...getReferenceProps()}>
        <span className={cx('inner')}>{selected}</span>
        <ChevronDownIcon className={cx('icon')} />
      </div>

      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className={cx('bottom-content')}>
          {options.map((item, index) => {
            return (
              <div key={index} className={cx('option')} onClick={() => handleChangePriority(item)}>
                {item}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown
