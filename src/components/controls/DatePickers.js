import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, DatePicker,MuiPickersUtilsProvider } from '@material-ui/pickers'
import React from 'react'

function DatePickers(props) {
    const {name,label,value,onChange} = props;
    const convertToDefEventPara = ( name, value)=>({
        target:{
            name,value
        }
    })
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        

        <DatePicker 
              label={label} 
             name={name} value={value} onChange={ date => onChange(convertToDefEventPara(name,date))}/> 
        </MuiPickersUtilsProvider>
    )
}

export default DatePickers
