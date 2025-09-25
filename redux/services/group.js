const { createApi } = require("@reduxjs/toolkit/query/react");
const { baseQueryWithReauth } = require("./apiInterceptor");


export const groupApi = createApi({
    reducerPath:"groupApi",
    baseQuery:baseQueryWithReauth,
    endpoints:(builder)=>({
        createGroup : builder.mutation({
            query:(body)=>({
                url:"/api/v1/group/create",
                method:"POST",
                body
            })
        }),
        getAllGroups : builder.query({
            query:()=>(`/api/v1/group`)
        }),
    })
})

export const {
     useCreateGroupMutation,
     useGetAllGroupsQuery,
} = groupApi;