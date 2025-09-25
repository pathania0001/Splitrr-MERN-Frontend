import {createApi} from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './apiInterceptor';

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:baseQueryWithReauth,
    endpoints:(builder)=>({
        loginUser:builder.mutation({
            query:(body)=>({
                url:"auth/login",
                method:'POST',
                body,
            })
        }),
        signupUser:builder.mutation({
            query:(body)=>({
                url:"auth/signup",
                method:"POST",
                body
            })
        }),
        refreshAuthTokens:builder.mutation({
            query:(body)=>({
                url:"auth/refresh",
                method:"POST"
            })
        }),
        logoutUser:builder.mutation({
            query:(token)=>({
               url: "auth/logout",
                method: "POST"
            })
        }),
    })
})

export const { 
    useLoginUserMutation,
    useLogoutUserMutation,
    useRefreshAuthTokensMutation,
    useSignupUserMutation
} = authApi;