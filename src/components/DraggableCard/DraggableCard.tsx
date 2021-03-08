import React from 'react'

import './DraggableCard.sass'

interface DraggableCardProps {
  children?: React.ReactNode
}

const DraggableCard = ({ children }: DraggableCardProps) => {


  return (
    <div id="draggable-card">
      <section className="children">
        {children}
      </section>
    </div>
  )
}

export default DraggableCard
