import React from 'react'
import { FormattedMessage } from 'react-intl'

import './Privacy.sass'

const Privacy = () => {

  return (
    <div id="privacy">
      <h4 className="title">
        <FormattedMessage id="privacy.title" />
      </h4>
      <section className="info">
        <p>
          El responsable de esta aplicación es el Ministerio de Consumo, con sede en Paseo del Prado 18 28014 Madrid.
        </p>
        <p>
          Esta aplicación no envía ningún tipo de dato a ningún servidor, ni del Ministerio de Consumo,
          ni de ninguno de sus proveedores o partners. Todos los datos se mantienen en la aplicación,
          dentro de tu terminal, borrándose cuando esta se desinstala y solo siendo accesibles para ti.
        </p>
        <p>
          La aplicación tampoco registra el uso que haces de la misma. No dispone de software de tracking.
        </p>
        <p>
          Las notificaciones sobre el uso de mascarillas son generadas por tu propio terminal. Ni el
          ministerio ni terceros tienen control.
        </p>
      </section>
    </div>
  )
}

export default Privacy