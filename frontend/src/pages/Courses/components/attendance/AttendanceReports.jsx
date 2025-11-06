
export default function AttendanceReports() {
  // Mock: números de ejemplo
  const totals = { present: 7, absent: 1, late: 2, justified: 1, all: 11 };
  const byCourse = [
    { course: "MAT-101 · Matemáticas I", present: 3, total: 5 },
    { course: "FIS-202 · Física II", present: 2, total: 3 },
    { course: "PRG-101 · Programación I", present: 2, total: 3 },
  ];

  return (
    <section className="card">
      <h2 className="h2">Reporte general de asistencias</h2>

      <div className="cards">
        <div className="stat">
          <div className="ctitle">Presentes</div>
          <div className="cnum">{totals.present}</div>
          <div className="csub">{pct(totals.present, totals.all)} del total</div>
        </div>
        <div className="stat red">
          <div className="ctitle">Ausentes</div>
          <div className="cnum">{totals.absent}</div>
          <div className="csub">{pct(totals.absent, totals.all)} del total</div>
        </div>
        <div className="stat yellow">
          <div className="ctitle">Tardanzas</div>
          <div className="cnum">{totals.late}</div>
          <div className="csub">{pct(totals.late, totals.all)} del total</div>
        </div>
        <div className="stat info">
          <div className="ctitle">Justificados</div>
          <div className="cnum">{totals.justified}</div>
          <div className="csub">{pct(totals.justified, totals.all)} del total</div>
        </div>
      </div>

      <h3 className="h3">Estadísticas por curso</h3>
      <div className="course-list">
        {byCourse.map((c, i) => (
          <div className="course-line" key={i}>
            <div className="cname">{c.course}</div>
            <div className="progress">
              <div className="bar" style={{ width: `${pctNum(c.present, c.total)}%` }} />
            </div>
            <div className="ctag">{pctNum(c.present, c.total)}%</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function pct(a, b){ return `${Math.round((a/b)*100)}%` }
function pctNum(a,b){ return Math.round((a/b)*100) }

