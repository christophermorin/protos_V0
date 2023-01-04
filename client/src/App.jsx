import NavBar from "./components/NavBar"
import ProtoTabs from "./components/active_protos/ProtoTabs"
import Active from "./components/active_protos/Active"
import Build from "./components/build_protos/Build"
import Library from "./components/Library"
import Footer from "./components/Footer"

import { protoDb } from "./protoDb"

import Test from './components/active_protos/Test'

import protoServices from "./services/protoServices"
import { setProtos } from "./reducers/protosReducer"
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import { Container, CssBaseline } from '@mui/material'
import './Draft.css'

const App = () => {

  return (
    <Router >
      <CssBaseline />
      <div style={{ minHeight: '95vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <NavBar />
        {/* <ProtoTabs activeProtos={protoDb} /> */}
        <Container maxWidth="xl">
          <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route path="/active" element={<Active />} />
            <Route path="/build" element={<Build />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </Container>
      </div>
      <Footer />
    </Router >
  )
}

export default App