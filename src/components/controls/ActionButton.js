import React from 'react';
import {Button, makeStyles} from "@material-ui/core";
const useStyles = makeStyles(theme=>({
    root:{
        minWidth:"0px",
        margin: theme.spacing(0.5)
    },
    "secondary":{
        backgroundColor:theme.palette.secondary.light,
        '& .MuiButtonLabel':{
            color: theme.palette.secondary.main
        }
    },
    "primary":{
        backgroundColor:theme.palette.primary.light,
        '& .MuiButtonLabel':{
            color: theme.palette.primary.main
        }
    }
}))
function ActionButton(props) {
const {color,children,onClick} = props;
const classes = useStyles()
    return (
        <Button onClick={onClick} className={`${classes.root} ${classes[color]}`}>
              {children}
        </Button>
    )
}

export default ActionButton
