import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useMaskActions } from 'src/hooks/masks'
import { MaskType } from 'src/store/types'
import SelectType from './SelectType'
import SelectName from './SelectName'

import logo from 'src/static/images/logo_mincon_vertical.svg'
import './AddMask.sass'

const AddMask = () => {
  const [maskType, setMaskType] = useState<MaskType>(null)
  const history = useHistory()
  const actions = useMaskActions()

  const handleAdd = (name?: string) => {
    const mask = actions.add({
      type: maskType,
      name: name || ''
    })
    history.push('/result-mask/' + mask.id)
  }

  return (
    <div id="add-mask" className="page">
      <header>
        <Link to="/">
          <div className="icon icon-angle_left" />
          <span><FormattedMessage id="home" /></span>
        </Link>
        <img src={logo} alt="logo del Ministerio de Consumo" />
      </header>
      <section className="intro">
        <h1>
          <FormattedMessage id="add-mask.title" />
        </h1>
        <h2><FormattedMessage id={`add-mask.${maskType ? 'name' : 'type'}`} /></h2>
      </section>
      {maskType ? <SelectName onChange={handleAdd} /> : <SelectType onChange={setMaskType} />}
      {!maskType &&
        <footer>
          <span className="icon icon-slide" />
          <span><FormattedMessage id="add-mask.slide" /></span>
        </footer>
      }
    </div>
  )
}

export default AddMask
