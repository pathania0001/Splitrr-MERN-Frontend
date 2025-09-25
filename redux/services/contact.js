const { createApi } = require("@reduxjs/toolkit/query/react");
const { baseQueryWithReauth } = require("./apiInterceptor");

export const contactApi  = createApi({
    reducerPath:"contactApi",
    baseQuery:baseQueryWithReauth,
    endpoints:(builder)=>({
        getContactedEntities:builder.query({
            query:()=>('/api/v1/contacts')
        })
    })
})

export const { useGetContactedEntitiesQuery } = contactApi