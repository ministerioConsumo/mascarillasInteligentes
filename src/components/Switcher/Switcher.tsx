import React from 'react'
import { FormattedMessage } from 'react-intl'

import './Switcher.sass'

interface SwitcherProps {
  value: boolean,
  onChange: (newValue: boolean) => void
}

const Switcher = ({ value, onChange }: SwitcherProps) => {
  const enabledClass = value ? 'on' : 'off'

  return (
    <div onClick={ () => onChange(!value)} className={`switcher ${enabledClass}`}>
      <div className="switch"><FormattedMessage id={enabledClass} /></div>
    </div>
  )
}

export default Switcher
