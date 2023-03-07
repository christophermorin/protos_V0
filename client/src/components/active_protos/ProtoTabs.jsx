import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Tabs,
  Grid,
  Slide,
  Typography,
  Box,
} from '@mui/material';
import ActiveProto from './ActiveProto';
import SpeedDialMenu from '../utilities/SpeedDIalMenu';
import ActiveProtosButton from '../buttons/ActiveProtosButton';
import activeProtoServices from '../../services/activeProtoServices';
import { setActiveProtos } from '../../reducers/activeProtosReducer';
import { displayedAddOne, displayedRemoveOne } from '../../reducers/displayedProtosReducer';

function ProtoTabs() {
  const protoList = useSelector((state) => state.activeProtos);
  const user = useSelector((state) => state.userAuth);
  const displayedProtos = useSelector((state) => state.displayedProtos);
  const dispatch = useDispatch();
  useEffect(() => {
    const getActive = async () => {
      try {
        const returnedList = await activeProtoServices.getActiveProtos(user.id);
        if (returnedList) {
          dispatch(setActiveProtos(returnedList));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getActive();
  }, []);
  const handleClick = (event, proto) => {
    const found = displayedProtos.find((item) => item._id === proto._id);
    if (!found) {
      dispatch(displayedAddOne(proto));
    } else {
      dispatch(displayedRemoveOne(proto._id));
    }
  };
  const tabCount = protoList ? protoList.activeProtos.map((proto) => (
    <ActiveProtosButton
      key={proto._id}
      title={proto.title}
      action={() => handleClick(event, proto)}
    />
  ))
    : null;

  const displayed = displayedProtos ? displayedProtos.map((proto) => (
    <Slide key={proto._id} direction="down" in mountOnEnter unmountOnExit>
      <Grid item>
        <ActiveProto proto={proto} />
      </Grid>
    </Slide>
  ))
    : null;

  return (
    <Grid
      container
      direction="row"
      height="calc(100% - 32px)"
      justifyContent="center"
    >
      <Grid
        item
        xs={12}
      >
        <Tabs
          value={false}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{ marginTop: 1, marginBottom: 1 }}
        >
          {tabCount}
        </Tabs>
      </Grid>
      {displayedProtos.length > 0
        ? (
          <Grid
            item
            xs={12}
            height="inherit"
            sx={{ overflowX: 'auto' }}
          >

            <Box
              display="flex"
              direction="row"
              wrap="nowrap"
              height="100%"
              sx={{ overflowX: 'scroll' }}
              spacing={1}
              gap={2}
              padding={1}
            >
              {displayed}
            </Box>
          </Grid>
        )
        : (
          <Typography
            variant="h6"
          >
            {`Hello ${user.username}, let's get to work.`}
          </Typography>
        )}
      <SpeedDialMenu />
    </Grid>
  );
}

export default ProtoTabs;
