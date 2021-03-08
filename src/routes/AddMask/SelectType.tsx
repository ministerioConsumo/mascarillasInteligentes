
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useModal } from '@gluedigital/modal'
import Carousel, { useSlideState } from '@gluedigital/react-carousel'
import { MaskType } from 'src/store/types'
import { Tooltip } from '@gluedigital/tooltip'

import 'src/components/Modals/MaskDetailsModal'
import './SelectType.sass'

interface SelectTypeProps {
  onChange: Function
}

const SelectType = ({ onChange }: SelectTypeProps) => {
  const modal = useModal()
  const handleAdd = type => {
    onChange(type)
    modal.show('mask-details-modal', { maskType: type })
  }

  const types = Object.values(MaskType)

  return (
    <section className="select-type">
      <Carousel loop align="center">
        {types.map(type =>
          <Slide key={type} type={type} onAdd={handleAdd} />
        )}
      </Carousel>
    </section>
  )
}

interface SlideProps {
  type: string,
  onAdd: (type: string) => void
}

const Slide = ({ type, onAdd }: SlideProps) => {
  const slideState = useSlideState()
  const minOpacity = 0.1

  const minScale = 0.2
  const scale = minScale + (1 - minScale) * slideState.activePercent
  const style = {
    transform: `scale(${scale})`,
    opacity: minOpacity + (1 - minOpacity) * slideState.activePercent
  }

  let tooltip = null
  if (type === 'surgical') {
    const content =
      <div className="tooltip-content">
        <h3>
          <span className="icon icon-caution" />
          <span><FormattedMessage id="tooltip.surgical.title" /></span>
        </h3>
        <p><FormattedMessage id="tooltip.surgical.text-1" /></p>
        <p><FormattedMessage id="tooltip.surgical.text-2" /></p>
      </div>
    tooltip =
      <Tooltip content={content} position='top' className='tooltip'>
        <div className='icon icon-caution' />
      </Tooltip>
  }

  return (
    <div className={`slide-mask slide-${type}`}>
      <article style={style}>
        <div className="mask-image" onClick={() => onAdd(type)} />
        <h3 className="type" onClick={() => onAdd(type)}>
          <FormattedMessage id={'mask.' + type} />
        </h3>
        <p>
          <FormattedMessage id={'mask.' + type + '.details'} />
        </p>
        { type === 'reusable-hygienic' &&
          <div className="eco-friendly">
            <span className="leaf" />
            <span><FormattedMessage id="add-mask.eco-friendly" /></span>
          </div>
        }
        {tooltip}
      </article>
    </div>
  )
}

export default SelectType
