interface CustomFieldProps {
  label: string;
  type?: string;
  value: number;
  min?: number;
  step?: number;
  onChange: (value: number) => void;
}

const CustomField: React.FC<CustomFieldProps> = ({
  label,
  // type = "text", // use text so commas display
  value,
  min,
  step,
  onChange,
}) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type="text" // use text instead of number
        inputMode="numeric" // shows numeric keyboard on mobile
        value={value || value === 0 ? value.toLocaleString("en-IN") : ""}
        min={min}
        step={step}
        onChange={(e) => {
          const rawValue = e.target.value.replace(/,/g, ""); // remove commas
          const numeric = rawValue === "" ? 0 : Number(rawValue);
          onChange(numeric);
        }}
      />
    </div>
  );
};

export default CustomField;
