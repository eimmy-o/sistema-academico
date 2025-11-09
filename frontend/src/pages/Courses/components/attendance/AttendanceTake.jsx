import { useEffect, useMemo, useState } from "react"
import { courses, studentsByCourse, todayISO } from "./data"
import { saveAttendanceLocal, loadAttendanceLocal, clearAttendanceLocal } from "../../../../services/attendanceLocal"

export default function AttendanceTake() {
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "")
  const [date, setDate] = useState(todayISO())
  const [notes, setNotes] = useState({})
  // "presente" | "ausente" | "tardanza"
  const [stateMap, setStateMap] = useState({})
  const [loadedFromLocal, setLoadedFromLocal] = useState(false)

  const students = studentsByCourse[courseId] ?? []

  // Cargar guardado si existe, si no inicializar en "presente"
  useEffect(() => {
    const saved = loadAttendanceLocal(courseId, date)
    if (saved?.records?.length) {
      const map = {}
      const nmap = {}
      saved.records.forEach(r => {
        map[r.studentId] = r.status
        nmap[r.studentId] = r.note || ""
      })
      setStateMap(map)
      setNotes(nmap)
      setLoadedFromLocal(true)
    } else {
      const init = {}
      students.forEach(s => { init[s.id] = "presente" })
      setStateMap(init)
      setNotes({})
      setLoadedFromLocal(false)
    }
  }, [courseId, date, students])

  const counters = useMemo(() => {
    const base = { total: students.length, presente: 0, ausente: 0, tardanza: 0, sin: 0 }
    students.forEach(s => {
      const st = stateMap[s.id]
      if (!st) base.sin += 1
      else base[st] += 1
    })
    return base
  }, [students, stateMap])

  const setStatus = (studentId, st) =>
    setStateMap(prev => ({ ...prev, [studentId]: st }))

  const marcarTodos = st => {
    if (!students.length) return
    const next = {}
    students.forEach(s => { next[s.id] = st })
    setStateMap(next)
  }

  const saveAttendance = () => {
    if (!courseId || !students.length) {
      alert("Selecciona un curso válido")
      return
    }
    const records = students.map(s => ({
      studentId: s.id,
      status: stateMap[s.id] || null,
      note: (notes[s.id] || "").slice(0, 200)
    }))
    const res = saveAttendanceLocal({ courseId, date, records })
    alert(`Asistencias guardadas localmente ${res.saved}`)
    setLoadedFromLocal(true)
  }

  const clearSaved = () => {
    clearAttendanceLocal(courseId, date)
    alert("Guardado local eliminado")
    setLoadedFromLocal(false)
  }

  return (
    <section className="card">
      <h2 className="stitle">Tomar asistencia</h2>

      <div className="filters">
        <div className="fgroup">
          <label className="flabel">Curso</label>
          <select value={courseId} onChange={e => setCourseId(e.target.value)}>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.code ? `${c.code} · ${c.name} ${c.parallel ?? ""}` : c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="fgroup">
          <label className="flabel">Fecha</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <div className="fgroup">
          <label className="flabel">Acciones rápidas</label>
          <div className="quick-actions">
            <button className="btn ghost" onClick={() => marcarTodos("presente")}>
              Todos presentes
            </button>
            <button className="btn ghost" onClick={() => marcarTodos("ausente")}>
              Todos ausentes
            </button>
          </div>
        </div>

        <div className="fgroup">
          <label className="flabel">Resumen</label>
          <div className="chips">
            <span className="chip success">Presentes {counters.presente}</span>
            <span className="chip error">Ausentes {counters.ausente}</span>
            <span className="chip warning">Tardanzas {counters.tardanza}</span>
            <span className="chip gray">Sin marcar {counters.sin}</span>
            <span className="chip gray">Total {counters.total}</span>
          </div>
        </div>
      </div>

      {loadedFromLocal && (
        <div className="chips" style={{ marginTop: 0 }}>
          <span className="chip gray">Cargado desde guardado local</span>
          <button className="btn ghost" onClick={clearSaved}>Eliminar guardado</button>
        </div>
      )}

      <div className="list-head">
        <div>Lista de estudiantes {students.length}</div>
        <button className="btn primary" onClick={saveAttendance}>
          Guardar asistencias
        </button>
      </div>

      <ul className="slist">
        {students.map((s, i) => (
          <li className="srow" key={s.id}>
            <div className="snum">{i + 1}</div>

            <div className="sname">
              <div className="sname-title">{s.name}</div>
              <div className="sname-sub">{s.code ?? s.id}</div>
            </div>

            <div className="sactions">
              <StateBtn
                label="Presente"
                on={() => setStatus(s.id, "presente")}
                active={stateMap[s.id] === "presente"}
                tone="success"
              />
              <StateBtn
                label="Ausente"
                on={() => setStatus(s.id, "ausente")}
                active={stateMap[s.id] === "ausente"}
                tone="error"
              />
              <StateBtn
                label="Tardanza"
                on={() => setStatus(s.id, "tardanza")}
                active={stateMap[s.id] === "tardanza"}
                tone="warning"
              />
            </div>

            <div className="snote">
              <input
                placeholder="Observaciones..."
                value={notes[s.id] || ""}
                onChange={e => setNotes(n => ({ ...n, [s.id]: e.target.value }))}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function StateBtn({ label, on, active, tone }) {
  return (
    <button className={`sbtn ${tone} ${active ? "active" : ""}`} onClick={on}>
      {label}
    </button>
  )
}
