import React from 'react'
import{FormControl,FormLabel,RadioGroup as MuiRadioGroup,FormControlLabel,Radio} from "@material-ui/core"
export default function RadioGroup(props) {
    const {label,name,value,onChange,items} = props;
    return (
        <FormControl>
        <FormLabel>{label}</FormLabel>
        <MuiRadioGroup row
        name={name} value={value}  onChange={onChange}>
            {
                items.map((item,index)=>(
                    <FormControlLabel value={item.id} key={item.id} control={<Radio/>} label={item.title}/>
                ))
            }
        </MuiRadioGroup>
    </FormControl>
    )
}
