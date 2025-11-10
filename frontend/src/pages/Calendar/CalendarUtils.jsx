import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export function exportCalendarData(type, data) {
  // Si data no es un array, evita romper la app
  if (!Array.isArray(data) || data.length === 0) {
    console.warn("No hay datos para exportar o el formato es incorrecto.");
    return;
  }

  // Formatea los datos para exportaciones generales
  const formattedData = data.map((c) => ({
    Materia: c.name || "—",
    Código: c.code || "—",
    Aula: c.aula || c.room || "—",
    Horario:
      c.slots?.map(
        (s) =>
          `${["Lun", "Mar", "Mié", "Jue", "Vie"][s.day] || ""} ${
            s.start
          }-${s.end}`
      ).join(", ") || c.time || "—",
  }));

  switch (type) {
    /* PDF */
    case "pdf": {
      const doc = new jsPDF();

      // Encabezado del documento
      doc.setFontSize(16);
      doc.text("Horario de Cursos", 14, 20);

      const today = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.text(`Generado el ${today}`, 14, 28);

      // Columnas y filas de la tabla
      const tableColumn = ["Materia", "Código", "Aula", "Horario"];
      const tableRows = formattedData.map((course) => [
        course.Materia,
        course.Código,
        course.Aula,
        course.Horario,
      ]);

      // Inserta la tabla en el PDF
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
      });

      doc.save("Horario.pdf");
      break;
    }

    /* EXCEL */
    case "excel": {
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Horario");
      XLSX.writeFile(workbook, "Horario.xlsx");
      break;
    }

    /* CSV */
    case "csv": {
      const csv = [
        ["Materia", "Código", "Aula", "Horario"],
        ...formattedData.map((r) => Object.values(r)),
      ]
        .map((r) => r.join(","))
        .join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Horario.csv";
      a.click();
      URL.revokeObjectURL(url);
      break;
    }

    /* JSON */
    case "json": {
      const blob = new Blob([JSON.stringify(formattedData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Horario.json";
      a.click();
      URL.revokeObjectURL(url);
      break;
    }

    /* TXT */
    case "txt": {
      const txt = formattedData
        .map(
          (r) =>
            `Materia: ${r.Materia}\nCódigo: ${r.Código}\nAula: ${r.Aula}\nHorario: ${r.Horario}\n`
        )
        .join("\n-------------------------\n");

      const blob = new Blob([txt], { type: "text/plain;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Horario.txt";
      a.click();
      URL.revokeObjectURL(url);
      break;
    }

    default:
      console.error("❌ Formato de exportación no válido:", type);
  }
}