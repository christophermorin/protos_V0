import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  BrowserRouter as Router,
  Routes, Route,
} from "react-router-dom"
import Register from './components/login/Register'
import NavBar from "./components/NavBar"
import Home from "./components/home/Home"
import ProtoTabs from "./components/active_protos/ProtoTabs"
import BuildForm from "./components/build_protos/BuildForm"
import Library from "./components/Library"

import activeProtoServices from "./services/activeProtoServices"

import { setUserAuth } from "./reducers/userAuthReducer"
import { Container, CssBaseline } from '@mui/material'
import './Draft.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userAuth)

  // Testing build dialog
  const [toggleBuild, setToggleBuild] = useState()

  const handleOpenBuild = () => {
    setToggleBuild(!toggleBuild)
  }
  const handleCloseBuild = () => {
    setToggleBuild(false)
  }



  useEffect(() => {
    dispatch(setUserAuth(JSON.parse(window.localStorage.getItem('user') || null)))
  }, [])

  return (
    <Router >
      <CssBaseline />
      {user ?
        <>
          <NavBar handleOpenBuild={handleOpenBuild} />
          <BuildForm open={toggleBuild} handleCloseBuild={handleCloseBuild} />
          <Container maxWidth='false' sx={{ padding: '0 10px', height: 'calc(100% - 56px)' }}>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/active" element={<ProtoTabs />} />
              <Route path="/Library" element={<Library />} />
            </Routes>
          </Container>
        </>
        :
        <Register />
      }
    </Router >
  )
}

export default App