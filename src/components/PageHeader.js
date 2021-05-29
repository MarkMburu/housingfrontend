import React from 'react';
import {Paper,Card,Typography, makeStyles} from "@material-ui/core";

const useStyle = makeStyles(theme=>({
    root:{
        backgroundColor:"#fdfdff"
    },
    PageHeader:{
        padding:theme.spacing(4),
        display:"flex",
        // margin: "8px"
    },
    pageIcon:{
        display:"inline-block",
        padding: theme.spacing(2),
        color:"#3c44b1"
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))
function PageHeader(props) {
    const {title,subtitle,icon} = props;
    const classes = useStyle()
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.PageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                <Typography
                variant="h6"
                component="div">{title}</Typography>
                <Typography
                variant="subtitle2"
                component="div">{subtitle}</Typography>
            </div>
            </div>
          
        </Paper>

    )
}

export default PageHeader