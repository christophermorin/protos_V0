import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid, Tabs, Tab,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import userProtoServices from '../../services/userProtoServices';
import { userProtosRemoveOne } from '../../reducers/userProtosReducer';

import LibraryCard from './LibraryCard';

function Library() {
  const [value, setValue] = useState(0);
  const [timeFilter, setTImeFilter] = useState(null);
  const userProtos = useSelector((state) => state.userProtos);
  const mediumViewport = useMediaQuery('(min-width:568px)'); //find what the MUI md default sizing is and set to that

  const user = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const deleteProto = async (protoTitle, protoId) => {
    try {
      await userProtoServices.deleteUserProto({ user: user.id, proto: protoTitle });
      dispatch(userProtosRemoveOne(protoId));
    } catch (error) {
      console.log('In library delete', error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const protos = userProtos ? userProtos.map((proto) => {
    if (+proto.timeOfDay === timeFilter) {
      return (
        <LibraryCard key={proto._id} proto={proto} deleteProto={deleteProto} />
      );
    }
  })
    : null;

  return (
    <Grid container marginTop={2}>
      <Grid item xs={12} md="auto" marginRight={{ xs: 0, md: 2 }} marginBottom={2}>
        <Tabs
          orientation={mediumViewport ? 'vertical' : 'horizontal'}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Proto Catagory Selection"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Morning" onClick={() => setTImeFilter(0)} />
          <Tab label="Afternoon" onClick={() => setTImeFilter(1)} />
          <Tab label="Evening" onClick={() => setTImeFilter(2)} />
          <Tab label="All day" onClick={() => setTImeFilter(3)} />
        </Tabs>
      </Grid>
      <Grid container md item gap={2} alignContent="flex-start" justifyContent={{ xs: 'center', md: 'flex-start' }}>
        {protos}

      </Grid>
    </Grid>
  );
}

export default Library;

// const styles = {
//   border: '1px solid black',
//   width: '360px',
//   height: '100px',
// };

// Two columnds in desktop
// Left side menu tabs of 'timeOfDay', ie/ morning, evening etc
// Right side will display all protos of that time of day in the second column
// Second column will wrap, display small cards for the proto
// Cards will just be proto title, job count,
//    time count (maybe) and two buttons 'view/edit, and delete'
// Clicking view will bring that proto fully
//    displayed up in a dialog that I can resuse for each proto view.
