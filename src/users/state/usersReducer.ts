// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getList } from "redux/api/getList";
// import { FirebaseTimestamp } from "types";
// import { RootState } from "redux/Reducers/RootReducer";
// import firebase from "misc/firebase";
// import { createOne } from "../../redux/api/createOne";
// import { updateOne } from "../../redux/api/updateOne";
// import { IUserRecord } from "users/UserTypes";

// type Returned = IUserRecord[];

// interface data {
//   [name: string]: any;
// }

// export interface IUserState {
//   data: data;
//   loading: boolean | null;
//   error: boolean | null;
//   success: boolean | null;
//   loadedAt: FirebaseTimestamp | null;
// }

// const fetchUserList = createAsyncThunk(
//   "users/fetchList",
//   async (props: undefined, thunkApi) => {
//     const response = await getList({
//       resource: "users",
//       lastLoadedAt: null,
//     });
//     return response;
//   }
// );

// interface createUserProps {
//   name: string;
//   isAdmin?: boolean;
//   email: string;
//   id: string;
// }

// const createUserAction = createAsyncThunk(
//   "users/create",
//   async (props: createUserProps, thunkApi) => {
//     const response = await createOne({
//       resource: "users",
//       id: props.id,
//       data: { ...props },
//     });
//     return response;
//   }
// );

// interface updateUserProps {
//   name: string;
//   isAdmin?: boolean;
//   email: string;
//   id: string;
// }

// const updateUserAction = createAsyncThunk(
//   "users/update",
//   async (props: updateUserProps, thunkApi) => {
//     const response = await updateOne({
//       resource: "users",
//       id: props.id,
//       data: { ...props },
//     });
//     return response;
//   }
// );

// const initialState: IUserState = {
//   data: {},
//   loading: null,
//   error: null,
//   success: null,
//   loadedAt: null,
// };

// const userSlice = createSlice({
//   name: "Users",
//   initialState: initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserList.pending, (state, action) => {
//         state.loading = true;
//       })
//       .addCase(fetchUserList.fulfilled, (state, action) => {
//         action.payload.forEach((user) => {
//           state.data[user.id] = user;
//         });
//         state.loadedAt = firebase.firestore.Timestamp.now();
//       })
//       .addCase(createUserAction.fulfilled, (state, action) => {
//         state.data[action.meta.arg.id] = {
//           ...action.meta.arg,
//           isAdmin: !!action.meta.arg.isAdmin,
//         };
//       })
//       .addCase(updateUserAction.fulfilled, (state, action) => {
//         state.data[action.meta.arg.id] = {
//           ...action.meta.arg,
//           isAdmin: !!action.meta.arg.isAdmin,
//         };
//       });
//   },
// });

// export { fetchUserList, createUserAction, updateUserAction };

// export default userSlice.reducer;

export {};
