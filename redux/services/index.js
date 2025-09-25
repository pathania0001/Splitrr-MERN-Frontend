const  { useGetDashboardDataQuery,useGetDashboardDataInGroupsQuery } = require('./dashboard') ;

const { 
    useLoginUserMutation,
    useLogoutUserMutation,
    useRefreshAuthTokensMutation,
    useSignupUserMutation } = require('./auth')

const { 
        useGetCurrUserQuery,
        useLazyGetCurrUserQuery,
        useGetAllUsersQuery,
        useLazyGetAllUsersQuery} = require("./user");

const { 
    useCreateExpenseMutation,
    useGetExpenseWithUserQuery,
    useGetUserExpensesQuery,
    useGetExpenseWithGroupQuery,
    useGetPeriodicExpensesQuery,
    useDeleteExpenseMutation
} = require("./expense")

const { useCreateGroupMutation, useGetAllGroupsQuery } = require('./group')

const { useGetContactedEntitiesQuery } = require("./contact")

const {
    useCreateSettlementMutation,
    useGetSettlementDataQuery,
    useGetGroupSettlementDataQuery,
    useLazyGetGroupSettlementDataQuery,
    useLazyGetSettlementDataQuery} = require('./settlement');


export {
    useLoginUserMutation,
    useLogoutUserMutation,
    useRefreshAuthTokensMutation,
    useSignupUserMutation,
    useGetCurrUserQuery,
    useLazyGetCurrUserQuery,
    useGetAllUsersQuery,
    useLazyGetAllUsersQuery,
    useCreateExpenseMutation,
    useGetExpenseWithGroupQuery,
    useGetExpenseWithUserQuery,
    useGetUserExpensesQuery,
    useCreateGroupMutation,
    useGetAllGroupsQuery,
    useGetContactedEntitiesQuery,
    useCreateSettlementMutation,
    useGetSettlementDataQuery,
    useGetGroupSettlementDataQuery,
    useLazyGetGroupSettlementDataQuery,
    useLazyGetSettlementDataQuery,
    useGetDashboardDataQuery,
    useGetDashboardDataInGroupsQuery,
    useGetPeriodicExpensesQuery,
    useDeleteExpenseMutation
 }