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
import Library from "./components/library/Library"
import userServices from "./services/userServices"
import { setUserProtosList } from "./reducers/userProtosReducer"
import { setUserAuth } from "./reducers/userAuthReducer"
import { Container, CssBaseline } from '@mui/material'
import './Draft.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userAuth)

  // Build dialog*********************************
  const [openBuild, setOpenBuild] = useState()

  const handleOpenBuild = () => {
    setOpenBuild(!openBuild)
  }
  const handleCloseBuild = () => {
    setOpenBuild(false)
  }
  // Fetching all user created protos and populating dropdown lists in home and speeddial add.
  useEffect(() => {
    const getUserProtos = async () => {
      try {
        if (user) {
          const protos = await userServices.getUserProtos(user.id)
          dispatch(setUserProtosList(protos))
        }
      } catch (error) {
        console.log('In App, get user protos', error)
      }
    }
    getUserProtos()
  }, [user])

  // Confirm that user auth still valid. JWT will have an expiration time.
  useEffect(() => {
    dispatch(setUserAuth(JSON.parse(window.localStorage.getItem('user') || null)))
  }, [])

  return (
    <Router >
      <CssBaseline />
      {user ?
        <>
          <NavBar handleOpenBuild={handleOpenBuild} />
          <BuildForm open={openBuild} handleCloseBuild={handleCloseBuild} />
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