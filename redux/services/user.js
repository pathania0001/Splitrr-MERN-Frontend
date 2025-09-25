import {createApi} from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './apiInterceptor';

export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:baseQueryWithReauth,
    endpoints:(builder)=>({
        getCurrUser:builder.query({
            query:()=>('/api/v1/users/me')
        }),
        getAllUsers:builder.query({
            query:(search)=>(`/api/v1/users?searchText=${search}`)
        })
    })
})

export const { useGetCurrUserQuery,useLazyGetCurrUserQuery,useGetAllUsersQuery,useLazyGetAllUsersQuery} = userApi; 