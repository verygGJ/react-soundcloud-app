const initialState = {
  isLogin: false,
  user: {},
  errors: {
    errorStatus: false,
    errorText: '',
    errorFields: []
  }
}

const playList = {
  myPlayListTracks: [],
  myPlayLists: []
}

export function mainState(state = initialState, action) {
  switch (action.type) {
    case 'IS_LOGIN':
      return { 
        isLogin: action.payload,
        user: action.user,
        errors: action.errors
      }

    default:
      return state;
  }
}

export function playListState(state = playList, action) {
  switch (action.type) {
    case 'FETCH_TRACKS_SUCSSES':
      return { myPlayListTracks: action.tracks }

    case 'CREATE_PLAYLIST':
      let newPlaylist = [];
      newPlaylist.push(...state.myPlayLists, { "playlistName": action.payload })
      return { 
        ...state,
        myPlayLists: newPlaylist
      }

    case 'ADD_TO_PLAYLIST':
      let tracksArr = []
      let newArr = state.myPlayLists.filter(item => item.playlistName === action.playlistName) 
      tracksArr = []

      if (newArr[0].tracks) {
        tracksArr.push(...newArr[0].tracks, action.payload)
      } else {
        tracksArr.push(action.payload)
      }
      
      newArr[0]["tracks"] = tracksArr

      return {
        ...state
      }

    case 'REMOVE_IN_PLAYLIST':

        // let checkPlaylist = state.myPlayLists.filter(item => item.playlistName === action.playlistName) 

        console.log(state.myPlayLists)

        // let deletedTrack;
        // state.myPlayLists.forEach(track => {
        //   if (track === action.payload) {
        //     deletedTrack = track
        //     return deletedTrack
        //   } 
        // })
  
        // state.myPlayLists.splice(state.myPlayLists.indexOf(deletedTrack),1)

      // let deletedTrack;
      // state.myPlayListTracks.forEach(track => {
      //   if (track === action.payload) {
      //     deletedTrack = track
      //     return deletedTrack
      //   } 
      // })

      // state.myPlayListTracks.splice(state.myPlayListTracks.indexOf(deletedTrack),1)
      return {
        ...state
      }

    default:
      return state;
  }
}