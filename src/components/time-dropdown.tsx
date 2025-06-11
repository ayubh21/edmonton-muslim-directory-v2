import React from "react";

type OnChangeProps = React.HTMLAttributes<HTMLSelectElement>;
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
    <select {...props}>
      {generateTimeSlots().map((time, index) => (
        <option key={index} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};
