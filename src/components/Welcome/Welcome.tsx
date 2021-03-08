import React from 'react'
import MarkdownMessage from '@gluedigital/markdown-message'
import logo from 'src/static/images/logo_mincon_vertical.svg'
import './Welcome.sass'

const Welcome = () => {

  return (
    <div id="home" className="page">
      <header>
        <h1>
          <MarkdownMessage id="home.title" />
        </h1>
      </header>
      <div className="welcome">
        <div className="welcome-animation">
          <div className="animation" />
          <h2>
            <MarkdownMessage id="welcome.title" />
          </h2>
        </div>
        <footer>
          <img src={logo} alt="logo del Ministerio de Consumo" />
        </footer>
      </div>
    </div>
  )
}

export default Welcome
