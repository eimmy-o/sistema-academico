import React from "react";

export default function StatusBadge({ label, tone = "neutral" }) {
  return (
    <span className={`badge badge--${tone}`} aria-label={`Estado: ${label}`}>
      {label}
    </span>
  );
}
