import {
  GetRecentlyApprovedListing,
  GetRecentlyCreatedListing,
  GetRecentlyRejectedListing,
} from "@/app/actions/admin";
import { revalidateAll } from "@/app/actions/revalidate";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import moment from "moment";

export async function RecentActivityTable() {
  const lastApproved = await GetRecentlyApprovedListing();
  const lastCreated = await GetRecentlyCreatedListing();
  const lastRejected = await GetRecentlyRejectedListing();
  const activities = [
    {
      id: 1,
      action: "Listing Approved",
      business: lastApproved.title,
      user: "test",
      time: moment(lastApproved.updatedAt).startOf("seconds").fromNow(),
      status: "approved",
    },
    {
      id: 2,
      action: "New Listing Submitted",
      business: lastCreated.title,
      user: "test",
      time: moment(lastCreated.createdAt).startOf("seconds").fromNow(),
      status: "pending",
    },
    {
      id: 3,
      action: "Listing Rejected",
      business: lastRejected.title,
      user: "test",
      time: moment(lastRejected.updatedAt).startOf("seconds").fromNow(),
      status: "rejected",
    },
  ];

  // const data = await Get;
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-2 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
        >
          <div className="mt-0.5">
            {activity.status === "approved" && (
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-3.5 w-3.5 text-green-600" />
              </div>
            )}
            {activity.status === "rejected" && (
              <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-3.5 w-3.5 text-red-600" />
              </div>
            )}
            {activity.status === "pending" && (
              <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="h-3.5 w-3.5 text-amber-600" />
              </div>
            )}
            {activity.status === "report" && (
              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                <AlertCircle className="h-3.5 w-3.5 text-blue-600" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{activity.action}</p>
            <p className="text-xs text-gray-500">
              {activity.business} • {activity.user} • {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
