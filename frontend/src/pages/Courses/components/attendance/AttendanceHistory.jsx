import { useMemo, useState } from 'react'
import { courses, studentsByCourse } from './data'
import { listAllAttendanceLocal } from '../../../../services/attendanceLocal'

export default function AttendanceHistory() {
  const [courseId, setCourseId] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const rows = useMemo(() => {
    const saved = listAllAttendanceLocal()
    const courseMap = new Map(courses.map(c => [String(c.id), c]))

    const flat = []
    for (const item of saved) {
      const cid = String(item.courseId)
      const course = courseMap.get(cid)
      const roster = studentsByCourse[cid] || []
      for (const r of item.records) {
        const st = r.status === 'presente' ? 'Presente'
                 : r.status === 'ausente' ? 'Ausente'
                 : r.status === 'tardanza' ? 'Tardanza'
                 : r.status === 'justificado' ? 'Justificado'
                 : 'Sin marcar'
        const stu = roster.find(s => String(s.id) === String(r.studentId)) || {}
        flat.push({
          id: `${cid}-${item.date}-${r.studentId}`,
          courseId: cid,
          courseCode: course?.code || '',
          courseName: course?.name || '',
          studentName: stu.name || `ID ${r.studentId}`,
          date: item.date,
          status: st,
          note: r.note || ''
        })
      }
    }

    return flat
      .filter(x => (courseId ? String(x.courseId) === String(courseId) : true))
      .filter(x => (from ? x.date >= from : true))
      .filter(x => (to ? x.date <= to : true))
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [courseId, from, to])

  // columnas visibles
  const HEAD = ['Estudiante', 'Curso', 'Fecha', 'Estado', 'Observación']
  const toMatrix = () =>
    rows.map(r => [
      r.studentName,
      `${r.courseCode} · ${r.courseName}`.trim(),
      r.date,
      r.status,
      r.note || '-',
    ])

  const download = (blob, filename) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }
  const courseLabel = () => {
    if (!courseId) return 'todos'
    const c = courses.find(c => String(c.id) === String(courseId))
    return c ? (c.code || `curso-${c.id}`) : String(courseId)
  }
  const stamp = () => new Date().toISOString().slice(0, 10)

  const exportJSON = () => {
    const data = rows.map(r => ({
      estudiante: r.studentName,
      curso: `${r.courseCode} · ${r.courseName}`.trim(),
      fecha: r.date,
      estado: r.status,
      observacion: r.note || '-',
    }))
    download(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }),
      `asistencias_${courseLabel()}_${stamp()}.json`)
  }

  const exportTXT = () => {
    const txt = [HEAD.join('\t'), ...toMatrix().map(arr => arr.join('\t'))].join('\n')
    download(new Blob([txt], { type: 'text/plain;charset=utf-8' }),
      `asistencias_${courseLabel()}_${stamp()}.txt`)
  }

  const exportCSV = () => {
    const esc = v => `"${String(v ?? '').replace(/"/g, '""')}"`
    const csv = [HEAD, ...toMatrix()].map(r => r.map(esc).join(',')).join('\r\n')
    download(new Blob([csv], { type: 'text/csv;charset=utf-8' }),
      `asistencias_${courseLabel()}_${stamp()}.csv`)
  }

  const exportXLSX = async () => {
    try {
      const XLSX = await import('xlsx')
      const ws = XLSX.utils.aoa_to_sheet([HEAD, ...toMatrix()])
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Asistencias')
      XLSX.writeFile(wb, `asistencias_${courseLabel()}_${stamp()}.xlsx`)
    } catch {
      alert('Instala "xlsx" con: npm i xlsx')
    }
  }

  const exportPDF = async () => {
    try {
      const { default: jsPDF } = await import('jspdf')
      const autoTable = (await import('jspdf-autotable')).default
      const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'A4' })
      doc.setFontSize(14)
      doc.text(`Historial de asistencias (${courseLabel()})`, 40, 40)
      autoTable(doc, {
        head: [HEAD],
        body: toMatrix(),
        startY: 60,
        styles: { fontSize: 9, cellPadding: 4 },
        headStyles: { fillColor: [229, 215, 251], textColor: 0 },
      })
      doc.save(`asistencias_${courseLabel()}_${stamp()}.pdf`)
    } catch {
      alert('Instala "jspdf" y "jspdf-autotable": npm i jspdf jspdf-autotable')
    }
  }

  return (
    <>
      <div className="filters">
        <div className="fgroup">
          <label className="flabel">Curso</label>
          <select value={courseId} onChange={e => setCourseId(e.target.value)}>
            <option value="">Todos</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.code} · {c.name} {c.parallel || ''}
              </option>
            ))}
          </select>
        </div>

        <div className="fgroup">
          <label className="flabel">Desde</label>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} />
        </div>

        <div className="fgroup">
          <label className="flabel">Hasta</label>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} />
        </div>

        <div className="fgroup fghost" style={{ marginLeft: 'auto' }}>
          <label className="flabel">Exportar</label>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            <button className="btn ghost" onClick={exportPDF} disabled={!rows.length}>PDF</button>
            <button className="btn ghost" onClick={exportXLSX} disabled={!rows.length}>Excel</button>
            <button className="btn ghost" onClick={exportCSV} disabled={!rows.length}>CSV</button>
            <button className="btn ghost" onClick={exportTXT} disabled={!rows.length}>TXT</button>
            <button className="btn ghost" onClick={exportJSON} disabled={!rows.length}>JSON</button>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table className="att-table">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Observación</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={5}>Sin resultados</td></tr>
            )}
            {rows.map(r => {
              const cls = r.status === 'Presente' ? 'presente'
                        : r.status === 'Ausente' ? 'ausente'
                        : r.status === 'Tardanza' ? 'tardanza'
                        : 'info'
              return (
                <tr key={r.id}>
                  <td>{r.studentName}</td>
                  <td>{r.courseCode} · {r.courseName}</td>
                  <td>{r.date}</td>
                  <td><span className={`badge ${cls}`}>{r.status}</span></td>
                  <td>{r.note || '-'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
