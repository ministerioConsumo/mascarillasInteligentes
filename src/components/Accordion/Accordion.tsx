import React, { useState } from 'react'

import './Accordion.sass'

interface AccordionProps {
  children?: React.ReactNode
  header?: React.ReactNode
}

const Accordion = ({ header, children }: AccordionProps) => {

  const [showContent, setShowContent] = useState(null)

  return (
    <div className={`accordion ${showContent ? 'expanded' : ''}`}>
      <div
        className="accordion-header"
        onClick={() => setShowContent(!showContent)}
      >
        {header}
        <span className={`icon icon-${showContent ? 'angle_down' : 'angle_right'}`} />
      </div>
      <div className="accordion-content">
        {children}
      </div>
    </div>
  )
}

export default Accordion
