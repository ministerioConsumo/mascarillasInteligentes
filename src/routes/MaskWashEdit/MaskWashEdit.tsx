import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { useMask, useMaskActions } from 'src/hooks/masks'
import { MaskType } from 'src/store/types'
import { Link } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'

import logo from 'src/static/images/logo_mincon_vertical-2.svg'
import './MaskWashEdit.sass'

const MaskWashEdit = () => {
  const { id: idStr } = useParams()
  const id = parseInt(idStr)
  const mask = useMask(id)
  const actions = useMaskActions()
  const history = useHistory()

  const [count, setCount] = useState<number>(mask.customWashMax)
  const [details, setDetails] = useState<string>(mask.customWashInfo || '')

  if (!mask || (mask.type !== MaskType.REUSABLE_HYGIENIC && mask.type !== MaskType.REUSABLE_TRANSPARENT)) return <NotFound />

  const handleSave = e => {
    e.preventDefault()
    actions.customize(id, { customWashInfo: details, customWashMax: count })
    history.push('/mask/' + id + '/wash')
  }

  return (
    <div id="mask-wash-edit" className="page">
      <header>
        <Link to={'/mask/' + id }>
          <div className="icon icon-angle_left" />
          <span><FormattedMessage id="back" /></span>
        </Link>
      </header>
      <section className="edit-details">
        <img src={logo} alt="logo del Ministerio de Consumo" />
        <div className="intro">
          <h2>
            <FormattedMessage id="mask-wash-edit.title" />
          </h2>
          <p>
            <FormattedMessage id="mask-wash-edit.intro" />
          </p>
        </div>
        <form className="data-form" onSubmit={handleSave}>
          <label>
            <p>
              <FormattedMessage id="mask-wash-edit.count" />
            </p>
            <FormattedMessage id="placeholder.write">
              {
                (text: string) =>
                  <input
                    type="number"
                    value={count || ''}
                    onChange={e => setCount(e.target.value ? parseInt(e.target.value) : null)}
                    placeholder={text}
                    required
                    className="wash-number"
                    name="numberInput"
                  />
              }
            </FormattedMessage>
          </label>
          <label>
            <p>
              <FormattedMessage id="mask-wash-edit.details" />
            </p>
            <FormattedMessage id="placeholder.write">
              {
                (text: string) =>
                  <input
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    placeholder={text}
                    required
                    className="wash-method"
                    name="methodInput"
                  />
              }
            </FormattedMessage>
          </label>
          <button disabled={!(count && details)}>
            <FormattedMessage id="mask-wash-edit.save" />
          </button>
        </form>
      </section>
    </div>
  )
}

export default MaskWashEdit
