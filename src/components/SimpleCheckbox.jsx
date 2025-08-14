import { useState } from "react";

function SimpleCheckbox({name, value, onChange}) {
  

  return (
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      {name}
    </label>
  );
}

export default SimpleCheckbox;