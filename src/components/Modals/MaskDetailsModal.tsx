import React from 'react'
import { FormattedMessage } from 'react-intl'
import { registerModal, CloseModal } from '@gluedigital/modal'
import data from 'src/data'
import NotFound from 'src/routes/NotFound/NotFound'
import Accordion from '../Accordion/Accordion'

import logo from 'src/static/images/logo_mincon_vertical-2.svg'
import './MaskDetailsModal.sass'

const MaskDetailsModal = ({ maskType }) => {
  const { maskDetails } = data
  const maskData = maskDetails.find(m => m.model === maskType)

  if (!maskData) return <NotFound />

  return (
    <div className="mask-details-modal modal-content">
      <header>
        <span />
        <img src={logo} alt="logo del Ministerio de Consumo" />
        <span />
      </header>
      <section className="intro">
        <h1>
          <span className="icon icon-caution" />
          <span><FormattedMessage id="mask-details-modal.caution" /></span>
        </h1>
        {/* <h3><FormattedMessage id="mask-details-modal.title" /></h3> */}
        <h3><FormattedMessage id="mask-details-modal.text" /></h3>
      </section>
      <section className="mask-details">
        <ul className="details">
          {
            maskData.model &&
              <li className="model">
                <strong><FormattedMessage id="mask-details-modal.model" /></strong>
                <span><FormattedMessage id={`mask.${maskData.model}`} /></span>
              </li>
          }
          {
            maskData.indicator &&
              <li className="indicator">
                <strong><FormattedMessage id={`mask-details-modal.indicator.${maskData.indicator}`} /></strong>
              </li>
          }
          {
            maskData.normative &&
              <li className="normative">
                <strong><FormattedMessage id="mask-details-modal.normative" /></strong>
                <span>{maskData.normative}</span>
              </li>
          }
          {
            maskData.other_normatives && maskData.other_normatives.length !== 0 &&
              <li className="other-normatives">
                <strong><FormattedMessage id="mask-details-modal.other-normatives" /></strong>
                <ul>
                  {
                    maskData.other_normatives &&
                      maskData.other_normatives.map(nor =>
                        <li key={nor}>
                          <span>{nor}</span>
                        </li>
                      )
                  }
                </ul>
              </li>
          }
          {
            maskData.CE_marking &&
              <li className="marking">
                <strong><FormattedMessage id="mask-details-modal.CE_marking"/></strong>
              </li>
          }
          {
            maskType.startsWith('reusable-') &&
              <>
                <li className="wash-number">
                  <strong><FormattedMessage id="mask-details-modal.wash-number"/></strong>
                </li>
                <li className="wash-method">
                  <strong><FormattedMessage id="mask-details-modal.wash-method"/></strong>
                </li>
              </>

          }
          {
            maskData.EFB &&
              <li className="normative">
                <strong>
                  <FormattedMessage
                    id={'mask-details-modal.EFB' + (maskType.endsWith('transparent') ? '-transparent' : '')}
                  />
                </strong>
                <span>{maskData.EFB}</span>
              </li>
          }
          {
            maskData.breathability &&
              <li className="normative">
                <strong><FormattedMessage id="mask-details-modal.breathability" /></strong>
                <span>{maskData.breathability}</span>
              </li>
          }
          {
            maskData.type &&
              <Accordion
                header ={
                  <li className="type">
                    <strong><FormattedMessage id="mask-details-modal.type"/></strong>
                    <span>{maskData.type}</span>
                  </li>
                }
              >
                <p><FormattedMessage id="mask-details-modal.type.more"/></p>
              </Accordion>

          }
        </ul>
        {
          !maskType.startsWith('reusable-') &&
            <div className="no-reusable">
              <strong><FormattedMessage id="mask-details-modal.no-reusable" /></strong>
            </div>
          }
      </section>
      <footer>
        <CloseModal tagName="button">
          <FormattedMessage id="agree" />
        </CloseModal>
      </footer>
    </div>
  )
}

registerModal('mask-details-modal', MaskDetailsModal)
