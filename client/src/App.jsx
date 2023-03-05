import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom';
import { Container, CssBaseline, Box } from '@mui/material';
import Register from './components/login/Register';
import NavBar from './components/navbar/NavBar';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';
import ProtoTabs from './components/active_protos/ProtoTabs';
import BuildForm from './components/build_protos/BuildForm';
import Library from './components/library/Library';
import userProtoServices from './services/userProtoServices';
import userStatsServices from './services/userStatsServices';
import loginServices from './services/loginServices';
import { setUserProtosList } from './reducers/userProtosReducer';
import { setUserAuth } from './reducers/userAuthReducer';
import './Draft.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth);
  const [openBuild, setOpenBuild] = useState();
  const [containerBg, setContainerBg] = useState(null)

  const handleOpenBuild = () => {
    setOpenBuild(!openBuild);
  };
  const handleCloseBuild = () => {
    setOpenBuild(false);
  };
  useEffect(() => {
    const getUserProtos = async () => {
      try {
        if (user) {
          const protos = await userProtoServices.getUserProtos(user.id);
          await userStatsServices.checkUserStreak(user.id);
          dispatch(setUserProtosList(protos));
        }
      } catch (error) {
        console.log('In App, get user protos', error);
      }
    };
    getUserProtos();
  }, [user]);

  useEffect(() => {
    dispatch(setUserAuth(JSON.parse(window.localStorage.getItem('user') || null)));
  }, []);

  useEffect(() => {
    const getBg = async () => {
      const bg = await loginServices.getUnSplashBackGround()
      setContainerBg(`${bg}&dpr=2&w=1900`)
    }
    getBg()
  }, [])

  const resetContainerBg = async () => {
    const bg = await loginServices.getUnSplashBackGround()
    setContainerBg(`${bg}&dpr=2&w=1900`)
  }

  return (
    <Router>
      {user
        ? (
          <Box sx={{ display: 'flex', background: `center center no-repeat fixed url(${containerBg})`, }}>
            <CssBaseline />
            <>
              <NavBar handleOpenBuild={handleOpenBuild} resetBg={resetContainerBg} />
              <BuildForm open={openBuild} handleCloseBuild={handleCloseBuild} />
              <Container
                maxWidth="false"
                sx={{
                  height: '100vh',
                  overflowX: 'hidden',
                }}
              >
                <Routes>
                  <Route path="/" element={<Home user={user} />} />
                  <Route path="/active" element={<ProtoTabs />} />
                  <Route path="/Dashboard" element={<Dashboard />} />
                  <Route path="/Library" element={<Library />} />
                </Routes>
              </Container>
            </>
          </Box>
        )
        :
        (
          <CssBaseline>
            <Register />
          </CssBaseline>
        )
      }
    </Router >
  );
}

export default App;
