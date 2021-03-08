import React from 'react'
import { FormattedMessage } from 'react-intl'
import { registerModal, useModal } from '@gluedigital/modal'

import logo from 'src/static/images/logo_mincon_vertical.svg'
import './StartModal.sass'

const StartModal = () => {
  const modal = useModal()
  const handleSkip = () => {
    modal.hide()
    localStorage.setItem('skip.start', '1')
  }
  const closeModal = e => {
    e.preventDefault()
    setTimeout(() => modal.hide(), 0)
  }
  return (
    <div className="start-modal modal-content">
      <header>
        <span />
        <img src={logo} alt="logo del Ministerio de Consumo" />
        <button className="always-skip" onClick={handleSkip}>
          <FormattedMessage id="always-skip" />
        </button>
      </header>
      <section>
        <h1>
          <span><FormattedMessage id="start-modal.text" /></span>
        </h1>
      </section>
      <footer>
        <button onMouseUp={closeModal}>
          <FormattedMessage id="agree" />
        </button>
      </footer>
    </div>
  )
}

registerModal('start-modal', StartModal)
