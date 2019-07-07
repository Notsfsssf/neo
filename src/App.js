import React from 'react';
import './App.css';
import {makeStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Route, withRouter} from "react-router-dom";
import Main from "./main";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Post from "./Post";
import PostManager from "./admin/PostManager";
import PostId from "./admin/PostId";
import AccountBalanceIcon from '@material-ui/icons/Search'
import TripIcon from '@material-ui/icons/RotateLeft'
import About from "./About";
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

}));

function Frame() {
    return (<>
    </>)
}

function App(props) {
    const classes = useStyles();

    function linkToMainPage() {
        props.history.push("/")
    }

    return (
        <div className="App">

            <CssBaseline/>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton href={"/"} edge="start" className={classes.menuButton} color="inherit"
                                    aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <IconButton color="inherit" href={"/signin"}>
                            <TripIcon/>
                        </IconButton>
                        <IconButton edge="end" color="inherit" href={"/about"}>
                            <AccountBalanceIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Route path="/" exact component={Main}/>
                <Route path="/post/:id" component={Post}/>
                <Route exact path="/admin/post" component={PostManager}/>
                <Route path="/admin/post/:id" component={PostId}/>
                <Route path="/about" component={About}/>
            </div>
        </div>
    );
}

export default withRouter(App);
