import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withRouter} from "react-router-dom";

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function SimpleCard(props) {
    const classes = useStyles();
    function linkTo(path) {
        props.history.push("/post/" + path)
    }
    const data = props.data;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {data.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    {data.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {data.date}
                </Typography>
                <Typography variant="body2" component="p">
                    {data.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={(path) => linkTo(data.id)}>Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default withRouter(SimpleCard)