import {
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALBUMS_FAILURE,
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SEARCH,
} from './actionTypes';

const initialState = {
    loading : false,
    albums : [],
    viewAlbums : [],
    error : ''
}



const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){
        case FETCH_ALBUMS_FAILURE:
            newState.loading = false; 
            newState.error = action.payload;
            break;
        
        case FETCH_ALBUMS_REQUEST: 
            newState.loading = true;
            break;
        case FETCH_ALBUMS_SUCCESS:
            newState.loading = false;
            newState.albums = action.payload;
            newState.viewAlbums = action.payload;
            break;
        case FETCH_ALBUMS_SEARCH:
            console.log("Search key = ",action.payload);
            if(action.payload==="" || action.payload.length===0){
                newState.viewAlbums = newState.albums;
            }
            else{
                var newArray = []
                newState.albums.forEach((album)=>{
                    var newPhotos = [];
                    album["photos"].forEach((photo)=>{
                        if(photo["title"].includes(action.payload)){
                            newPhotos.push(photo);
                        }   
                    })
                    if(newPhotos.length>0){
                        album["photos"] = newPhotos;
                        newArray.push(album);
                    }
                })
                newState.viewAlbums = newArray;
            }
            break;
        default:
            console.log("Action type not defined ",action.type);
            break;
    }
    return newState;
};

export default reducer;