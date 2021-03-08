import React from 'react'
import { FormattedMessage } from 'react-intl'
import { registerModal, CloseModal } from '@gluedigital/modal'

import logo from 'src/static/images/logo_mincon_vertical.svg'
import './ActionMaskModal.sass'

interface ActionMaskModalProps {
  action: 'string'
}

const ActionMaskModal = ({ action }: ActionMaskModalProps) => {
  const steps = [
    'wash',
    'touch',
    'start',
    'pause',
    'remove'
  ]
  return (
    <div className="action-mask-modal modal-content">
      <header>
        <span />
        <img src={logo} alt="logo del Ministerio de Consumo" />
        <span />
      </header>
      <section className="intro">
        <h1>
          <FormattedMessage id={`action-mask-modal.title.${action}`} />
        </h1>
      </section>
      <section className="steps">
        {steps.map(step => {
          if (step === action || step === 'wash' || step === 'touch') {
            return (
              <div key={step} className={`step ${step}`}>
                <div className={`icon icon-step-${step}`} />
                <p><FormattedMessage id={`action-mask-modal.step.${step}`} /></p>
              </div>
            )
          }
        })}
      </section>
      <footer>
        <CloseModal tagName="button">
          <FormattedMessage id="agree" />
        </CloseModal>
      </footer>
    </div>
  )
}

registerModal('action-mask-modal', ActionMaskModal)
