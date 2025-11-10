// src/pages/Courses/components/attendance/AttendancePage.jsx
import AttendanceTake from "./AttendanceTake"
import AttendanceHistory from "./AttendanceHistory"
import "./attendance.css"

import { useState } from "react";

export const AttendancePage = () => {
    const [activePanel, setActivePanel] = useState('take'); 

    const renderPanel = () => {
        switch (activePanel) {
            case 'take':
                return <AttendanceTake />;
            case 'history':
                return <AttendanceHistory />;
            default:
                return <AttendanceTake />;
        }
    };

    return (
        <div className="att-shell">
            <nav className="att-tabs">
                <button
                    onClick={() => setActivePanel('take')}
                    className={`att-tab ${activePanel === 'take' ? "active" : ""}`}
                >
                    Tomar asistencia
                </button>
                <button
                    onClick={() => setActivePanel('history')}
                    className={`att-tab ${activePanel === 'history' ? "active" : ""}`}
                >
                    Historial
                </button>
            </nav>

            <section className="att-card">
                {renderPanel()}
            </section>
        </div>
    );
};

export default AttendancePage;
