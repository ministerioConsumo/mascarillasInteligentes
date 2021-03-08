import React from 'react'

import './CircleBar.sass'

interface CircleBarProps {
  percent: number
}

const CircleBar = ({  percent = 100 } : CircleBarProps) => {
  const r = 30.5
  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMinYMax meet"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="bar"
    >
      <circle
        className="circle-bar"
        stroke='#53FFBC'
        strokeWidth="22"
        strokeDasharray={`${r * percent}, ${r * 100}`}
        strokeLinecap="round"
        fill="none"
        cx="50%"
        cy="50%"
        r={r * 16}
      />
    </svg>

  )
}



export default CircleBar
