const initialState = {
  myPlayListTracks: []
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


const registersUsersState = {
  registerUsers: [
    {
      name: "admin",
      email: "admin@gmail.com",
      password: "0000",
      id: "12"
    },
    {
      name: "test",
      email: "test@gmail.com",
      password: "0000",
      id: "2232"
    }
  ],
}
export function RegisterUsersState(state = registersUsersState, action) {
  switch (action.type) {
    case 'REGISTRATION':
      let id = { id: action.id };
      let name = { name: action.name };
      let email = { email: action.email };
      let password = { password: action.password };

      let newUser = {}
      newUser = {...id, ...name, ...email, ...password }

      state.registerUsers.push(newUser)
      return {
        ...state
      }
    default:
      return state;
  }
}


const usersState = {
  isLoginState: false,
  isLoginUser: {},
  myPlayListTracks: []
}
export function LoginUsersState(state = usersState, action) {
  switch (action.type) {
    case 'IS_LOGIN':
      state.isLoginUser = action.user;
			return {
        ...state,
        isLoginState: action.isLogin,
      }

    case 'IS_LOGOUT':
      state.isLoginUser = action.user;
			return {
        ...state,
        isLoginState: action.isLogin,
      }
      

    default:
      return state;
  }
}