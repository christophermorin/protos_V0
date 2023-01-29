import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid, Tabs, Tab,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import userServices from '../../services/userServices';

import LibraryCard from './LibraryCard';

function Library() {
  const [value, setValue] = useState(0);
  const [timeFilter, setTImeFilter] = useState(null);
  const [userProtos, setUserProtos] = useState();
  // const userProtos = useSelector(state => state.userProtos)
  const mediumViewport = useMediaQuery('(min-width:568px)');

  const user = useSelector((state) => state.userAuth);

  useEffect(() => {
    const allUserProtos = async () => {
      const protos = await userServices.getUserProtos(user.id);
      setUserProtos(protos);
    };
    allUserProtos();
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const protos = userProtos ? userProtos.map((proto) => {
    if (+proto.timeOfDay === timeFilter) {
      return (
        <LibraryCard key={proto._id} title={proto.title} />
      );
    }
  })
    : null;

  return (
    <Grid container>
      <Grid item xs={12} md="auto" marginTop={{ xs: 0, md: 10 }} marginLeft={{ xs: 0, md: 25 }} marginRight={{ xs: 0, md: 2 }} marginBottom={2}>
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
      <Grid container md item gap={2} alignContent="flex-start" justifyContent={{ xs: 'center', md: 'flex-start' }} marginTop={{ xs: 5, md: 10 }}>
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
