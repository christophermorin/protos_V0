import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Tabs, Tab, Grid, Box, Zoom,
} from '@mui/material';
import ActiveProto from './ActiveProto';
import SpeedDialMenu from '../Utilities/SpeedDIalMenu';
import activeProtoServices from '../../services/activeProtoServices';
import { setActiveProtos } from '../../reducers/activeProtosReducer';
import { displayedAddOne, displayedRemoveOne } from '../../reducers/displayedProtosReducer';

export default function ProtoTabs() {
  const protoList = useSelector((state) => state.activeProtos);
  const user = useSelector((state) => state.userAuth);
  const displayedProtos = useSelector((state) => state.displayedProtos);
  const dispatch = useDispatch();
  // Setting current active proto list.Used in ProtoTabs.
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
    event.target.style.color = 'red';
    const found = displayedProtos.find((item) => item._id === proto._id);
    if (!found) {
      dispatch(displayedAddOne(proto));
    } else {
      dispatch(displayedRemoveOne(proto));
      event.target.style.color = '';
    }
  };
  const tabCount = protoList ? protoList.activeProtos.map((proto) => {
    const styles = {
      // backgroundColor: colors[proto.timeOfDay],
      borderRadius: '5px',
      border: '1px solid black',
      marginRight: 10,
    };
    return (
      <Tab
        style={styles}
        key={proto._id}
        label={proto.title}
        onClick={() => handleClick(event, proto)}
      />
    );
  })
    : null;

  // Display selected protos
  const displayed = displayedProtos ? displayedProtos.map((proto) => (
    <Grid item key={proto._id} sx={{ padding: '0 10px' }}>
      <Zoom in>
        <Box>
          <ActiveProto proto={proto} />
        </Box>
      </Zoom>
    </Grid>
  ))
    : null;

  return (
    <Grid
      container
      direction="row"
      height="100%"
      alignContent="flex-start"
    >
      <Grid
        item
        xs={12}
        marginLeft={{ xs: 'none', md: '200px' }}
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
      <Grid
        item
        xs={12}
        height="calc(100% - 64px)"
        marginLeft={{ xs: 'none', md: '200px' }}
        sx={{ overflowX: 'scroll' }}
      >
        {displayedProtos.length > 0
          ? (
            <Grid
              container
              direction="row"
              wrap="nowrap"
              alignContent="flex-start"
            >
              {displayed}
            </Grid>
          )
          : <div style={{ display: 'flex', justifyContent: 'center' }}>No active Protos...</div>}
        <SpeedDialMenu />
      </Grid>
    </Grid>
  );
}

// sx={{ height: '88vh' }}
