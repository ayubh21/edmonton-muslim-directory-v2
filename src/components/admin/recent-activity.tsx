import {
  GetRecentlyApprovedListing,
  GetRecentlyCreatedListing,
  GetRecentlyRejectedListing,
} from "@/app/actions/admin";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import moment from "moment";

export async function RecentActivityTable() {
  const lastApproved = await GetRecentlyApprovedListing();
  const lastCreated = await GetRecentlyCreatedListing();
  const lastRejected = await GetRecentlyRejectedListing();

  if (!lastApproved) return null;
  if (!lastRejected) return null;

  const activities = [
    {
      id: 1,
      action: "Listing Approved",
      business: lastApproved![0].title ?? "",
      user: "test",
      time: moment(lastApproved![0].updatedAt).startOf("seconds").fromNow(),
      status: "approved",
    },
    {
      id: 2,
      action: "New Listing Submitted",
      business: lastCreated[0].title ?? "",
      user: "test",
      time: moment(lastCreated[0].createdAt).startOf("seconds").fromNow(),
      status: "pending",
    },
    {
      id: 3,
      action: "Listing Rejected",
      business: lastRejected?.[0] ?? "",
      user: "test",
      time: lastRejected![0].updatedAt
        ? moment(lastRejected[0]!.updatedAt).startOf("seconds").fromNow()
        : "",
      status: "rejected",
    },
  ];

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
            <span className="text-xs text-gray-500">
              {activity.user} • {activity.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
