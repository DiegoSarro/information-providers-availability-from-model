import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, fontSize } from "@mui/system";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';

import Paper from '@mui/material/Paper';
import { Input } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';


import { useFormik,FieldArray } from "formik";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TimeSlotPicker from './components/TimeSlotPicker';
import TimeSlotSelector from './components/TimeSlotSelector'
import Chip from '@mui/material/Chip';
import { format } from "date-fns";
import { useDispatch,useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Label } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function Availability() {
  
  const dispach = useDispatch()
  const state = useSelector( state => state)
  let [daysOfTheWeek,setDaysOfTheWeek] = React.useState(state.availability)
  const [defaultPrice,setDefaultPrice] = React.useState(100)
  const [minimunHourPerStay,setMinimunHourPerStay] = React.useState(false)
  const [customHours, setCustomHours] = React.useState("")
  const [defaultTimeBetweenReservations,setDefaultTimeBetweenReservations] = React.useState(30)

  const dayStartsDefault = state.dayStartsDefault
  const dayEndsDefault = state.dayEndsDefault
  const [defaultHourAvailability,setDefaultHourAvailability] = React.useState({})
  const [openDialog, setOpenDialog] = React.useState(false);
  const [newSlot, setNewSlot] = React.useState(false);
  const [newSlotObj,setNewSlotObj]= React.useState({starts:dayStartsDefault, ends:dayEndsDefault});
  const [selectedDay, setSelectedDay] = React.useState(daysOfTheWeek[0]);

  const createNewSlot = day =>{
    let newDay = day.hoursAvailability.push(newSlotObj)
    let newArray = daysOfTheWeek.map(day => {
      if(day.id == newDay.id){
        newDay.hoursAvailability.sort((a,b)=>a.starts.getTime()-b.starts.getTime());
        return newDay
      }
      else return day
    })

    setDaysOfTheWeek(newArray)
    dispach({type:'set',payload:newArray})

  }

  

  const handleClickOpen = day => {
    
    setOpenDialog(true);
    setSelectedDay(day);
  };

  const setHourToDay = (type,value,slot,daySelected) => {
    console.log("Reciving new start value:",value)

    slot[type]=value;
    let newArray = daysOfTheWeek.map(day => {
      if(day.id == daySelected.id){
        //selectedDay.hoursAvailability.sort((a,b)=>a.starts.getTime()-b.starts.getTime());
        return daySelected
      }
      else return day
    })

    console.log("Array new start value:",value)
    setDaysOfTheWeek(newArray)
    dispach({type:'set',payload:newArray})
  }

  const deleteSlot = (slot,daySelected) => {

    let newArray = daysOfTheWeek.map(day => {
      if(day.id == daySelected.id){
        let newSlotArraya =day.hoursAvailability.filter(function (s) {
                                return s.starts !== slot.starts && 
                                       s.ends !== slot.ends
                          });
        daySelected.hoursAvailability = newSlotArraya
        return daySelected
      }
      else return day
    })

    setDaysOfTheWeek(newArray)
    dispach({type:'set',payload:newArray})

  }

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDaySelectedChange = event => {

    let newArray = daysOfTheWeek.map(day => {
          if(event.target.id === day.id){
            day.selected = !day.selected;
          }
          return day
        }
      )

    setDaysOfTheWeek(newArray)
    dispach({type:'set',payload:newArray})
  };

  const handleDefaultPriceChange = (newValue) => {
    if(newValue.target.value && newValue.target.value>0){
        setDefaultPrice(newValue.target.value);
    }
  };

  const handleDefaultTimeBetweenReservationsChange= (newValue) => {
    if(newValue.target.value && newValue.target.value>0){
        setDefaultTimeBetweenReservations(newValue.target.value);
    }
  };

  const handleChangeMinimunHourPerStay =  (newValue) => {
    if(newValue.target.value && newValue.target.value){
        setMinimunHourPerStay(newValue.target.value);
    }
  };

  const handleCustomHoursChange = (event,daySelected) => {

    let newArray = daysOfTheWeek.map(day => {
          //console.log("Buscando:",event.target,day.id)
          if(daySelected.id === day.id){
            day.customHours = event.target.value;
          }
          return day
        }
      )

    setDaysOfTheWeek(newArray)
    dispach({type:'set',payload:newArray})
  };

  const validation = useFormik({
    initialValues: {
      aviableDays: [],
      pricing: 0
    },
    onSubmit: (values) => {
      //Sends the data to some API      
    },
  });

  const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop : '0px',
    textAlign: 'left',

  }));

  const Title = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    fontWeight: 700,
    fontSize: 26,
    height: 20
  }));

  const Title2 = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 16,
    marginRight: 10,
    height: 20,
    color: 'rgb(0 0 0 / 75%)'
  }));

  const Subtitle = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    color:theme.palette.text.secondary,
    fontSize: 14,
    height: 20
  }));

  const DayOfTheWeek = styled(Typography)(({ theme }) => ({
    textAlign: 'left',
    color: blue,
  }));
  


  

  return (
    <React.Fragment>
      <Box sx={{ my: { xs: 2, md: 6 }, p: { xs: 1, md: 1} }}>
        <Typography variant="h4" gutterBottom className="float-left text-left">
          <Title>Pricing & Availability </Title>
        </Typography>
        <Typography variant="span" gutterBottom className="float-left text-left">
              <Subtitle>What ar you operating hours and price per hour?</Subtitle>
        </Typography>
      </Box>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={4}
        onSubmit={validation.handleSubmit}
      >
        
        
          <FormGroup sx={{ width: "100%" , my: { xs: 0, md: 0 }} }>

            <Box sx={{ mt: { xs: 1, md: 1 }, p: { xs: 1, md: 1} }}>
              <Typography variant="div" sx={{ display: 'flex', flexDirection: {xs:'column' , md:'row'}}} >
                  <Title2> Set your Price</Title2><Subtitle>How much you want to charge per hour?</Subtitle>
              </Typography>
            </Box>
              <Paper  
                  sx={{ my: { xs: 1, md: 0 }, p: { xs: 1, md: 1} }}
                  className="flex items-center w-full">
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch'}} className="w-full">
                  <Input
                    disableUnderline={true}
                    id="standard-adornment-weight"
                    value={defaultPrice}
                    onChange={handleDefaultPriceChange}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    endAdornment={<InputAdornment position="end">per hour</InputAdornment>}
                    aria-describedby="price-per-hour"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                  />
                </FormControl>
              </Paper>
              
              <Box sx={{ mt: { xs: 3, md: 3 }, p: { xs: 1, md: 1} }}>
                <Typography variant="div" sx={{ display: 'flex', flexDirection: {xs:'column' , md:'row'}}} >
                    <Title2> Set the Aviability</Title2>
                </Typography>
              </Box>
              {
                daysOfTheWeek.map( day =>
              <Paper  
                  sx={{ my: { xs: 1, md: 1 }, p: { xs: 0, md: 0}, pt:{ xs: 1, md: 1} }}
                  className="flex w-full text-left content-start"
                  key={day.name}>
                
                <Stack direction="column" spacing={2} className="flex w-full" sx={{ m: { xs: 0, md: 0 }, p: { xs: 0, md: 0}}}>
                  <Item className="flex w-full" sx={{ m: { xs: 0, md: 0 }, p: { xs: 0, md: 0}}}>
                  <Stack direction="row" spacing={2} className="flex w-full" sx={{ m: { xs: 0, md: 0 }, p: { xs: 0, md: 0}}}>
                    <Item className="flex" sx={{width: {xs: 170,sm: 150,md: 200},}}>
                      <FormControlLabel
                            value={day.selected}
                            checked={day.selected}
                            onChange={handleDaySelectedChange}
                            control={<Switch 
                                        color="primary" id={day.name} 
                                        />}
                            label={<Title2>{day.name}</Title2>}
                            classes={{
                              colorPrimary: blue,
                            }}
                            color="blue"
                            labelPlacement="start"
                            className="w-full flex "
                          />
                    </Item>
                    <Item className="flex w-2/3 md:w-2/3">
                      
                      { day.selected && 
                        <Stack direction="column" spacing={2} className="flex w-full items-center p-px">
                        <Item className="flex w-full items-center">
                          <FormControl component="fieldset" className="flex w-full flex-column" style={{fontSize:'10px',padding:'0px'}}>
                            <RadioGroup row aria-label="hours" name="row-radio-buttons-group"
                                    value={day.customHours}
                                    onChange={(e) => {handleCustomHoursChange(e, day)}}>
                              <FormControlLabel  value="default" control={<Radio />} label={<Typography fontSize={13}>{dayStartsDefault} - {dayEndsDefault}</Typography>}/>
                              <FormControlLabel value="setHours" control={<Radio />} label={<Typography fontSize={13}>Set Hours</Typography>} />
                              
                              { day.customHours==="setHours" &&
                                <Tooltip title="Add slot">
                                  <IconButton 
                                      color="primary" 
                                      aria-label="Add Slot" 
                                      component="span"
                                      onClick={() => createNewSlot(day)}>
                                    <AddIcon />
                                  </IconButton>
                                  </Tooltip>}
                            </RadioGroup>
                          </FormControl>
                        </Item>
                      </Stack>}
                    </Item>
                  </Stack>
                  </Item>

                {day.customHours==="setHours" &&
                        day.hoursAvailability.map((slot,index) =>
                        <Item direction="row" sx={{display: 'flex',justifyContent: 'flex-end', m:'0px 0px 0px 0px !important', p:'0px 10px 0px 0px !important'}}>
                          <TimeSlotSelector key={index} slot={slot} day={day} onClick={setHourToDay} onDelete={deleteSlot} />
                        </Item>
                      )}
                </Stack>

              </Paper>)}

              <Box sx={{ mt: { xs: 3, md: 3 }, p: { xs: 1, md: 1} }} direction="row">
                <FormControl sx={{display: 'flex'}}>
                  <Box  sx={{display: 'flex',justifyContent: 'center'}}>
                    <FormLabel component="legend" className="w-2/3 " >
                      <Title2>Do you want to set a minimun hour per stay?
                      </Title2>
                    </FormLabel>
                    <RadioGroup row aria-label="minimunHourPerStay" name="row-radio-buttons-group" 
                                className="flex items-center mx-auto	" style={{margin:"auto"}}
                                value={minimunHourPerStay} onChange={handleChangeMinimunHourPerStay}>
                      <FormControlLabel value="true" control={<Radio />}  label="Yes" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Box>
                </FormControl>
              </Box>
              
              
                <Box sx={{ mt: { xs: 0 }, p: { xs: 1, md: 1} }} direction="row">
                  <FormControl className="flex w-full">
                    <Box className="flex w-full items-center">
                      <FormLabel component="legend" className="w-2/3 " >
                        <Title2>Set minimum amount of time required between reservations?</Title2>
                      </FormLabel>
                      
                      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          value={defaultTimeBetweenReservations}
                          onChange={handleDefaultTimeBetweenReservationsChange}
                          endAdornment={<InputAdornment position="end">min</InputAdornment>}
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                        />
                      </FormControl>
                      
                    </Box>
                  </FormControl>
                </Box>

            </FormGroup>
          </Box>
      
    </React.Fragment>
  );
}