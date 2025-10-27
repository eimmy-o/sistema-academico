import './styles/DashStyles.css'

export const Dashboard = () => {

  const cardContent = [
    {
      materia: 'Desarrollo de Aplicaciones Web y Móviles',
      pao: 'II PAO 2025',
      codigoMateria: 'SOFG1006',
      paralelo: 1,
      hexColor: '#a5a1c9'
    },
    {
      materia: 'Emprendimiento e Innovación',
      pao: 'II PAO 2025',
      codigoMateria: 'ADMG1005',
      paralelo: 5,
      hexColor: '#199eb7'
    },
    {
      materia: 'Ingeniería de Software I',
      pao: 'II PAO 2025',
      codigoMateria: 'SOFG1007',
      paralelo: 2,
      hexColor: '#008400'
    },
    {
      materia: 'Sistemas Operativos',
      pao: 'II PAO 2025',
      codigoMateria: 'CCPG1056',
      paralelo: 1,
      hexColor: '#f16258'
    },
    {
      materia: 'Análisis de Algoritmos',
      pao: 'II PAO 2025',
      codigoMateria: 'CCPG1036',
      paralelo: 3,
      hexColor: '#e261b8'
    },
    {
      materia: 'Inglés V',
      pao: 'II PAO 2025',
      codigoMateria: 'IDIG1010',
      paralelo: 4,
      hexColor: '#809b36'
    },
  ]

  const bgColorOptions = [
    '#008400',
    '#199eb7',
    '#f16258',
    '#fc8c03',
    '#809b36',
    '#a5a1c9',
    '#e261b8'
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
              <p className='course-parallel'> Paralelo{item.paralelo}_{item.codigoMateria} </p>
              <p className='course-pao'> {item.pao} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
