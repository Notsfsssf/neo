import {Container, Fade, makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "./SimpleCard";
import {withRouter} from 'react-router-dom';
import {async} from "q";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
}));

function Main() {
    const classes = useStyles();
    const [data, setData] = useState([])
    const [isError, setIsError] = useState(false)
    useEffect(() => {
            const fetchData = async () => {
                try {
                    const result = await axios.get(
                        '/posts',
                    );

                    setData(result.data);
                } catch (error) {
                    setIsError(true)
                }
            };

            fetchData();
        },
        [])
    return (
        <>
            <Container className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Hello,There
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    这是一个个人网站,记录一些编程上遇到的坑和日常，顺便展示些小demo,<br/>测测spring boot会不会挂掉
                </Typography>
            </Container>
            <Container>
                <Grid container spacing={3}>
                    {
                        isError ?
                            <Grid container justify={"center"}>
                                <Grid item xs={3}>
                                    <p>后台挂掉了！</p>
                                </Grid>
                            </Grid> :
                            data.map(item => (
                                <Grid key={item.id} item xs={12}>
                                    <SimpleCard data={item}/>
                                </Grid>
                            ))
                    }
                </Grid>
            </Container></>
    )
}

export default withRouter(Main);