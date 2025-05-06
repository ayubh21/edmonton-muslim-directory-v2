import { GetListings } from "@/app/actions/listing";
import { DataTable } from "@/components/admin/data-table";
import { columns } from "@/components/admin/pending-columns";
import { getListingCountByStatus } from "@/lib/utils";

export default async function PendingListingsPage() {
  const data = await GetListings();
  const pending = getListingCountByStatus(data, "pending");
  console.log(data);
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Pending Approval
          </h1>
          <p className="text-gray-500">
            Review and manage business listings awaiting approval.
          </p>
        </div>
      </div>
      <DataTable columns={columns} data={pending} />
    </div>
  );
}
