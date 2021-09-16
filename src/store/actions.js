import axios from 'axios';
import {
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALBUMS_FAILURE,
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SEARCH
} from './actionTypes';

export const fetchAlbums = () =>{
    return (dispatch) =>{
        dispatch(fetchAlbumsRequest());
        axios.get('https://jsonplaceholder.typicode.com/albums').then(response=>{
            const albums = response.data;
            axios.get('https://jsonplaceholder.typicode.com/photos').then((response)=>{
                var photos = response.data;

                var mergedAlbums = [];

                albums.forEach(album=>{
                    album["photos"] = [];
                    var i = 0;
                    photos.forEach(photo=>{
                        if(album["id"]===photo["albumId"] && (i<10)){
                            photo["price"] = Math.floor(Math.random() * (250 - 50) + 50);
                            album["photos"].push(photo);
                            i = i + 1;
                        }
                    })
                    mergedAlbums.push(album);
                })

                dispatch(fetchAlbumsSuccess(mergedAlbums));
            }).catch((err)=>{throw err;})
        }).catch((err)=>{
            console.error(err);
            dispatch(fetchAlbumsFailure(err.message));
        })
    }
}

export const fetchAlbumsRequest = () =>{
    return {
        type : FETCH_ALBUMS_REQUEST
    }
}

export const fetchAlbumsSuccess = (albums) =>{
    return {
        type : FETCH_ALBUMS_SUCCESS,
        payload : albums
    }
}

export const fetchAlbumsFailure = error =>{
    return {
        type : FETCH_ALBUMS_FAILURE,
        payload : error
    }
}

export const fetchAlbumsSearch = (searchKey) =>{
    return {
        type : FETCH_ALBUMS_SEARCH,
        payload : searchKey
    }
} 