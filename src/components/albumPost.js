import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import {Grid,Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      margin: 'auto',
      maxWidth: "100%",
    },
    image: {
      width: 48,
      height: 48,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));
  
function AlbumPost({img_url,name,price}) {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <Grid container spacing={2} xs={12}>  
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={img_url} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" style={{fontWeight:"600",fontSize:16}}>
                    {name}
                  </Typography>
                  <a  style={{color:"#91919F",fontSize:"12.8px"}} target="_blank" href={img_url}>{img_url}</a>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" style={{color:price>75?"#008000":"red",fontSize:16,fontWeight:"600"}}>$ {price}</Typography>
                <p style={{color:"#91919F",fontSize:"12.8px",fontFamily:"sans-serif"}}>10:00 AM</p>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  export default AlbumPost;