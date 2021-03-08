import React, { useEffect } from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ModalWrapper, Modal, useModal } from '@gluedigital/modal'
import ErrorBoundary from 'src/components/ErrorBoundary/ErrorBoundary'
import WelcomeWrapper from 'src/components/Welcome/WelcomeWrapper'
import Home from './Home/Home'
import Mask from './Mask/Mask'
import MaskWash from './MaskWash/MaskWash'
import MaskWashEdit from './MaskWashEdit/MaskWashEdit'
import AddMask from './AddMask/AddMask'
import ResultMask from './ResultMask/ResultMask'
import RemoveMask from './RemoveMask/RemoveMask'
import NotFound from './NotFound/NotFound'
import 'src/capacitor'

declare var window: any

const Meta = () => {
  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
    </Helmet>
  )
}

const App = () => {
  const location = useLocation()

return (
  <ModalWrapper>
    <Meta />
    <CapacitorHack />
    <main id="app">
      <ErrorBoundary>
        <WelcomeWrapper>
          <TransitionGroup className="pages-transition-group">
            <CSSTransition
              timeout={500}
              key={location.key}
              classNames="page-transition"
            >
              <Switch location={location}>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/mask/:id" exact>
                  <Mask />
                </Route>
                <Route path="/mask/:id/wash" exact>
                  <MaskWash />
                </Route>
                <Route path="/mask/:id/wash/edit" exact>
                  <MaskWashEdit />
                </Route>
                <Route path="/add-mask">
                  <AddMask />
                </Route>
                <Route path="/result-mask/:id" exact>
                  <ResultMask />
                </Route>
                <Route path="/remove-mask/:id" exact>
                  <RemoveMask />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </WelcomeWrapper>
      </ErrorBoundary>
      <Modal />
    </main>
  </ModalWrapper>
)
}

const CapacitorHack = () => {
  const history = useHistory()
  const modal = useModal()

  useEffect(() => {
    // Make history & modal available for capacitor usage
    window.myHistory = history
    window.myModal = modal
  }, [history, modal])

  return <></>
}

export default App
