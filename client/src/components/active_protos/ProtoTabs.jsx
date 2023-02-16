import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Tabs, Tab, Grid,
} from '@mui/material';
import ActiveProto from './ActiveProto';
import SpeedDialMenu from '../Utilities/SpeedDIalMenu';
import activeProtoServices from '../../services/activeProtoServices';
import { setActiveProtos } from '../../reducers/activeProtosReducer';
import { displayedAddOne, displayedRemoveOne } from '../../reducers/displayedProtosReducer';

function ProtoTabs() {
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
      dispatch(displayedRemoveOne(proto._id));
      event.target.style.color = '';
    }
  };
  const tabCount = protoList ? protoList.activeProtos.map((proto) => {
    const styles = {
      // backgroundColor: colors[proto.timeOfDay],
      borderRadius: '5px',
      borderRight: '1px solid black',
      borderLeft: '1px solid black',
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
    <Grid item key={proto._id}>
      <ActiveProto proto={proto} />
    </Grid>
  ))
    : null;

  return (
    <Grid
      container
      direction="row"
      height="100%"
      justifyContent="center"
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
      {displayedProtos.length > 0
        ?
        (
          <Grid
            item
            xs={12}
            height="calc(100% - 64px)"
            marginLeft={{ xs: 'none', md: '200px' }}
            sx={{ overflowX: 'auto' }}
          >

            <Grid
              container
              direction="row"
              wrap="nowrap"
              alignContent="flex-end"
              spacing={1}
            >
              {displayed}
            </Grid>

          </Grid>
        )
        : <div style={{ justifySelf: 'flex-start' }}>Waiting...</div>}
      <SpeedDialMenu />
    </Grid>
  );
}

export default ProtoTabs;
