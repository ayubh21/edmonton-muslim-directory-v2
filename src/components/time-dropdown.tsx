import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface OnChangeProps extends React.HTMLAttributes<HTMLSelectElement> {}
export const TimeDropDown: React.FC<OnChangeProps> = ({ ...props }) => {
  const generateTimeSlots = () => {
    const times = [];
    let hour = 0;
    let minute = 0;
    while (hour < 24) {
      const amPm = hour < 12 ? "AM" : "PM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const displayMinute = minute === 0 ? "00" : minute;
      times.push(`${displayHour}:${displayMinute} ${amPm}`);
      minute += 15;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }
    return times;
  };

  return (
    <Select>
      <SelectTrigger className="w-full border-none">
        <SelectValue placeholder="FROM" />
      </SelectTrigger>
      <SelectContent>
        {generateTimeSlots().map((time, index) => (
          <SelectItem key={index} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
