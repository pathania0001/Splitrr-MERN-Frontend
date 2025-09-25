"use client";

import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ExpenseSummary } from "./components/expense-summary";
import { BalanceSummary } from "./components/balance-summary";
import { GroupList } from "./components/group-list";
import { useGetDashboardDataInGroupsQuery, useGetDashboardDataQuery, useGetPeriodicExpensesQuery } from "@/redux/services";


export default function Dashboard() {

  const { data:periodicExpenses ,isLoading:periodicExpenseLoading} = useGetPeriodicExpensesQuery({},{refetchOnMountOrArgChange:true});
  const { data: groups,isLoading:groupLoading } = useGetDashboardDataInGroupsQuery({},{refetchOnMountOrArgChange : true});
   const {data:balances ,isLoading} = useGetDashboardDataQuery({},{ refetchOnMountOrArgChange: true});
  // const { data: balances, isLoading: balancesLoading } = useConvexQuery(
  //   api.dashboard.getUserBalances
  // );

  // const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(
  //   api.dashboard.getTotalSpent
  // );

  // const { data: monthlySpending, isLoading: monthlySpendingLoading } =
  //   useConvexQuery(api.dashboard.getMonthlySpending);

 
    // balancesLoading ||
    // groupsLoading ||
    // totalSpentLoading ||
    // monthlySpendingLoading;
 //console.log("balances :",periodicExpenses)
  return (
    
    <div className="container mx-auto py-6 space-y-6">
      {isLoading || groupLoading || periodicExpenseLoading ? (
        <div className="w-full py-12 flex justify-center">
          <BarLoader width={"100%"} color="#36d7b7" />
        </div>
      ) : (
        <>
          <div className="flex  justify-between flex-col sm:flex-row sm:items-center gap-4">
            <h1 className="text-5xl gradient-title">Dashboard</h1>
            <Button asChild>
              <Link href="/expenses/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add expense
              </Link>
            </Button>
          </div>

          {/* Balance overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {balances?.data.totalBalance > 0 ? (
                    <span className="text-green-600">
                      +₹{balances?.data.totalBalance.toFixed(2)}
                    </span>
                  ) : balances?.data.totalBalance < 0 ? (
                    <span className="text-red-600">
                      -₹{Math.abs(balances?.data.totalBalance).toFixed(2)}
                    </span>
                  ) : (
                    <span>₹0.00</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {balances?.data.totalBalance > 0
                    ? "You are owed money"
                    : balances?.data.totalBalance < 0
                      ? "You owe money"
                      : "All settled up!"}
                </p>
              </CardContent>
            </Card>


            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  You are owed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ₹{balances?.data?.youAreOwed.toFixed(2)||0.00}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  From {balances?.data.oweDetails?.youAreOwedBy?.length || 0} people
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  You owe
                </CardTitle>
              </CardHeader>
              <CardContent>
                {balances?.data.oweDetails?.youOwe?.length > 0 ? (
                  <>
                    <div className="text-2xl font-bold text-red-600">
                      ₹{balances?.data.youOwe.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      To {balances?.data.oweDetails?.youOwe?.length || 0} people
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">₹0.00</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      You don't owe anyone
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Expense summary */}
              <ExpenseSummary
                monthlySpending={periodicExpenses.data.monthlyExpense}
                totalSpent={periodicExpenses.data.totalExpenses}
              />
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Balance details */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Balance Details</CardTitle>
                    <Button variant="link" asChild className="p-0">
                      <Link href="/contacts">
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <BalanceSummary balances={balances} />
                </CardContent>
              </Card>

              {/* Groups */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Your Groups</CardTitle>
                    <Button variant="link" asChild className="p-0">
                      <Link href="/contacts">
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <GroupList groups={groups.data || []} />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/contacts?createGroup=true">
                      <Users className="mr-2 h-4 w-4" />
                      Create new group
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
