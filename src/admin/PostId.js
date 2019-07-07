import PostManager from "./PostManager";
import CloseIcon from "@material-ui/icons/Close"
import React, {useEffect, useState} from "react"
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Editor from "for-editor";
import {makeStyles, Paper} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

function PostId(props) {
    const classes = useStyles();
    const id = props.match.params.id
    const [values, setValues] = React.useState({
        title: 'pero',
        content: '# Your markdown here',
        tags: ''
    });
    const [imageUrls, setImageUrls] = useState([])
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                '/posts/' + id,
            );
            const resultTag = await axios.get('/tags?postid=' + id)
            const data = result.data
            let tags = '';
            if (resultTag.length !== 0)
                for (var i = 0; i < resultTag.data.length; i++) {
                    if (i === 0) {
                        tags = resultTag.data[i].name
                    } else {
                        tags += ',' + resultTag.data[i].name
                    }
                }
            setValues({...values, 'title': data.title, 'content': data.content, 'tags': tags})

        };
        fetchData()
    }, [id]);
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    };

    async function createPost() {
        const result = await axios.patch("/posts/"+id, values, {
            headers: {
                "authorization": localStorage.getItem("authorization")
            }
        })
        if (result.status === 200) {
            setOpen(true);
        }
    }

    async function uploadPicture(e) {
        const input = e.target.files[0]
        const formData = new FormData();
        formData.append("smfile", input)
        const result = await axios.post('https://sm.ms/api/upload', formData, {
            'Content-Type': 'multipart/form-data'
        })
        imageUrls.push(result.data.data)
    }

    async function handleOnDelete(item) {
        const result = await axios.get(item.delete)
        if (result.status === 200) {
            let number = imageUrls.indexOf(item);
            if (number > -1) {
                imageUrls.splice(number, 1)
            }
        }
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (<>
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-full-width"
                        label="Title"
                        placeholder="Placeholder"
                        helperText="Full width!"
                        fullWidth
                        margin="normal"
                        value={values.title}
                        onChange={handleChange('title')}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                </Grid>
                <Grid item xs={12}>
                    <Editor value={values.content} onChange={(e) => {
                        setValues({...values, ["content"]: e});
                    }}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-full-width"
                        label="Tag"
                        placeholder="Placeholder"
                        helperText="Full width!"
                        fullWidth
                        margin="normal"
                        value={values.tags}
                        onChange={handleChange('tags')}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                </Grid>
                <Grid item xs={12}>
                    {
                        imageUrls.length === 0 ? <></> : <Paper>
                            <List dense={false}>
                                {
                                    imageUrls.map(item =>
                                        (<ListItem key={item.url}>
                                            <ListItemText
                                                primary={item.url}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton onClick={() => handleOnDelete(item)} edge="end"
                                                            aria-label="Delete">
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>)
                                    )
                                }

                            </List>
                        </Paper>
                    }
                </Grid>
                <Grid item xs={12}>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        onChange={(e) => uploadPicture(e)}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span" className={classes.button}>
                            Upload
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={createPost} variant="contained" color="primary" className={classes.button}>
                        Post
                    </Button>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Post OK</span>}
                        action={[
                            <Button key="undo" color="secondary" size="small" onClick={handleClose}>
                                OK
                            </Button>,
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={handleClose}
                            >
                                <CloseIcon/>
                            </IconButton>,
                        ]}
                    />
                </Grid>
            </Grid>
        </Container>
    </>)
}

export default PostId