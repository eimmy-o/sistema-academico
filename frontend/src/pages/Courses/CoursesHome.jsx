import { useState } from 'react'; 
import './Styles/courseDetailStyle.css';

const staticCourseData = {
    paralelo: 'Paralelo 1',
    profesor: 'Dr. María García',
    descripcion: 'Este curso cubre los fundamentos del desarrollo de aplicaciones web y móvil, enfocado en frameworks como React. El objetivo es preparar a los estudiantes para implementar proyectos de software con metodologías ágiles.',
    material: [
        { nombre: 'Diapositivas Tema 1 - Introducción', tipo: 'PDF' },
        { nombre: 'Guía de Laboratorio 3', tipo: 'DOCX' },
        { nombre: 'Video Tutorial - Hooks y Estados', tipo: 'MP4' },
    ]
};

export const CoursesHome = () => {
    const [isProfessorView, setIsProfessorView] = useState(false);
    
    const currentCourse = staticCourseData; 
    
    const renderMaterial = (material) => (
        <div className="material-list">
            {material.map((item, index) => (
                <div key={index} className="material-item">
                    <span className={`material-icon type-${item.tipo.toLowerCase()}`}>{item.tipo}</span>
                    <p className="material-name">{item.nombre}</p>
                </div>
            ))}
            {material.length === 0 && <p className="no-material-text">No hay material disponible actualmente.</p>}
        </div>
    );

    return (
        <div className="course-home-container">
            <div className="switch-view-area">
                <button className="switch"
                    onClick={() => setIsProfessorView(!isProfessorView)}
                    title={isProfessorView ? "Cambiar a vista de estudiante" : "Cambiar a vista de profesor"}
                    style={{ 
                        backgroundColor: isProfessorView ? '#f0f0f0' : '#624185', 
                        color: isProfessorView ? '#624185' : 'white'
                    }}
                >
                    {isProfessorView ? 'Switch Student view' : 'Switch Professor view'}
                </button>
            </div>

            <section className="course-data-section">
                <div className="data-item">
                    <p className="data-label">Paralelo:</p>
                    <p className="data-value">{currentCourse.paralelo}</p>
                </div>
                <div className="data-item">
                    <p className="data-label">Profesor:</p>
                    <p className="data-value">{currentCourse.profesor}</p>
                </div>
            </section>
            
            <section className="course-description-section">
                <h2 className="section-title">Descripción</h2>
                <p className="description-text">
                    {currentCourse.descripcion}
                </p>
            </section>
            
            <section className="course-material-section">
                <div className="material-header">
                    <h2 className="section-title">Material Disponible ({currentCourse.material.length})</h2>
                </div>
                {renderMaterial(currentCourse.material)}

                <div>
                    {isProfessorView && (
                        <button 
                            className="subirmaterial"
                            onClick={() => alert('¡Funcionalidad para subir material activada!')}
                        >
                            ➕  Subir Material
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};
