const initialState = {
  myPlayListTracks: [],
  isLogin: false
}

export function PlaylistState(state = initialState, action) {
  switch (action.type) {
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