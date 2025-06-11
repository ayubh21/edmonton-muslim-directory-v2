import { ListingWorkDays } from "@/types/listing";
import WorkHours from "./work-hours";

interface WorkHoursWrapperProps {
  workHours: ListingWorkDays;
}
export default function WorkHoursWrapper({ workHours }: WorkHoursWrapperProps) {
  return <WorkHours workDays={workHours} />;
}
