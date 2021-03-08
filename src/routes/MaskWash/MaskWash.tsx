import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import MarkdownMessage from '@gluedigital/markdown-message'
import { useMask } from 'src/hooks/masks'
import { MaskType } from 'src/store/types'
import NotFound from '../NotFound/NotFound'

import logo from 'src/static/images/logo_mincon_vertical-2.svg'
import soap from 'src/static/images/soap.svg'
import cicle from 'src/static/images/cicle.svg'
import cicleSimple from 'src/static/images/cicle-simple.svg'
import infoEdit from 'src/static/images/info-edit.svg'
import infoAdd from 'src/static/images/info-add.svg'
import './MaskWash.sass'

const MaskWash = () => {
  const { id: idStr } = useParams()
  const id = parseInt(idStr)
  const mask = useMask(id)

  if (!mask || (mask.type !== MaskType.REUSABLE_HYGIENIC && mask.type !== MaskType.REUSABLE_TRANSPARENT)) return <NotFound />

  const showCustom = !!mask.customWashInfo

  return (
    <div id="mask-wash" className="page">
      <header>
        <Link to={'/mask/' + id }>
          <div className="icon icon-angle_left" />
          <span><FormattedMessage id="back" /></span>
        </Link>
      </header>
      {!showCustom &&
        <section className="wash-info default">
          <img src={logo} alt="logo del Ministerio de Consumo" />
          <div className="intro">
            <h2>
              <FormattedMessage id="mask-wash.title" />
            </h2>
            <p>
              <FormattedMessage id="mask-wash.def.intro" />
            </p>
          </div>
          <div className="columns">
            <div className="left">
              <img src={soap} alt="icono jabón" />
              <p>
                <FormattedMessage id="mask-wash.def.wash1" />
              </p>
            </div>
            <div className="right">
              <img src={cicle} alt="icono lavado" />
              <p>
                <FormattedMessage id="mask-wash.def.wash2" />
              </p>
            </div>
          </div>
          <div className="details">
            <p>
              <FormattedMessage id="mask-wash.def.details" />
            </p>
          </div>
        </section>
      }
      {showCustom &&
        <section className="wash-info custom">
          <img src={logo} alt="logo del Ministerio de Consumo" />
          <h2 className="title">
            <FormattedMessage id="mask-wash.title" />
          </h2>
          <div className="wash-count">
            <div className="count">
              <p>
                <FormattedMessage id="mask-wash.custom.title" />
              </p>
              <p>
                <MarkdownMessage id="mask-wash.custom.count" values={{ n: mask.customWashMax }} />
              </p>
            </div>
          </div>
          <div className="wash-instructions">
            <img src={cicleSimple} alt="icono lavado" />
            <p>
              {mask.customWashInfo}
            </p>
          </div>
        </section>
      }
      <footer>
        <Link className="button" to={'/mask/' + id + '/wash/edit'}>
          <img src={showCustom ? infoEdit : infoAdd} />
          <span><FormattedMessage id={'mask-wash.button.' + (showCustom ? 'edit' : 'add')} /></span>
        </Link>
      </footer>
    </div>
  )
}

export default MaskWash
