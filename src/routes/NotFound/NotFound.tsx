import React from 'react'
import { FormattedMessage } from 'react-intl'
import MarkdownMessage from '@gluedigital/markdown-message'
import { Link } from 'react-router-dom'

import notFound from 'src/static/images/not-found.png'
import logo from 'src/static/images/logo_mincon_vertical.svg'
import './NotFound.sass'

const NotFound = () => {
  return (
    <div id="not-found" className="page">
      <header>
        <span />
        <img src={logo} alt="logo del Ministerio de Consumo" />
        <span />
      </header>
      <section className="intro">
        <h1>
          <MarkdownMessage id="home.title" />
        </h1>
        <img src={notFound} alt="not found image" />
        <h3><FormattedMessage id="not-found.title" /></h3>
        <p><FormattedMessage id="not-found.text" /></p>
      </section>
      <footer>
        <Link to="/" className="button">
          <FormattedMessage id="come-back-home" />
        </Link>
      </footer>

    </div>
  )
}

export default NotFound
