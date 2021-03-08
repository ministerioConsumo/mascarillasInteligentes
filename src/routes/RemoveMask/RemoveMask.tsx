import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Mask } from 'src/store/types'
import { useMaskActions, useMasks } from 'src/hooks/masks'

import NotFound from '../NotFound/NotFound'

import './RemoveMask.sass'

const RemoveMask = () => {
  const { id: idStr } = useParams()
  const id = parseInt(idStr)
  const [saved, setSaved] = useState<Mask>()
  const searched = useMasks().find(m => m.id === id)
  const mask = searched || saved
  const history = useHistory()
  const actions = useMaskActions()

  if (!mask) return <NotFound />

  const handleRemove = () => {
    setSaved(mask)
    actions.remove(id)
    history.push('/')
  }

  return (
    <div id="remove-mask" className="page">
      <div className="wrapper">
        <section className="intro">
          <h1>
            <FormattedMessage id="result-mask.title" />
          </h1>
          <h2>
            <span className="name">{mask.name || mask.type}</span>
            <span className="type">
              (<FormattedMessage id={'mask.' + mask.type} />)
            </span>
            <span className="text">
              <FormattedMessage id="remove-mask.text" />
            </span>
          </h2>
          <div className="warning">
            <h3>
              <strong>
                <FormattedMessage id="remove-mask.warning.title" />
              </strong>
            </h3>
            <p>
              <FormattedMessage id="remove-mask.warning.text" />
            </p>
          </div>
        </section>
      </div>
      <footer className="apply">
        <Link className="button" to="/">
          <FormattedMessage id="cancel" />
        </Link>
        <button onClick={handleRemove}>
          <FormattedMessage id="accept" />
        </button>
      </footer>
    </div>
  )
}

export default RemoveMask
