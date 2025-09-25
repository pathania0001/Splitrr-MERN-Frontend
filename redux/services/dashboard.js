const { createApi } = require("@reduxjs/toolkit/query/react");
const { baseQueryWithReauth } = require("./apiInterceptor");

export const dashboardApi = createApi({
    reducerPath:"dashboardApi",
    baseQuery:baseQueryWithReauth,
    endpoints:(builder)=>({
        getDashboardData : builder.query({
            query:()=>('api/v1/dashboard/balances')
        }),
        getDashboardDataInGroups : builder.query({
            query:()=>('api/v1/dashboard/balance-in-groups')
        })
    })
})

export const { useGetDashboardDataQuery,useGetDashboardDataInGroupsQuery } = dashboardApi;