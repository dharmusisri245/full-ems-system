

// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { type User } from "../../api/types/authTypes";

// type AuthState = {
//   user: User | null;
//   token: string | null;
// };

// const storedUser = sessionStorage.getItem("user");
// const storedToken = sessionStorage.getItem("token");

// const initialState: AuthState = {
//   user: storedUser ? JSON.parse(storedUser) : null,
//   token: storedToken || null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (
//       state,
//       action: PayloadAction<{ user: User; token: string }>
//     ) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;

//       sessionStorage.setItem("user", JSON.stringify(action.payload.user));
//       sessionStorage.setItem("token", action.payload.token);
//     },

//     clearCredentials: (state) => {
//       state.user = null;
//       state.token = null;

//       sessionStorage.removeItem("user");
//       sessionStorage.removeItem("token");
//     },

//     setUser: (state, action: PayloadAction<User | null>) => {
//       state.user = action.payload;

//       if (action.payload) {
//         sessionStorage.setItem("user", JSON.stringify(action.payload));
//       } else {
//         sessionStorage.removeItem("user");
//       }
//     },
//   },
// });

// export const { setCredentials, clearCredentials, setUser } = authSlice.actions;
// export default authSlice.reducer;



//========================UPDATED LEATEST VERSION TECHNIQUE================



// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { type User } from "@/api/types/authTypes";
// import { setAccessToken, clearAccessToken } from "../../api/AxiosInstace";

// type AuthState = {
//   user: User | null;
// };

// const initialState: AuthState = {
//   user: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (
//       state,
//       action: PayloadAction<{ user: User; token: string }>
//     ) => {
//       state.user = action.payload.user;
//       setAccessToken(action.payload.token); // only memory token
//     },

//     clearCredentials: (state) => {
//       state.user = null;
//       clearAccessToken();
//     },

//     setUser: (state, action: PayloadAction<User | null>) => {
//       state.user = action.payload;
//     },
//   },
// });

// export const { setCredentials, clearCredentials, setUser } = authSlice.actions;
// export default authSlice.reducer;




import { createSlice, type  PayloadAction } from "@reduxjs/toolkit";
import { type User } from "@/api/types/authTypes";
import { setAccessToken, clearAccessToken } from "@/api/AxiosInstace";

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      setAccessToken(action.payload.token); // memory only
    },

    logout: (state) => {
      state.user = null;
      clearAccessToken(); // remove memory token
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
