"use client";

import { useParams, useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";
import SettlementForm from "./components/settlement-form";
import { useGetGroupSettlementDataQuery, useGetSettlementDataQuery } from "@/redux/services";

export default function SettlementPage() {
  const params = useParams();
  const router = useRouter();
  const { type, id } = params;

 const {
  data: userData,
  isLoading: userLoading,
  isSuccess: userSuccess
} = useGetSettlementDataQuery(id, {
  skip: type !== "user",
  refetchOnMountOrArgChange:true
});

const {
  data: groupData,
  isLoading: groupLoading,
  isSuccess: groupSuccess
} = useGetGroupSettlementDataQuery(id, {
  skip: type !== "group",
  refetchOnMountOrArgChange:true
});
  const isLoading = type === "user" ? userLoading : groupLoading;
  const isSuccess = type === "user" ? userSuccess : groupSuccess;
  const data = type === "user" ? userData : groupData;

  const fetchedSettlementdata = isSuccess && data?.data ? data.data : null;

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }
  // let fetchedSettlementdata;
  // isSuccess && (data?.data) && (fetchedSettlementdata = data.data);
  // console.log("fetcheddtaa ",fetchedSettlementdata)
  // Function to handle after successful settlement creation
  const handleSuccess = () => {
    // Redirect based on type
    if (type === "user") {
      router.push(`/person/${id}`);
    } else if (type === "group") {
      router.push(`/groups/${id}`);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-lg">
      <Button
        variant="outline"
        size="sm"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="mb-6">
        <h1 className="text-5xl gradient-title">Record a settlement</h1>
        <p className="text-muted-foreground mt-1">
          {type === "user"
            ? `Settling up with ${fetchedSettlementdata?.counterpart?.name}`
            : `Settling up in ${fetchedSettlementdata?.group?.name}`}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            {type === "user" ? (
              <Avatar className="h-10 w-10">
                <AvatarImage src={fetchedSettlementdata?.counterpart?.imageUrl} />
                <AvatarFallback>
                  {fetchedSettlementdata?.counterpart?.name?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="bg-primary/10 p-2 rounded-md">
                <Users className="h-6 w-6 text-primary" />
              </div>
            )}
            <CardTitle>
              {type === "user" ? fetchedSettlementdata?.counterpart?.name : fetchedSettlementdata?.group?.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <SettlementForm
            entityType={type}
            entityData={fetchedSettlementdata}
            onSuccess={handleSuccess}
          />
        </CardContent>
      </Card>
    </div>
  );
}
