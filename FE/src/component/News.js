import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link as RouterLink } from "react-router-dom"
import Cookies from 'universal-cookie';
import { makeStyles } from '@material-ui/core/styles'

import {
    Button,
    Grid,
    Container,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Link,
    Divider,
    CircularProgress

 } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    root: {
        maxWidth: 345,

    },
    mobileText:{

        [theme.breakpoints.down("xs")]: {
            fontSize: 12
        }
    }
  }));


export default function News() {

    const cookies = new Cookies()
    const classes = useStyles();
    const { newsID } = useParams()
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [comment, setComment] = useState([])
    const [info, setInfo] = useState({

        article_id : null,
        title   : null,
        content     : null,
        author_name :  null,
        date :  null
    })


    function tokenCheck(){
  
        let userToken = cookies.get("Login_Token");
  
    
        if(userToken != undefined){
    
          setisLoggedIn(true)
          FetchArtikel();
    
        }else{
            FetchArtikel();

        }
    
    }

    function FetchArtikel() {
        
        axios.get(`http://127.0.0.1:8000/api/artikel-detail/${newsID}`)

        .then(res =>{
        
                setComment(res.data.comments)
                setInfo({

                    article_id :res.data.id,
                    title:res.data.title,
                    content:res.data.text,
                    author_name:res.data.author_name,
                    date : res.data.post_date
 
                })
                

                setLoading(false)
                
        })
        .catch(error => {
            console.log(error.response)
        })

    }

    useEffect(() => {


        tokenCheck()
       

    }, [])


    return (
        <div>
  
            <Container>

            {loading && (
                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 150 }}>
                    <CircularProgress color="secondary"/>
                </Grid>
            )}

            {!loading && (
                <div>
                    <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 100 }}>
                        <Grid item lg={8} xs={12}>
                            <Card style={{ height: '100%' }}>
                                <CardActionArea>
                                <CardContent>
                                    <Typography variant="h6" component="h6">
                                        {info.title}
                                    </Typography>
                                    <br />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        post publish :  {info.date}
                                    </Typography>
                                    <br />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {info.content}
                                    </Typography>
                                    <br />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        author : {info.author_name}
                                    </Typography>
                                    <br />
                                    <Divider />
                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.mobileText}>
                                                        Comments
                                    </Typography>
                                        {comment.map(item =>{   
                                            return(
                                            
                                                <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.mobileText}>
                                                        {item.username}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.mobileText}>
                                                        comment post : {item.comment_date}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.mobileText}>
                                                        {item.text}
                                                    </Typography>
                                                </CardContent>
                                                </CardActionArea>
                                            
                                        )})}

                                </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>

                        
                        {isLoggedIn && (
                        <Grid item lg={8} xs={12}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => { 

                                let userToken = cookies.get("Login_Token");
                                let article_id = info.article_id
                                console.log(article_id)
                                let config = {
                                    
                                    headers : {
                                        
                                        'Authorization' : `Token ${userToken}`
                                }}
                                
                                axios.delete(`http://127.0.0.1:8000/api/artikel-detail/${article_id}`, config)
                                .then((res) => {
                                    // console.log(res)
                                    window.location.href='/'
                        
                                })
                        
                                .catch(error => {
                                    console.log(error.response)

                                })
                            }}
                        >
                            Delete Post
                        </Button>
                        <Link underline='none' component={RouterLink} to={`/write/${newsID}`}>

                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Add Comment
                        </Button>

                        </Link>
                        </Grid> 
                        )}                     
                    </Grid>
                    
                </div>
            )}
            </Container>

        </div>
    )
}

