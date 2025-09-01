import { useEffect, useState } from "react";
import "./Toggle.css";

interface Props {
  title: string;
  startingValue?: boolean;
  onChange: (status: boolean) => void;
}

export default function Toggle({ title, startingValue = false, onChange }: Props) {
  const uniqueId = title + Date.now().toString(16);
  const [currentValue, setCurrentValue] = useState(startingValue);

  useEffect(() => {
    onChange(currentValue);
  }, [currentValue]);

  return (
    <label id={uniqueId} className="toggle-slider">
      <input
        type="checkbox"
        id={uniqueId}
        checked={currentValue}
        onChange={(e) => setCurrentValue(e.target.checked)}
      />

      <span>
        <span></span>
      </span>

      {title}
    </label>
  );
}
