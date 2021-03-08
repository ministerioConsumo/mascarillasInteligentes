import React from 'react'
import { useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { useMaskInUse, useMasks} from 'src/hooks/masks'
import { useModal } from '@gluedigital/modal'
import Countdown from 'src/components/Countdown/Countdown'
import NotFound from '../NotFound/NotFound'

import logo from 'src/static/images/logo_mincon_vertical.svg'
import 'src/components/Modals/ActionMaskModal'
import './ResultMask.sass'

const ResultMask = () => {
  const { id: idStr } = useParams()
  const id = parseInt(idStr)
  const mask = useMasks().find(m => m.id === id)
  const history = useHistory()
  const modal = useModal()

  const handleContinue = () => {
    modal.show('action-mask-modal', {action: 'start'})
    history.push('/mask/' + mask.id)
  }

  if (!mask) return <NotFound />

  const imgStyle = { backgroundImage: 'url(/images/masks/' + mask.type + '.png)' }

  return (
    <div id="result-mask" className="page">
      <header>
        <Link to="/">
          <div className="icon icon-angle_left" />
          <span><FormattedMessage id="home" /></span>
        </Link>
        <img src={logo} alt="logo del Ministerio de Consumo" />
      </header>
      <section className="intro">
        <h1>
          <FormattedMessage id="result-mask.title" />
        </h1>
        <h2>{mask.name || <FormattedMessage id={`mask.${mask.type}`} />}</h2>
        <h3><FormattedMessage id="result-mask.added" /></h3>
      </section>
      <section className="mask-intro" >
        <div onClick={handleContinue} className="result-card">
          <div className="mask-image" style={imgStyle} />
          <div className="mask-info">
            <div className="name">
              <strong>{mask.name || <FormattedMessage id={`mask.${mask.type}`} />}</strong>
            </div>
            {mask.name &&
              <div className="type">
                (<FormattedMessage id={`mask.${mask.type}`} />)
              </div>
            }
            <div className="date">
              <span className={`icon icon-${useMaskInUse(mask.id) ? 'play' : 'stop'}`} />
              <Countdown mask={mask} />
            </div>
          </div>
        </div>
      </section>
      <footer className="continue">
        <button onClick={handleContinue}>
          <FormattedMessage id="result-mask.start-use" />
        </button>
      </footer>

    </div>
  )
}

export default ResultMask
