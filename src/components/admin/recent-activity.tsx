import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

export function RecentActivityTable() {
  const activities = [
    {
      id: 1,
      action: "Listing Approved",
      business: "Sabzy Persian Grill",
      user: "Admin",
      time: "2 hours ago",
      status: "approved",
    },
    {
      id: 2,
      action: "New Listing Submitted",
      business: "Barakah Cafe",
      user: "Ahmed S.",
      time: "4 hours ago",
      status: "pending",
    },
    {
      id: 3,
      action: "Listing Rejected",
      business: "Generic Business",
      user: "Admin",
      time: "Yesterday",
      status: "rejected",
    },
    {
      id: 4,
      action: "Listing Updated",
      business: "Shifa Medical Clinic",
      user: "Fatima K.",
      time: "Yesterday",
      status: "pending",
    },
    {
      id: 5,
      action: "Report Received",
      business: "Al-Noor Grocery",
      user: "User123",
      time: "2 days ago",
      status: "report",
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
            <p className="text-xs text-gray-500">
              {activity.business} • {activity.user} • {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
