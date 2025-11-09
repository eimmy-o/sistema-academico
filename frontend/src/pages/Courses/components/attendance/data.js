export const courses = [
  { id: "MAT-101", name: "MAT-101 · Matemáticas I" },
  { id: "FIS-202", name: "FIS-202 · Física II" },
  { id: "PRG-101", name: "PRG-101 · Programación I" },
];

export const studentsByCourse = {
  "MAT-101": [
    { id: "EST-010", name: "Castro Flores, Miguel fernando" },
    { id: "EST-004", name: "Fernández Castro, Eduardo" },
    { id: "EST-001", name: "García Martínez, Ana" },
    { id: "EST-007", name: "Herrera Vega, Isabel" },
    { id: "EST-002", name: "López Pérez, Carlos" },
    { id: "EST-003", name: "Martínez Ruiz, Diana" },
  ],
  "FIS-202": [
    { id: "EST-012", name: "Gutiérrez Mendoza, Roberto" },
    { id: "EST-011", name: "Jiménez Vargas, Patricia" },
  ],
  "PRG-101": [
    { id: "EST-014", name: "Reyes Aguilar, Tomás" },
  ],
};

export const statuses = ["presente", "ausente", "tardanza", "justificado"];

export function todayISO() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}
