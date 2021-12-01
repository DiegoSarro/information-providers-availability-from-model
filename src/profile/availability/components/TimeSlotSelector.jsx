import * as React from 'react';
import { Box, fontSize } from "@mui/system";
import { FormControl } from "@mui/material";
import { MenuItem } from "@mui/material";
import {Typography} from "@mui/material";
import { Select } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const TimeSlotSelector = ({slot,day,onClick,onDelete,...props}) => {

    const [starts,setStarts] = React.useState(slot.starts || props.defaultStart)
    const [ends,setEnds] = React.useState(slot.ends || props.defaultEnds)

    const handleStartsChange = (newValue) => {
        console.log("Sending new start value:",newValue.target.value)
        setStarts(newValue.target.value);
        onClick('starts',newValue.target.value,slot,day)
    };

    const handleEndsChange = (newValue) => {
        console.log("Sending new ends value:",newValue.target.value)
        setEnds(newValue.target.value);
        onClick('ends',newValue.target.value,slot,day)
    };

    const handleDelete = () => {
        onDelete(slot,day);
    }

    return(
        <Box className="flex content-center items-center ml-auto mt-0" style={{marginLeft:'auto'}}>
            <FormControl sx={{ m: 1, minWidth: 120 }} >
                <Select
                value={starts}
                onChange={handleStartsChange}
                displayEmpty
                style={{fontSize:'12px',padding:'0px',borderRadius:'20px'}}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value="8:00 AM">8:00 AM</MenuItem>
                <MenuItem value="9:00 AM">9:00 AM</MenuItem>
                <MenuItem value="10:00 AM">10:00 AM</MenuItem>
                <MenuItem value="11:00 AM">11:00 AM</MenuItem>
                <MenuItem value="12:00 PM">12:00 AM</MenuItem>
                <MenuItem value="1:00 PM">1:00 PM</MenuItem>
                <MenuItem value="2:00 PM">2:00 PM</MenuItem>
                <MenuItem value="3:00 PM">3:00 PM</MenuItem>
                <MenuItem value="4:00 PM">4:00 PM</MenuItem>
                <MenuItem value="5:00 PM">5:00 PM</MenuItem>
                <MenuItem value="6:00 PM">6:00 PM</MenuItem>
                <MenuItem value="7:00 PM">7:00 PM</MenuItem>
                <MenuItem value="8:00 PM">8:00 PM</MenuItem>
                </Select>
            </FormControl>

            <Typography variant="div" gutterBottom style={{margin:5}}>
                      to 
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
            value={ends}
            onChange={handleEndsChange}
            style={{fontSize:'12px',padding:'0px',borderRadius:'20px'}}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            >
            <MenuItem value="8:00 AM">8:00 AM</MenuItem>
            <MenuItem value="9:00 AM">9:00 AM</MenuItem>
            <MenuItem value="10:00 AM">10:00 AM</MenuItem>
            <MenuItem value="11:00 AM">11:00 AM</MenuItem>
            <MenuItem value="12:00 PM">12:00 AM</MenuItem>
            <MenuItem value="1:00 PM">1:00 PM</MenuItem>
            <MenuItem value="2:00 PM">2:00 PM</MenuItem>
            <MenuItem value="3:00 PM">3:00 PM</MenuItem>
            <MenuItem value="4:00 PM">4:00 PM</MenuItem>
            <MenuItem value="5:00 PM">5:00 PM</MenuItem>
            <MenuItem value="6:00 PM">6:00 PM</MenuItem>
            <MenuItem value="7:00 PM">7:00 PM</MenuItem>
            <MenuItem value="8:00 PM">8:00 PM</MenuItem>
            </Select>
            </FormControl>
            <DeleteIcon onClick={handleDelete} />
        </Box>

    )
}

export default TimeSlotSelector;
