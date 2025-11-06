const KEY = 'att:v1'

const getDB = () => JSON.parse(localStorage.getItem(KEY) || '{}')
const setDB = db => localStorage.setItem(KEY, JSON.stringify(db))

const makeKey = (courseId, date) => `${courseId}|${date}`

export function saveAttendanceLocal({ courseId, date, records }) {
  const db = getDB()
  db[makeKey(courseId, date)] = {
    courseId,
    date,
    records,
    savedAt: new Date().toISOString()
  }
  setDB(db)
  return { ok: true, saved: records.length }
}

export function loadAttendanceLocal(courseId, date) {
  const db = getDB()
  return db[makeKey(courseId, date)] || null
}

export function clearAttendanceLocal(courseId, date) {
  const db = getDB()
  delete db[makeKey(courseId, date)]
  setDB(db)
}

export function listAllAttendanceLocal() {
  const KEY = 'att:v1'
  const db = JSON.parse(localStorage.getItem(KEY) || '{}')
  return Object.values(db)   // [{ courseId, date, records, savedAt }, ...]
}