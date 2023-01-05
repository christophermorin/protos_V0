import NavBar from "./components/NavBar"
import Active from "./components/active_protos/Active"
import Build from "./components/build_protos/Build"
import Library from "./components/Library"
import Footer from "./components/Footer"

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