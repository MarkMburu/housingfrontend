import { Dialog, DialogContent,DialogTitle, makeStyles, Typography } from '@material-ui/core';
import {Controls} from "./controls/Controls"
import React from 'react'
import CloseIcon from "@material-ui/icons/Close"

const useStyles = makeStyles(theme =>({
    dialogWrapper:{
        padding:theme.spacing(2),
        position:'absolute',
        top: theme.spacing(5)
    },
    dialogTitle:{
        padding:"0px"
    }
}))
function Popup(props) {
    const {title,children,openPopup,setOpenPopup} = props;
    const {dialogWrapper,dialogTitle} = useStyles()
    console.log(openPopup)
    return (
        <Dialog open={openPopup} maxWidth="md" classes={{paper: dialogWrapper}}>
            <DialogTitle className={dialogTitle} >
                <div style={{display:"flex"}}>
                <Typography variant="h6" component="div" style={{flexGrow: 1}}>
                    {title}
                </Typography>
                <Controls.ActionButton  color="secondary" onClick={()=>setOpenPopup(false)}>
                  <CloseIcon/>
                </Controls.ActionButton>
                </div>
                
               
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Popup
