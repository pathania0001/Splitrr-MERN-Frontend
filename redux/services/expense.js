import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiInterceptor";

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Expense"],
  endpoints: (builder) => ({
    createExpense: builder.mutation({
      query: (body) => ({
        url: "/api/v1/expense/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Expense"],
    }),

    getUserExpenses: builder.query({
      query: () => '/api/v1/expense/user-expenses',
      providesTags: ["Expense"],
    }),

    getExpenseWithUser: builder.query({
      query: (id) => `/api/v1/expense/person/${id}`,
      providesTags: (result, error, id) => [{ type: "Expense", id }],
    }),

    getExpenseWithGroup: builder.query({
      query: (id) => `/api/v1/expense/group/${id}`,
      providesTags: (result, error, id) => [{ type: "Expense", id }],
    }),
    getPeriodicExpenses:builder.query({
      query:()=>('/api/v1/expense/periodic-expenses'),
      providesTags: ["Expense"],
    }),
    deleteExpense:builder.mutation({
      query:({expenseId})=>({
        url:`/api/v1/expense/${expenseId}`,
        method: "DELETE",
  }),
  invalidatesTags: ["Expense"],
    })
  }),
});

export const {
  useCreateExpenseMutation,
  useGetUserExpensesQuery,
  useGetExpenseWithUserQuery,
  useGetExpenseWithGroupQuery,
  useGetPeriodicExpensesQuery,
  useDeleteExpenseMutation
} = expenseApi;
