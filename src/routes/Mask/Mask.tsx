import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { FormattedDate, FormattedTime, FormattedMessage } from 'react-intl'
import { useMaskActions, useMask } from 'src/hooks/masks'
import { useModal } from '@gluedigital/modal'
import { Mask, MaskType } from 'src/store/types'
import useCountdown from 'src/components/Countdown/useCountdown'
import NotFound from '../NotFound/NotFound'
import Switcher from 'src/components/Switcher/Switcher'
import WashCard from './WashCard'
import TimeLeft from './TimeLeft'

import './Mask.sass'
import 'src/components/Modals/ActionMaskModal'

const redLine = 5 * 60 * 1000 // Remaining time when the screen turns red

const Mask = () => {
  const history = useHistory()
  const { id: idStr } = useParams()
  const id = parseInt(idStr)
  const mask = useMask(id)// To keep showing it during removal
  const actions = useMaskActions()
  const remainingTime = useCountdown(mask)
  const modal = useModal()

  if (!mask) return <NotFound />

  const handleRemove = e => {
    e.stopPropagation()
    modal.show('action-mask-modal', {action: 'remove'})
    history.push('/remove-mask/' + mask.id)
  }

  const isCount = !!mask.currentUsageStart
  const canWash = mask.type === MaskType.REUSABLE_HYGIENIC || mask.type === MaskType.REUSABLE_TRANSPARENT

  const handleUsageStart = () => {
    if (isCount) {
      modal.show('action-mask-modal', {action: 'pause'})
      actions.unuse(id)
    } else {
      actions.use(id)
    }
  }

  const imgStyle = { backgroundImage: 'url(/images/masks/' + mask.type + '.png)' }

  const isOverdue = remainingTime < redLine
  const isExpired = remainingTime === 0

  return (
    <div id="mask" className={`${isOverdue ? 'time-exceeded' : ''} page`}>
      <header>
        <Link to="/">
          <div className="icon icon-angle_left" />
          <span><FormattedMessage id="home" /></span>
        </Link>
        <button className="remove" onClick={handleRemove}>
          <span className="icon icon-bin" />
          <span><FormattedMessage id="remove" /></span>
        </button>
      </header>
      <div className={`${canWash ? 'reusable' : ''} mask-wrapper`}>
        <section className="mask-intro" >
          <div className="mask-image" style={imgStyle} />
          <div className="name">
              <strong>{mask.name || <FormattedMessage id={`mask.${mask.type}`} />}</strong>
          </div>
          {mask.name &&
            <p className="type">
              (<FormattedMessage id={`mask.${mask.type}`} />)
            </p>
          }
          <p className="added-date">
            <span className="text">
              <FormattedMessage id="mask.added-date" />
            </span>
            <span className="date">
              <span><FormattedDate value={mask.addedDate} day="2-digit" month="2-digit" year="numeric" /></span>
              {' '}
              <span><FormattedTime value={mask.addedDate} hour="2-digit" minute="2-digit" /></span>
            </span>
          </p>
        </section>
        <section className="mask-content">
          <TimeLeft mask={mask} />
        </section>
        <section className="mask-buttons">
          {!isExpired &&
            <Switcher value={isCount} onChange={handleUsageStart} />
          }
          {isExpired &&
            <h4>
              <FormattedMessage id="mask.time-expired" />
            </h4>
          }
          {isExpired && canWash &&
            <button onClick={() => actions.wash(id)}>
              <FormattedMessage id="mask.wash" />
            </button>
          }
          {isExpired &&
            <button onClick={handleRemove}>
              <FormattedMessage id="mask.replace" />
            </button>
          }
        </section>
      </div>
      {canWash &&
        <WashCard isOverdue={isOverdue} mask={mask} />
      }
    </div>
  )
}

export default Mask
