import React from "react";
// InfoRow.jsx
export default function InfoRow({
  label,
  name,
  value,
  editable = false,
  type = "text",
  onChange,
  full = false,
  isLink = false,
}) {
  return (
    <div className={`info ${full ? "info--full" : ""}`}>
      <div className="info__label">{label}</div>
      <div className="info__value">
        {editable ? (
          <input
            className="input"
            name={name}
            type={type}
            value={value ?? ""}
            onChange={(e) => onChange(name, e.target.value)}
          />
        ) : isLink ? (
          <a href={`mailto:${value}`} className="info__value--link">{value}</a>
        ) : (
          <span>{value}</span>
        )}
      </div>
    </div>
  );
}

