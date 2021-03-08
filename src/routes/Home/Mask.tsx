import React from 'react'
import { useHistory } from 'react-router-dom'
import { FormattedDate, FormattedTime, FormattedMessage } from 'react-intl'
import { useModal } from '@gluedigital/modal'
import { useSlideState } from '@gluedigital/react-carousel'
import { useMaskInUse, useMaskIsUsed } from 'src/hooks/masks'
import { Mask as MaskType } from 'src/store/types'
import Countdown from 'src/components/Countdown/Countdown'

import 'src/components/Modals/ActionMaskModal'

import './Mask.sass'
interface MaskProps {
  mask: MaskType
}

const Mask = ({ mask }: MaskProps) => {
  const history = useHistory()
  const modal = useModal()
  const slideState = useSlideState()

  const handleClick = () => history.push('/mask/' + mask.id)

  const handleRemove = e => {
    e.stopPropagation()
    modal.show('action-mask-modal', {action: 'remove'})
    history.push('/remove-mask/' + mask.id)
  }

  const minOpacity = 0.1
  const opacity = minOpacity + (1 - minOpacity) * slideState.activePercent

  const minScale = 0.2
  const scale = minScale + (1 - minScale) * slideState.activePercent
  const imgStyle = {
    backgroundImage: `url(/images/masks/${mask.type}.png)`,
    transform: `scale(${scale})`,
    opacity: opacity
  }

  let icon = 'stop'
  if (useMaskIsUsed(mask.id)) {
    if(useMaskInUse(mask.id)) {
      icon = 'play'
    } else {
      icon = 'pause'
    }
  }

  return (
    <article onClick={handleClick} className={`mask-card ${slideState.active ? 'active' : ''}`}>
      <section className="mask-image" style={imgStyle} />
      <section className="mask-info" style={{ opacity }}>
        <div className="name">
          <strong>{mask.name || <FormattedMessage id={`mask.${mask.type}`} />}</strong>
        </div>
        {mask.name &&
          <div className="type">
            (<FormattedMessage id={`mask.${mask.type}`} />)
          </div>
        }
        <div className="date">
          <span className={`icon icon-${icon}`} />
          <Countdown mask={mask} />
        </div>
        <div className="last-used">
          <strong>
            {
              !useMaskIsUsed(mask.id) ? <FormattedMessage id="mask.is-not-used" /> :
              <>
                <FormattedMessage id="mask.last-date" />
                {
                  !!useMaskInUse(mask.id) ? <FormattedMessage id="mask.last-date.now" /> :
                    <span className="last-date">
                      <span><FormattedDate value={mask.lastUsage} day="2-digit" month="2-digit" year="2-digit" /></span>
                      {' '}
                      <span><FormattedTime value={mask.lastUsage} hour="2-digit" minute="2-digit" /></span>
                    </span>
                }
              </>
            }
          </strong>
        </div>
        <button disabled={!slideState.active} className="remove" onClick={handleRemove}>
          <span className="icon icon-bin" />
          <span><FormattedMessage id="remove" /></span>
        </button>
      </section>
    </article>
  )
}

export default Mask
