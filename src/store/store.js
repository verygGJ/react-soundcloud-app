const initialState = {
  myPlayListTracks: []
}

export default function PlaylistState(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_PLAYLIST':
      let newArr = [];
      newArr.push(...state.myPlayListTracks, action.payload)
      return {
        ...state,
        myPlayListTracks: newArr
      }
    default:
      return state;
  }
}