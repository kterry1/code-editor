import { makeStyles } from '@material-ui/core'
import React from 'react'
import ProgrammingLangList from '../../components/Home/ProgammingLangList';

const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.welcomeMessage}>Welcome to the Code Editor App</div>
            <ProgrammingLangList/>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
    },
    welcomeMessage: {
        padding: '15px',
        fontSize: '30px',
        color: theme.font,
    }
}))

export default Home
