import { StringifyOptions } from "querystring";

type CheckboxProps = {
  label: string;
  onCheckBoxChange: () => void;
  value: string;
  isSelected: boolean;
  className: string;
  type: string;
};
export const Checkbox = ({
  label,
  value,
  isSelected,
  onCheckBoxChange,
  className,
  type,
}: CheckboxProps) => {
  return (
    <label>
      <input
        type={type}
        value={value}
        checked={isSelected}
        onChange={onCheckBoxChange}
        className={className}
      />
      {label}
    </label>
  );
};
