import { Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'

export default function ProtoTabs({ activeProtos }) {
  const activeTabs = activeProtos.map((proto, i) => {
    return (
      <Tab key={proto._id} label={proto.title} to={`/active/${proto._id}`} component={Link} selected={true} />
    )
  })

  return (
    <Tabs variant="scrollable" scrollButtons
      allowScrollButtonsMobile value={false}>
      {activeTabs}
    </Tabs>
  )
}

