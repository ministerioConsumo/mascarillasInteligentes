import React from 'react'
import { FormattedMessage } from 'react-intl'

import './Loading.sass'

const Loading = () => {
  return (
    <div id="loading">
      <div className="dots">
        <div className="dot dot-1" />
        <div className="dot dot-2" />
        <div className="dot dot-3" />
      </div>
      <FormattedMessage id="loading" />
    </div>
  )
}

export default Loading
