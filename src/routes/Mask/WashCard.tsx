import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Mask } from 'src/store/types'
import { useMaskActions } from 'src/hooks/masks'
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet'
import DraggableCard from 'src/components/DraggableCard/DraggableCard'

import './WashCard.sass'
import washing from 'src/static/images/washing_machine.svg'
import washing2 from 'src/static/images/washing_machine-2.svg'
import wash from 'src/static/images/wash.svg'
import wash2 from 'src/static/images/wash-2.svg'
import infoIcon from 'src/static/images/info-add.svg'

interface WashCardProps {
  mask: Mask
  isOverdue: Boolean
}

const WashCard = ({ mask, isOverdue }: WashCardProps) => {
  const [isOpen, setOpen] = useState(false)
  const actions = useMaskActions()
  const max = mask.customWashMax || 50

  const perPage = 50
  const iconPages = []
  const iconPagesCount = Math.ceil(max / perPage)
  for (let p = 0; p < iconPagesCount; p++) {
    const icons = []
    const thisPageMax = Math.min(max, (p + 1) * perPage)
    for (let i = p * perPage; i < thisPageMax; i++) {
      const isUsed = mask.washCount > i
      icons.push(
        <img
          className={isUsed ? 'used' : 'unused'}
          key={i}
          src={isUsed ? wash : wash2}
          alt="icono lavado"
        />
      )
    }
    iconPages.push(<div key={p} className="icon-page">{icons}</div>)
  }

  const washingIcon = isOverdue ? washing2 : washing
  const moreWash = max > mask.washCount

  const [displayWash, setDisplayWash] = useState(mask.washCount)
  useEffect(() => setDisplayWash(mask.washCount), [mask.washCount])
  const handleWashChange = e => {
    let n = parseInt(e.target.value)
    if (isNaN(n) || n < 0) n = 0
    if (mask.customWashMax && n > mask.customWashMax) n = mask.customWashMax
    setDisplayWash(n)
  }
  const handleWashSave = e => {
    e.preventDefault()
    actions.setWashCount(mask.id, displayWash)
    const focused: any = document.activeElement
    focused.blur()
  }

  return (
    <SwipeableBottomSheet overflowHeight={110} onChange={setOpen}>
      <DraggableCard>
        <div className={`wash-card ${isOpen ? 'open' : 'closed'} ${isOverdue ? 'overdue' : ''}`}>
          <header>
            <div className="status">
              <h3 className="title"><FormattedMessage id="wash-card.count" /></h3>
              <div className="count">
                <img src={washingIcon} alt="icono lavadora" />
                <strong className="current">{displayWash}</strong>
                {mask.customWashMax &&
                  <>
                    <strong>/</strong>
                    <span className="total">{max}</span>
                  </>
                }
                <form onSubmit={handleWashSave}>
                  <input
                    name="count"
                    type="number"
                    value={displayWash}
                    onChange={handleWashChange}
                    onBlur={() => setDisplayWash(mask.washCount)}
                    min={0}
                    max={mask.customWashMax}
                  />
                </form>
              </div>
            </div>
            <div className="links">
              <Link className="button" to={'/mask/' + mask.id + '/wash'}>
                {isOpen && <span className="question">?</span>}
                <span><FormattedMessage id={`wash-card.${isOpen ? 'howto' : 'how'}`} /></span>
              </Link>
            </div>
          </header>

          {
            moreWash ?
              <div className="wash-icons">{iconPages}</div> :
              <div className="advice">
                <h4><FormattedMessage id="wash-card.advice.title" /></h4>
                <div><FormattedMessage id="wash-card.advice.text" /></div>
              </div>
          }
          <div className="actions">
            <button disabled={!moreWash} className="add" onClick={() => actions.wash(mask.id)}>
              <span className="icon icon-plus" />
              <span><FormattedMessage id="wash-card.wash" /></span>
            </button>
            <Link className="button edit" to={'/mask/' + mask.id + '/wash/edit'}>
              <img src={infoIcon} alt="icono añadir información" />
              <span><FormattedMessage id="wash-card.customize" /></span>
            </Link>
          </div>
        </div>
      </DraggableCard>
    </SwipeableBottomSheet>
  )
}

export default WashCard
