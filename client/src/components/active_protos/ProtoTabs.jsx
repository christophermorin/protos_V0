import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ActiveProto from './ActiveProto';
import { Tabs, Tab, Grid, Box, Zoom, } from '@mui/material'
import activeProtoServices from '../../services/activeProtoServices'
import { setActiveProtos } from '../../reducers/activeProtosReducer';
import { addProto, removeOneProto } from '../../reducers/displayedProtosReducer';

export default function ProtoTabs() {
  const protoList = useSelector(state => state.activeProtos)
  const user = useSelector(state => state.userAuth)
  const displayedProtos = useSelector(state => state.displayedProtos)
  const dispatch = useDispatch()

  // Setting current active proto list.Used in ProtoTabs.
  useEffect(() => {
    const getActive = async () => {
      try {
        const returnedList = await activeProtoServices.getActiveProtos(user.id)
        if (returnedList) {
          dispatch(setActiveProtos(returnedList))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getActive()
  }, [])

  const handleClick = (event, proto) => {
    event.target.style.color = 'red'
    const found = displayedProtos.find(item => item.id === proto.id)
    if (!found) {
      dispatch(addProto(proto))
    }
    else {
      dispatch(removeOneProto(proto))
      event.target.style.color = ''
    }
  }

  const tabCount = protoList ? protoList.activeProtos.map(proto => {
    return (
      <Tab key={proto.id} label={proto.title} onClick={() => handleClick(event, proto)}
      />
    )

  })
    :
    null

  //Display selected protos
  const displayed = displayedProtos ? displayedProtos.map(proto => {
    return (
      <Grid item key={proto.id} sx={{ padding: '0 10px', }}>
        <Zoom in={true}>
          <Box>
            <ActiveProto proto={proto} />
          </Box>
        </Zoom>
      </Grid >
    )
  })
    :
    null

  return (
    <Box
      marginLeft={{ xs: 'none', md: '200px' }}
    >
      <Tabs
        value={false}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {tabCount}
      </Tabs>
      <Box>
        {displayedProtos.length > 0
          ?
          <Grid container direction='row' wrap='nowrap' sx={{ overflowX: 'scroll', height: '88vh', }} >
            {displayed}
          </Grid>
          :
          <div style={{ display: 'flex', justifyContent: 'center' }} >No active Protos...</div>}
      </Box>
    </Box >
  )
}