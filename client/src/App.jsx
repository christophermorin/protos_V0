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
import PhotoCred from './components/utilities/PhotoCred';
import Notification from './components/notifications/Notification';
import userProtoServices from './services/userProtoServices';
import userStatsServices from './services/userStatsServices';
import loginServices from './services/loginServices';
import { setUserProtosList } from './reducers/userProtosReducer';
import { setUserAuth } from './reducers/userAuthReducer';
import './Draft.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth);
  const notifications = useSelector((state) => state.notifications)
  const [openBuild, setOpenBuild] = useState();
  const [containerBg, setContainerBg] = useState('https://images.unsplash.com/photo-1501884428012-aa321a256730?ixid=Mnw0MTg3ODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzgyMDc2MDU&ixlib=rb-4.0.3&dpr=2&w=1900');
  const [unSplashSource, setUnsplashSource] = useState('https://unsplash.com/photos/SXTj90G1f5c');

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

  // useEffect(() => {
  //   const getBg = async () => {
  //     const unSplashData = await loginServices.getUnSplashBackGround();
  //     const unSplashImg = unSplashData.urls.raw;
  //     const unSplashImgSource = unSplashData.links.html;
  //     setContainerBg(`${unSplashImg}&dpr=2&w=1900`);
  //     setUnsplashSource(unSplashImgSource);
  //   };
  //   getBg();
  // }, []);
  const resetContainerBg = async () => {
    const unSplashData = await loginServices.getUnSplashBackGround();
    const unSplashImg = unSplashData.urls.raw;
    const unSplashImgSource = unSplashData.links.html;
    setContainerBg(`${unSplashImg}&dpr=2&w=1900`);
    setUnsplashSource(unSplashImgSource);
  };

  return (
    <Router>
      <Box
        sx={{
          display: 'flex',
          background: `center center no-repeat fixed url(${containerBg})`,
        }}
      >
        <PhotoCred
          unSplashSource={unSplashSource}
          resetBackground={resetContainerBg}
        />
        {notifications
          &&
          (
            <Notification
              title={notifications.title}
              severity={notifications.severity}
            />
          )
        }
        {user
          ? (
            <>
              <CssBaseline />
              <NavBar handleOpenBuild={handleOpenBuild} />
              <BuildForm
                open={openBuild}
                handleCloseBuild={handleCloseBuild}
              />
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
          )
          : (
            <CssBaseline>
              <Register />
            </CssBaseline>
          )}
      </Box>

    </Router>
  );
}

export default App;
