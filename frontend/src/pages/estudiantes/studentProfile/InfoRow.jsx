import React from "react";

export default function InfoRow({ label, value, isLink = false, full = false }) {
  const content = isLink ? (
    <a href={`mailto:${value}`} className="info__value info__value--link">
      {value}
    </a>
  ) : (
    <span className="info__value">{value}</span>
  );

  return (
    <div className={`info ${full ? "info--full" : ""}`}>
      <span className="info__label">{label}</span>
      {content}
    </div>
  );
}
