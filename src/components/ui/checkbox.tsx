type CheckboxProps = {
  label: string;
  onCheckBoxChange: () => void;
  value: string;
  isSelected: boolean;
  className: string;
};
export const Checkbox = ({
  label,
  value,
  isSelected,
  onCheckBoxChange,
  className,
}: CheckboxProps) => {
  return (
    <label>
      <input
        type="radio"
        value={value}
        checked={isSelected}
        onChange={onCheckBoxChange}
        className={className}
      />
      {label}
    </label>
  );
};
