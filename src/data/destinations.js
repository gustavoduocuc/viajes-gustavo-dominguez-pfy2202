// "isla-de-pascua" queda reservado como destino sin vuelos ni hoteles: el plan GraphQL debe omitirlo.
export const destinations = [
  {
    id: 1,
    slug: 'cusco',
    name: 'Cusco',
    country: 'Perú',
    region: 'Sudamérica',
    description:
      'Antigua capital del Imperio inca, a más de 3.000 metros de altura. Sus calles de piedra conducen al Valle Sagrado y a la ciudadela de Machu Picchu.',
    popularActivities: ['Caminata a Machu Picchu', 'Mercado de San Pedro', 'Valle Sagrado', 'Montaña de Colores'],
  },
  {
    id: 2,
    slug: 'buenos-aires',
    name: 'Buenos Aires',
    country: 'Argentina',
    region: 'Sudamérica',
    description:
      'Capital cosmopolita de avenidas amplias, cafés históricos y barrios con identidad propia, cuna del tango y de una intensa vida cultural.',
    popularActivities: ['Show de tango', 'Paseo por San Telmo', 'Cementerio de la Recoleta', 'Parrilla porteña'],
  },
  {
    id: 3,
    slug: 'isla-de-pascua',
    name: 'Isla de Pascua',
    country: 'Chile',
    region: 'Sudamérica',
    description:
      'Isla volcánica en medio del Pacífico, famosa por sus moáis, gigantes de piedra que custodian playas, cráteres y siglos de historia rapanui.',
    popularActivities: ['Ruta de los moáis', 'Amanecer en Tongariki', 'Playa Anakena', 'Cráter Rano Kau'],
  },
  {
    id: 4,
    slug: 'cancun',
    name: 'Cancún',
    country: 'México',
    region: 'Caribe y Centroamérica',
    description:
      'Playas de arena blanca y aguas turquesa en el Caribe mexicano, con cenotes, arrecifes y zonas arqueológicas mayas a pocas horas.',
    popularActivities: ['Snorkel en arrecife', 'Cenotes de Tulum', 'Chichén Itzá', 'Isla Mujeres'],
  },
  {
    id: 5,
    slug: 'roma',
    name: 'Roma',
    country: 'Italia',
    region: 'Europa',
    description:
      'La Ciudad Eterna reúne más de dos mil años de historia entre ruinas imperiales, plazas barrocas, museos y una gastronomía inolvidable.',
    popularActivities: ['Coliseo y Foro Romano', 'Museos Vaticanos', 'Fontana de Trevi', 'Pasta en Trastevere'],
  },
  {
    id: 6,
    slug: 'barcelona',
    name: 'Barcelona',
    country: 'España',
    region: 'Europa',
    description:
      'Ciudad mediterránea donde la arquitectura de Gaudí convive con playas urbanas, mercados vibrantes y una animada vida nocturna.',
    popularActivities: ['Sagrada Familia', 'Parque Güell', 'Mercado de la Boquería', 'Barrio Gótico'],
  },
  {
    id: 7,
    slug: 'kioto',
    name: 'Kioto',
    country: 'Japón',
    region: 'Asia',
    description:
      'Antigua capital imperial con miles de templos, jardines zen y barrios de casas de madera donde aún se ven geishas al atardecer.',
    popularActivities: ['Santuario Fushimi Inari', 'Bosque de bambú de Arashiyama', 'Ceremonia del té', 'Templo Kinkaku-ji'],
  },
  {
    id: 8,
    slug: 'ciudad-del-cabo',
    name: 'Ciudad del Cabo',
    country: 'Sudáfrica',
    region: 'África',
    description:
      'Ciudad entre el océano y la Montaña de la Mesa, puerta de entrada a viñedos, pingüinos y paisajes costeros de gran belleza.',
    popularActivities: ['Teleférico a Table Mountain', 'Pingüinos de Boulders', 'Cabo de Buena Esperanza', 'Ruta del vino'],
  },
];
