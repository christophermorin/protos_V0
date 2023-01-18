import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ActiveProto from './ActiveProto';
import { Tabs, Tab, Grid, Box, Zoom, } from '@mui/material'
import activeProtoServices from '../../services/activeProtoServices'
import { setAllActiveList } from '../../reducers/activeProtosReducer';

export default function ProtoTabs() {
  const [protoArr, setProtoArr] = useState([])
  const activeProtos = useSelector(state => state.activeProtos)
  const user = useSelector(state => state.userAuth)

  const dispatch = useDispatch()

  // Setting current active proto list.Used in ProtoTabs.
  useEffect(() => {
    const getActive = async () => {
      try {
        const result = await activeProtoServices.getActiveProtos(user.id)
        if (result.length > 0) {
          dispatch(setAllActiveList(result[0].activeProtos))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getActive()
  }, [])

  const handleClick = (event, proto) => {
    event.target.style.color = 'red'
    const found = protoArr.find(p => p.id === proto.id)
    if (!found) {
      setProtoArr(prevState => [...prevState, proto])
    } else {
      protoArr.splice(protoArr.indexOf(found), 1)
      const filter = protoArr.filter(p => p.id !== proto.id)
      event.target.style.color = ''
      setProtoArr(filter)
    }
  }
  //Display selected protos
  const displayProtos = protoArr.map(proto => {
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

  const tabCount = activeProtos.map(proto => {
    return (
      <Tab key={proto.id} label={proto.title} onClick={() => handleClick(event, proto)}
      />
    )
  })

  return (
    <Box
      margin={{ xs: 'none', md: '0 200px' }}
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
        {displayProtos.length > 0
          ?
          <Grid container direction='row' wrap='nowrap' sx={{ overflowX: 'scroll', height: '88vh', }} >
            {displayProtos}
          </Grid>
          :
          <div style={{ display: 'flex', justifyContent: 'center' }} >No active Protos...</div>}
      </Box>
    </Box >
  )
}