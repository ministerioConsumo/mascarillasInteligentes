import React, { useState, useEffect } from 'react'
import Welcome from './Welcome'

const WelcomeWrapper = ({ children }) => {
  const [showWelcome, setShowWelcome] = useState(true)
  useEffect(() => {
    setTimeout(() => setShowWelcome(false), 4000)
  }, [])

  return showWelcome ? <Welcome /> : children
}

export default WelcomeWrapper
