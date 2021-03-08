import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import './SelectName.sass'

interface SelectNameProps {
  onChange: Function
}

const SelectName = ({ onChange }: SelectNameProps) => {
  const [name, setName] = useState<string>(null)
  const handleAdd = e => {
    e.preventDefault()
    if(e.target.classList.contains('skip')){
      onChange('')
    } else {
      onChange(name)
    }
  }

  return (
    <section className="select-name">
      <FormattedMessage id="placeholder.write">
        {(txt: string) => <input onChange={e => setName(e.target.value)} name="maskName" type="text" placeholder={txt} />}
      </FormattedMessage>
      <div className="buttons">
        <button onClick={e => handleAdd(e)} type="button" className="skip">
          <FormattedMessage id="skip-name" />
        </button>
        <button onClick={e => handleAdd(e)} type="button" disabled={!name} className="continue">
          <FormattedMessage id="continue" />
        </button>
      </div>
    </section>
  )
}

export default SelectName
