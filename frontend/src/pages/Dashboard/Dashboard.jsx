import './styles/DashStyles.css'

export const Dashboard = () => {

  const cardContent = [
    {
      materia: 'Desarrollo de Aplicaciones Web y Móviles',
      pao: 'II PAO 2025',
      codigo: 'SOFG1006',
      paralelo: 1,
      hexColor: '#a5a1c9'
    },
    {
      materia: 'Emprendimiento e Innovación',
      pao: 'II PAO 2025',
      codigo: 'ADMG1005',
      paralelo: 5,
      hexColor: '#03dbfc'
    },
    {
      materia: 'Ingeniería de Software I',
      pao: 'II PAO 2025',
      codigo: 'SOFG1007',
      paralelo: 2,
      hexColor: '#008000'
    },
    {
      materia: 'Sistemas Operativos',
      pao: 'II PAO 2025',
      codigo: 'CCPG1056',
      paralelo: 1,
      hexColor: '#fc0320'
    },
    {
      materia: 'Análisis de Algoritmos',
      pao: 'II PAO 2025',
      codigo: 'CCPG1036',
      paralelo: 3,
      hexColor: '#ffde05'
    },
    {
      materia: 'Inglés V',
      pao: 'II PAO 2025',
      codigo: 'IDIG1010',
      paralelo: 4,
      hexColor: '#1803fc'
    },
  ]

  const bgColorOptions = [
    '#008000',
    '#03dbfc',
    '#fc0320',
    '#fc8c03',
    '#1803fc',
    '#a5a1c9',
    '#ffde05'
  ] 

  return (
    <div className="dash-container">
      <h2 className='dash-title'>
        Dashboard
      </h2>
      <hr />
      <br />
      <div className='dash-card'>
        {cardContent.map((item) => (
          <div className='card-content' key={item.materia}>
            <div className='card-color-subsection' style={{backgroundColor: item.hexColor}}>
            </div>
            <div className='course-info'>
              <h4 className='course-subject' style={{color: item.hexColor}} title={item.materia}> {item.materia.toUpperCase()} </h4>
              <p className='course-parallel'> Paralelo{item.paralelo}_{item.codigo} </p>
              <p className='course-pao'> {item.pao} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
