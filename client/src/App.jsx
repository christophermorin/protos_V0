import { useEffect } from "react"
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
import { setUserAuth } from "./reducers/userAuthReducer"
import { Container, CssBaseline } from '@mui/material'
import './Draft.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userAuth)

  useEffect(() => {
    dispatch(setUserAuth(JSON.parse(window.localStorage.getItem('user') || null)))
  }, [])

  return (
    <Router >
      <CssBaseline />
      {user ?
        <>
          <NavBar />
          <Container maxWidth='false' sx={{ padding: '0 10px', height: 'calc(100% - 56px)' }}>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/active" element={<ProtoTabs />} />
              <Route path="/build" element={<BuildForm />} />
              <Route path="/library" element={<Library />} />
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