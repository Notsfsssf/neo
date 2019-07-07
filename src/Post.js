import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {withRouter} from "react-router-dom";
import axios from "axios";
import {Grid, makeStyles} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
    body: {
        margin: theme.spacing(8, 4),
    },
chip:{
    margin: theme.spacing(0, 1),
}

}));


function Post(props) {
    const classes = useStyles();
    const id = props.match.params.id
    const [data, setData] = useState({});
    const [chipData, setChipData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                '/posts/' + id,
            );
            setData(result.data);
        };
        fetchData()
        const fetchTags = async () => {
            const result = await axios.get('/tags?postid=' + id)
            setChipData(result.data)
        }
        fetchTags()
    }, [id]);

    function tagClick(name) {

    }

    return (
    <>
        <Grid className={classes.body}>
            <Grid item xs={12}>
                <h1>{data.title}</h1>
                <p>{data.name}</p>
                <p>{data.date}</p>
            </Grid>
            <Grid item xs={12}>
                <ReactMarkdown escapeHtml={false} source={data.content}/>
            </Grid>
            <Grid item xs={12}> {
                chipData.map(item => (
                    <Chip key={item.id} className={classes.chip} label={item.name} clickable={true} onClick={
                        (name) => tagClick(item.name)
                    }/>
                ))
            }       </Grid>
        </Grid>
    </>
    );
}

export default withRouter(Post)