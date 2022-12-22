import NavBar from "./components/NavBar"
import Active from "./components/active_protos/Active"
import Build from "./components/build_protos/Build"
import Library from "./components/Library"
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import { Container } from '@mui/material'


const App = () => {
  return (
    <Router>
      <NavBar />
      <Container>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="/active" element={<Active />} />
          <Route path="/build" element={<Build />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
