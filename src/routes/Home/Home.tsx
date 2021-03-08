import React from 'react'
import MarkdownMessage from '@gluedigital/markdown-message'
import Masks from './Masks'

import './Home.sass'

const Home = () => {

  return (
    <div id="home" className="page">
      <header>
        <h1>
          <MarkdownMessage id="home.title" />
        </h1>
      </header>
      {<Masks />}
    </div>
  )
}

export default Home
