import React from 'react'
import {Snackbar,makeStyles} from "@material-ui/core"
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme=>({
  root: {
      top : theme.spacing(9) 
  }
}))
function Notification(props) {
   const classes = useStyles(); 
   const {notify,setNotify} = props;
  const handleClose=(event,reason) => {
      if(reason === "clickaway"){
          
      }
     setNotify({
         ...notify,
         isOpen:false
     })
   }
    return (
        <Snackbar  
        className={classes.root}
        open={notify.isOpen}
        autoHideDuration={1000}
        anchorOrigin={{vertical:'top',horizontal:'right' }}
        onClose={handleClose}>
           
           <Alert severity={notify.type} onClose={handleClose}>
               {notify.message}
           </Alert>
        </Snackbar>
    )
}

export default Notification
