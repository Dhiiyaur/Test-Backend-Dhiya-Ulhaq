import React, { useState } from 'react'
import axios from 'axios';
import { apiLogin } from "../endpoint";
import { useParams, Link as RouterLink } from "react-router-dom"

import { 
    Avatar,
    Button,
    CssBaseline,
    Container,
    TextField,
    Typography,

} from "@material-ui/core";

import NoteAddIcon from '@material-ui/icons/NoteAdd';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import Cookies from 'universal-cookie';

import {MuiThemeProvider, createMuiTheme } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
      
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


function AddComment() {

    const classes = useStyles();
    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
    const cookies = new Cookies()
    const { newsID } = useParams()

    const theme = createMuiTheme({
        palette:{

            type:'dark'
        }

    })

    const onSubmitLogin = data => {

        let userID = cookies.get("Login_ID");
        let userToken = cookies.get("Login_Token");

        axios.post(`http://127.0.0.1:8000/api/artikel-detail/${newsID}/comment`,{

            title   : newsID,
            text    : data.content,
            name    : userID,
        },
        {
            headers : {
                                                                        
                'Authorization' : `Token ${userToken}`
        }

        })
        
        .then((res) => {

            console.log(res)
            window.location.href=`/news/${newsID}`

        })

        .catch(error => {
            console.log(error.response)
            
        })
    
        
    }

    return (
        <div>
            
            <Container component="main" maxWidth="md" style={{ marginTop : 200 }}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <NoteAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color="textPrimary">
                    Add Comment
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmitLogin)}>

                <Controller
                    name='content'
                    as={

                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        name="content"
                        label="content"
                        type="content"
                        id="content"
                    />
                    }

                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Required'
                      }}
                />
                
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    
                >
                    Post
                </Button>

                </form>
            </div>
            </Container>


        </div>
    )
}

export default AddComment