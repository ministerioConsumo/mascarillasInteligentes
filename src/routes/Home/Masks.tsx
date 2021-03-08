import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useHistory } from 'react-router-dom'
import MarkdownMessage from '@gluedigital/markdown-message'
import { useMasks } from 'src/hooks/masks'
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet'
import Carousel from '@gluedigital/react-carousel'
import DraggableCard from 'src/components/DraggableCard/DraggableCard'
import Mask from './Mask'
import { useModal } from '@gluedigital/modal'

import 'src/components/Modals/StartModal'
import './Masks.sass'
import logo from 'src/static/images/logo_mincon_vertical.svg'
import Privacy from './Privacy'

const Masks = () => {
  const history = useHistory()
  const modal = useModal()
  const masks = useMasks()

  const handleAdd = () => {
    if (!localStorage.getItem('skip.start')) {
      modal.show('start-modal')
    }
    history.push('/add-mask/')
  }

  const noMasks = <h2><FormattedMessage id="home.no-masks" /></h2>

  return (
    <div className="masks">
      <section className="masks-count" >
        {masks.length === 0 && <img src={logo} alt="logo del Ministerio de Consumo" />}
        <h3>
          <MarkdownMessage id="home.masks-count" values={{ n: masks.length }} />
        </h3>
      </section>
      <section className="masks-content">
        {masks.length === 0 && noMasks}
        {masks.length > 0 &&
          <Carousel vertical lockOnFit loop align="center">
            {masks.map(mask =>
              <div key={mask.id} className="slide">
                <Mask mask={mask} />
              </div>
            )}
          </Carousel>
        }
      </section>
      <section className="add-mask">
        <button onClick={handleAdd}>
          <span className="icon icon-mask" />
          <MarkdownMessage id={`home.add-${masks.length ? 'new-' : ''}mask`} />
        </button>
      </section>
      <SwipeableBottomSheet overflowHeight={70}>
        <DraggableCard>
          <Privacy />
        </DraggableCard>
      </SwipeableBottomSheet>
    </div>
  )
}

export default Masks
