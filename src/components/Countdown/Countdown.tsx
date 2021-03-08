import React from 'react'
import useCountdown from './useCountdown'
import { Mask } from 'src/store/types'

interface CountdownProps {
  mask: Mask
}

const Countdown = ({ mask }: CountdownProps) => {

  const remainingTime = useCountdown(mask)
  const roundedTime = Math.ceil(remainingTime / 1000) * 1000
  const remainingTimeStr = new Date(roundedTime).toISOString().substr(11, 8)

  return (
    <span className="countdown">
      <strong className="hours">
        {remainingTimeStr.substr(0, 2)}
      </strong>
      <span className="minsec">
        {remainingTimeStr.substr(2)}
      </span>
    </span>
  )
}

export default Countdown
