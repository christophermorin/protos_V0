import NavBar from "./components/NavBar"
import BuildForm from "./components/build_protos/BuildForm"
import Library from "./components/Library"
import ProtoTabs from "./components/active_protos/ProtoTabs"
import Home from "./components/Home"
import SelectProtos from "./components/SelectProtos"
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import { Container, CssBaseline } from '@mui/material'
import './Draft.css'
// import 'draft-js/dist/Draft.css';

const App = () => {
  return (
    <Router >
      <CssBaseline />
      <NavBar />
      <Container maxWidth="false" sx={{ padding: '0 10px' }} >
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