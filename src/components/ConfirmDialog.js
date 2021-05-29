import { Dialog, DialogContent, DialogTitle,Typography,DialogActions ,makeStyles,IconButton} from '@material-ui/core';
import { NotListedLocation } from '@material-ui/icons';
import React from 'react';
import { Controls } from "./controls/Controls";

const useStyles = makeStyles(theme =>({
   dialog:{
       padding: theme.spacing(2),
       position: 'absolute',
       top: theme.spacing(8)
   },
   dialogTitle:{
    textAlign: 'center'
},
   dialogContent:{
       textAlign: 'center'
   },
   DialogActions:{
       justifyContent:'center'
   },
   titleIcon:{
       backgroundColor: theme.palette.secondary.light,
       color: theme.palette.secondary.main,
       '& :hover':{
        backgroundColor: theme.palette.secondary.light,
        color: 'default', 
       },
       '& .MuiSvgIcon-root':{
           fontSize: '8rem'
       }
   }
}))

function ConfirmDialog(props) {
    const {confirm,setConfirmDialog} = props;
    const classes = useStyles()
    console.log(confirm)
    return (
    <Dialog open={confirm.isOpen} classes={{paper : classes.dialog}}>
        <DialogTitle className={classes.dialogTitle}>
            <IconButton disableRipple className={classes.titleIcon}>
                <NotListedLocation/>
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <Typography variant="h6">
                {confirm.title}
            </Typography>
            <Typography variant="subtitle2">
                {confirm.subTitle}
            </Typography>
        </DialogContent>
        <Controls.Button text="No" color="default" onClick={() => setConfirmDialog({...confirm,isOpen:false})}/>
        <Controls.Button text="Yes" color="secondary" onClick={confirm.onConfirm}/>
        <DialogActions>

        </DialogActions>
    </Dialog>
    )
}

export default ConfirmDialog
