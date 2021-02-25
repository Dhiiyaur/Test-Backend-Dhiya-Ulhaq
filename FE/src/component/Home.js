import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { apiProductList } from "../endpoint";

import {
    Grid,
    Container,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Link,
    CircularProgress

 } from '@material-ui/core'

import { Link as RouterLink } from "react-router-dom"
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';


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

export default function Home() {

    const [artikelData, setartikelData] = useState([])
    const [loading, setLoading] = useState(true)
    const classes = useStyles();
    const theme = createMuiTheme({
        palette:{

            type:'light'
        }

    })

    useEffect(() => {

        let mounted = true;

        async function fetchData(){
            const artikelData = await axios.get('http://127.0.0.1:8000/api/artikel');
            if(mounted){
                console.log(artikelData.data)
                setartikelData(artikelData.data)
                setLoading(false)

            }
        }

        fetchData()
        
        return () => mounted = false;

    }, [])

    const ArtikelList = (

        <div>
            
            {loading && (
                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 100 }}>
                    <CircularProgress color="secondary"/>
                </Grid>
            )}
            {!loading && (
                <div>
                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 120 ,marginBottom :30 }}>
                    <Typography variant="h5" color="textSecondary" component="h5">
                        KOMPAS NEWS
                    </Typography>
                </Grid>
                <Grid container spacing={3} m={2} justify='center'>
                {artikelData.map(item =>{
                
                    return(
                    <Grid item lg={3} xs={6}>
                    <Card className={classes.root} style={{ height: '100%' }}>
                        <CardActionArea>
                        <Link underline='none' component={RouterLink} to={`/news/${item.id}`}>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.mobileText}>
                                Judul : {item.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.mobileText}>
                                post publish : {item.post_date}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.mobileText}>
                                Author : {item.author_name}
                            </Typography>
                        </CardContent>
                        </Link>
                        </CardActionArea>
                    </Card>
                    </Grid>
                )})}
                </Grid>
                </div>
            )}
        </div>
    )

    return (
        <div>
            

            <Container>    
                {ArtikelList}
            </Container>

        </div>
    )
}
