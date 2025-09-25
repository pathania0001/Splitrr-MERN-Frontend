const { createApi } = require("@reduxjs/toolkit/query/react");
const { baseQueryWithReauth } = require("./apiInterceptor");

export const settlementApi = createApi({
  reducerPath: "settlementApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Settlement", "Expense"],
  endpoints: (builder) => ({
    createSettlement: builder.mutation({
      query: (body) => ({
        url: "/api/v1/settlement/create",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { payerId, receiverId, groupId }) =>
        [
          "Settlement",
          { type: "Expense", id: payerId },
          { type: "Expense", id: receiverId },
          groupId && { type: "Expense", id: groupId },
          groupId && { type: "Settlement", id: `group-${groupId}` },
        ].filter(Boolean),
    }),

    getSettlementData: builder.query({
      query: (id) => `/api/v1/settlement/person/${id}`,
      providesTags: (result, error, id) => [
        { type: "Settlement", id: `person-${id}` },
        { type: "Expense", id },
      ],
    }),

    getGroupSettlementData: builder.query({
      query: (id) => `/api/v1/settlement/group/${id}`,
      providesTags: (result, error, id) => [
        { type: "Settlement", id: `group-${id}` },
        { type: "Expense", id },
      ],
    }),
  }),
});

export const {
  useCreateSettlementMutation,
  useGetSettlementDataQuery,
  useGetGroupSettlementDataQuery,
  useLazyGetGroupSettlementDataQuery,
  useLazyGetSettlementDataQuery,
} = settlementApi;
