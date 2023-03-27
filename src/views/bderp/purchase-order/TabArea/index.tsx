import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Autocomplete, Grid, InputLabel, TextField } from '@mui/material'
import FirstTab from './FirstTab'
import SecondTab from './SecondTab'
import ThirdTab from './ThirdTab'
// import SecondTab from './SecondTab'
// import ThirdTab from './ThirdTab'

function TabPanel(props:any) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{padding: 0}}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography >{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index:any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function TabArea() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab sx={{pl:0}} label='Other Details' {...a11yProps(0)} />
          <Tab label='Address' {...a11yProps(1)} />
          <Tab label='Remarks' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FirstTab/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SecondTab/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ThirdTab/>
      </TabPanel>
    </Box>
  )
}