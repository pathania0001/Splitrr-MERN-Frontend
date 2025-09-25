import { configureStore } from "@reduxjs/toolkit";

import {userApi} from "./services/user"
import {authApi} from "./services/auth"
import { authReducer } from "./slices";
import { expenseApi } from "./services/expense";
import { groupApi } from "./services/group";
import { contactApi } from "./services/contact";
import { settlementApi } from "./services/settlement";
import { dashboardApi } from "./services/dashboard";
const store = configureStore({
    reducer:{
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [expenseApi.reducerPath]:expenseApi.reducer,
        [groupApi.reducerPath]:groupApi.reducer,
        [contactApi.reducerPath]:contactApi.reducer,
        [settlementApi.reducerPath]:settlementApi.reducer,
        [dashboardApi.reducerPath]:dashboardApi.reducer,
        auth:authReducer,
    },
    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware()
         .concat(userApi.middleware)
         .concat(authApi.middleware)
         .concat(expenseApi.middleware)
         .concat(groupApi.middleware)
         .concat(contactApi.middleware)
         .concat(settlementApi.middleware)
         .concat(dashboardApi.middleware)

});

export default store