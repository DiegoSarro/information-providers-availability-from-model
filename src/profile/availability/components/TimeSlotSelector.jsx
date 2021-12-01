import * as React from 'react';
import { Box, fontSize } from "@mui/system";
import { FormControl } from "@mui/material";
import { MenuItem } from "@mui/material";
import {Typography} from "@mui/material";
import { Select } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import _ from 'lodash';




const TimeSlotSelector = ({slot,day,onClick,onDelete,...props}) => {

    //const [hoursLists812,setHoursList] = React.useState(_.range(8,12))
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
        <Box style={{paddingRight:{sx:'10px',sm:'20px',md:'30px'},justifyContent:'flex-end'
        ,padding:'0px',marginTop:'0px'}}  className="flex items-center" 
        >
            <FormControl sx={{ margin: '3px', minWidth: 100}} size="small">
                <Select
                value={starts}
                onChange={handleStartsChange}
                displayEmpty
                style={{fontSize:'12px',padding:'0px',borderRadius:'20px'}}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                {_.range(8,13).map(n => <MenuItem value={`${n}:00 AM`} style={{fontSize:'12px',paddingTop:'2px',paddingBottom:'2px'}}>{`${n}:00 AM`}</MenuItem>)}
                {_.range(1,9).map(n => <MenuItem value={`${n}:00 PM`} style={{fontSize:'12px',paddingTop:'2px',paddingBottom:'2px'}}>{`${n}:00 PM`}</MenuItem>)}

                </Select>
            </FormControl>

            <Typography variant="div">
                      to 
            </Typography>
            <FormControl sx={{ margin: '3px', minWidth: 100 }} size="small">
            <Select
            value={ends}
            onChange={handleEndsChange}
            style={{fontSize:'12px',padding:'0px',borderRadius:'20px'}}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            >
            {_.range(8,13).map(n => <MenuItem value={`${n}:00 AM`} style={{fontSize:'12px',paddingTop:'5px',paddingBottom:'5px'}}>{`${n}:00 AM`}</MenuItem>)}
                {_.range(1,9).map(n => <MenuItem value={`${n}:00 PM`} style={{fontSize:'12px',paddingTop:'5px',paddingBottom:'5px'}}>{`${n}:00 PM`}</MenuItem>)}
            </Select>
            </FormControl>
            <DeleteIcon onClick={handleDelete} sx={{ margin: '3px'}} />
        </Box>

    )
}

export default TimeSlotSelector;
