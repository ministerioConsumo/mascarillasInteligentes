import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import MarkdownMessage from '@gluedigital/markdown-message'
import { Link } from 'react-router-dom'

import errorImg from 'src/static/images/error.png'
import logo from 'src/static/images/logo_mincon_vertical.svg'
import './ErrorBoundary.sass'

declare const __DEV__: boolean

interface MyProps {
  children: React.ReactNode
}
interface MyState {
  hasError: boolean
  details?: object

}
class ErrorBoundary extends React.Component <MyProps, MyState> {

  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static propTypes = {
    children: PropTypes.node
  }

  static getDerivedStateFromError (error) {
    return {
      hasError: true,
      details: error
    }
  }

  handleReload = () => {
    window.setTimeout(() => window.location.reload(), 0)
  }

  render () {
    if (this.state.hasError) {
      return (
        <div className="error page">
          <header>
            <span />
            <img src={logo} alt="logo del Ministerio de Consumo" />
            <span />
          </header>
          <section className="intro">
            <h1>
              <MarkdownMessage id="home.title" />
            </h1>
            <img src={errorImg} alt="errorimage" />
            {__DEV__ && this.state.details &&
              <div>{this.state.details.toString()}</div>
            }
            <h3><FormattedMessage id="error.title" /></h3>
            <p><FormattedMessage id="error.text" /></p>
          </section>
          <footer>
            <Link to="/" className="button" onClick={this.handleReload}>
              <FormattedMessage id="reload" />
            </Link>
          </footer>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
