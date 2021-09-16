import React, { useEffect } from 'react'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { connect } from "react-redux";
import {Box,Container,FormControl,OutlinedInput,InputAdornment} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { fetchAlbums,fetchAlbumsSearch } from '../store/actions';
import AlbumPost from './albumPost';

function albumsContainer ({albumData,fetchAlbums,fetchAlbumsSearch}){

    useEffect(()=>{fetchAlbums()},[]);
    console.log("Album Data = ",albumData);
    return (
        <Box>
          <Container maxWidth="lg" style={{padding:"20px"}}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      placeholder={"See your financial report"}
                      endAdornment={<InputAdornment><ChevronRightIcon color={"#ac80ff"}/></InputAdornment>}
                      style={{backgroundColor:"#EEE5FF"}}
                      size="sm"
                      onChange={(evt)=>{fetchAlbumsSearch(evt.target.value)}}
                    />  
                </FormControl>
            </Grid>
          </Grid>
          <Box>
              <div>
                  {
                      albumData.loading ? 
                      <h1>Loading...</h1> 
                      : 
                      albumData.error ? 
                      <h2>{albumData.error}</h2>
                      :
                      ( 
                          (albumData)&&
                          (albumData.viewAlbums) &&
                           albumData.viewAlbums.map((album,index)=>{
                            return (
                                <div key={index}>
                                    <h3>{album["title"]}</h3>
                                    {
                                        album["photos"].map((photo,index)=>{
                                            return <AlbumPost key={index} img_url={photo["url"]} name={photo["title"]} price={photo["price"]}/>
                                        })
                                    }
                                </div>
                                
                            )
                          })
                      )
                  }
                  
              </div>
          </Box>
          </Container>
        </Box>
      );
}

const mapStateToProps = state =>{
    return {
        albumData : state,
    }
}

const mapDispachToProps = dispatch => {
    return {
      fetchAlbums : () => dispatch(fetchAlbums()),
      fetchAlbumsSearch : (key)=>dispatch(fetchAlbumsSearch(key))
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(albumsContainer);

