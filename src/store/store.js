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

    case 'ADD_TO_PLAYLIST':
      let newArr = [];
      newArr.push(...state.myPlayListTracks, action.payload)
      return {
        ...state,
        myPlayListTracks: newArr
      }

    case 'REMOVE_IN_PLAYLIST':
      let deletedTrack;
      state.myPlayListTracks.forEach(track => {
        if (track === action.payload) {
          deletedTrack = track
          return deletedTrack
        } 
      })

      state.myPlayListTracks.splice(state.myPlayListTracks.indexOf(deletedTrack),1)
      return {
        ...state
      }

    default:
      return state;
  }
}