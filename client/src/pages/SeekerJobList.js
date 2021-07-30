import React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function SeekerJobList(){
    const [category, setCategory] = React.useState('');
    function handleChange(){
        
    }
    return(<>
    <h1>Jobs</h1>
    <div style={{display:"flex"}}>
    <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={category}
          onChange={handleChange}
          label="Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"front-end"}>Web Developer Front-End</MenuItem>
          <MenuItem value={"back-end"}>Web Developer back-End</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
    </div>
    </>)
}