import { useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import NavBar from "./components/NavBar"
import BuildForm from "./components/build_protos/BuildForm"
import Library from "./components/Library"
import ProtoTabs from "./components/active_protos/ProtoTabs"
import Home from "./components/Home"
import protoServices from "./services/protoServices"
import activeProtoServices from "./services/activeProtoServices"
import { setAllProtosList } from "./reducers/userProtosReducer"
import { setAllActiveList } from "./reducers/activeProtosReducer"
import { Container, CssBaseline } from '@mui/material'
import './Draft.css'
import { useDispatch } from "react-redux"
// import 'draft-js/dist/Draft.css';

const App = () => {
  const dispatch = useDispatch()

  // Setting all user protos list: used in Home/Dialog
  useEffect(() => {
    const getUserProtos = async () => {
      const result = await protoServices.getAllUserProtos()
      dispatch(setAllProtosList(result))
    }
    getUserProtos()
  }, [])

  // Setting current active proto list. Used in ProtoTabs.
  useEffect(() => {
    const getActive = async () => {
      const result = await activeProtoServices.getActiveProtos()
      dispatch(setAllActiveList(result[0].activeProtos))
    }
    getActive()
  }, [dispatch])

  console.log('render app')

  return (
    <Router >
      <CssBaseline />
      <NavBar />
      <Container maxWidth="false" sx={{ padding: '0 10px', height: 'calc(100% - 56px)' }} >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/active" element={<ProtoTabs />} />
          <Route path="/build" element={<BuildForm />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </Container>
    </Router >
  )
}

export default App