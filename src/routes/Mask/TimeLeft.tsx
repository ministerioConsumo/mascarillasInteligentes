import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useMaskActions } from 'src/hooks/masks'
import { Mask } from 'src/store/types'
import Countdown from 'src/components/Countdown/Countdown'
import useCountdown from 'src/components/Countdown/useCountdown'
import CircleBar from './CircleBar/CircleBar'

import './TimeLeft.sass'

interface TimeLeftProps {
  mask: Mask
}

const TimeLeft = ({ mask } : TimeLeftProps) => {

  const actions = useMaskActions()

  const remainingTime = useCountdown(mask)

  const percentage = remainingTime * 100 / mask.maxUsageTime
  const degree = percentage * 3.6
  const styles = {
    transform: `rotate(${degree}deg)`
  }
  const isExpired = remainingTime === 0

  const handleTimeLeft = e => {
    e.preventDefault()
    const value = e.target.value
    const remainingMs = Date.UTC(1970, 0, 1, ...value.split(':'))
    actions.setTime(mask.id, remainingMs)
  }

  const max = new Date(mask.maxUsageTime).toISOString().substr(11, 8)

  return (
    <form id="time-left" className={isExpired ? 'exceeded' : ''}>
      <label>
        <div style={styles} className="ball" />
        <CircleBar percent={percentage} />
        <div className="data">
          <h2><FormattedMessage id="time-left" /></h2>
          <h1>
            <Countdown mask={mask} />
          </h1>
          <div className="edit">
            <span><FormattedMessage id="edit" /></span>
          </div>
          <input
            onChange={handleTimeLeft}
            type="time"
            name="apptTime"
            min="00:00:00"
            max={max}
            step="2"
            defaultValue={max}
            />
        </div>
      </label>
    </form>
  )
}

export default TimeLeft
