export const TRIP_TYPES = [
  { id: 'trek', label: 'Trek', icon: '🥾', color: '#22C55E' },
  { id: 'couple', label: 'Couple', icon: '💑', color: '#EC4899' },
  { id: 'pilgrimage', label: 'Pilgrimage', icon: '🛕', color: '#F59E0B' },
  { id: 'solo', label: 'Solo', icon: '🎒', color: '#6366F1' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧', color: '#38BDF8' },
  { id: 'adventure', label: 'Adventure', icon: '🏄', color: '#F97316' },
  { id: 'beach', label: 'Beach', icon: '🏖️', color: '#06B6D4' },
  { id: 'city', label: 'City', icon: '🏙️', color: '#8B5CF6' },
  { id: 'cultural', label: 'Cultural', icon: '🎭', color: '#A855F7' }
];

export const CONTINENTS = ['All','Asia','Europe','Americas','Africa','Oceania'];

const m = (month,rating,temp,crowd,note)=>({month,rating,temp,crowd,note});
const best='best', shoulder='shoulder', avoid='avoid';

export const destinations = [
  {
    id:'paris',name:'Paris',country:'France',continent:'Europe',
    tripTypes:['couple','city','cultural'],
    tagline:'The City of Light',
    description:'Paris captivates with its iconic landmarks, world-class art, and romantic ambiance. From the Eiffel Tower to hidden bistros, every corner tells a story.',
    imageUrl:'/images/paris_romantic_night_hero_1778225284348.png',
    lat:48.8566,lng:2.3522,rating:4.8,currency:'EUR',language:'French',
    visitMonths:[
      m('Jan',shoulder,'5°C','low','Winter sales'),m('Feb',shoulder,'6°C','low','Quiet museums'),
      m('Mar',shoulder,'10°C','medium','Spring begins'),m('Apr',best,'13°C','medium','Cherry blossoms'),
      m('May',best,'17°C','high','Perfect weather'),m('Jun',best,'20°C','high','Long sunny days'),
      m('Jul',best,'22°C','very high','Summer festivals'),m('Aug',shoulder,'22°C','high','Locals away'),
      m('Sep',best,'19°C','medium','Ideal visiting'),m('Oct',shoulder,'14°C','medium','Fall colors'),
      m('Nov',shoulder,'8°C','low','Cozy cafes'),m('Dec',shoulder,'5°C','medium','Christmas markets')
    ],
    celebrityVisits:[{celebrityId:'beyonce',quote:'Paris is always a good idea',spotsVisited:['Louvre','Le Marais'],year:2023}],
    topAttractions:['Eiffel Tower','Louvre Museum','Notre-Dame','Montmartre','Champs-Élysées'],
    topExperiences:['Seine River Cruise','Wine Tasting in Le Marais','Versailles Day Trip']
  },
  {
    id:'bali',name:'Bali',country:'Indonesia',continent:'Asia',
    tripTypes:['couple','beach','cultural','solo'],
    tagline:'Island of the Gods',
    description:'Bali enchants with lush rice terraces, ancient temples, vibrant art, and pristine beaches. A spiritual paradise for every traveler.',
    imageUrl:'/images/bali_spiritual_paradise_hero_1778225371621.png',
    lat:-8.3405,lng:115.092,rating:4.7,currency:'IDR',language:'Indonesian',
    visitMonths:[
      m('Jan',avoid,'27°C','low','Heavy rain'),m('Feb',avoid,'27°C','low','Wet season'),
      m('Mar',shoulder,'27°C','medium','Rain easing'),m('Apr',best,'27°C','medium','Dry starts'),
      m('May',best,'27°C','medium','Great surf'),m('Jun',best,'26°C','high','Peak season'),
      m('Jul',best,'26°C','very high','Festival month'),m('Aug',best,'26°C','very high','Best weather'),
      m('Sep',best,'27°C','high','Still dry'),m('Oct',shoulder,'27°C','medium','Rains begin'),
      m('Nov',avoid,'27°C','low','Monsoon'),m('Dec',avoid,'27°C','medium','Holiday crowds')
    ],
    celebrityVisits:[{celebrityId:'chrissy',quote:'Bali stole my heart',spotsVisited:['Ubud','Tanah Lot'],year:2022}],
    topAttractions:['Uluwatu Temple','Tegallalang Terraces','Seminyak Beach','Sacred Monkey Forest'],
    topExperiences:['Sunrise Trek Mt Batur','Balinese Cooking Class','Spa Day in Ubud']
  },
  {
    id:'tokyo',name:'Tokyo',country:'Japan',continent:'Asia',
    tripTypes:['city','cultural','solo','couple'],
    tagline:'Where tradition meets future',
    description:'Tokyo dazzles with neon-lit streets, Michelin-starred ramen, ancient shrines, and cutting-edge technology — all in one electrifying metropolis.',
    imageUrl:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    lat:35.6762,lng:139.6503,rating:4.9,currency:'JPY',language:'Japanese',
    visitMonths:[
      m('Jan',shoulder,'5°C','low','New Year'),m('Feb',shoulder,'6°C','low','Plum blossoms'),
      m('Mar',best,'10°C','high','Cherry blossom season'),m('Apr',best,'15°C','very high','Sakura peak'),
      m('May',best,'19°C','medium','Golden Week'),m('Jun',avoid,'22°C','medium','Rainy season'),
      m('Jul',shoulder,'26°C','high','Summer festivals'),m('Aug',shoulder,'27°C','high','Obon'),
      m('Sep',shoulder,'23°C','medium','Still warm'),m('Oct',best,'18°C','medium','Autumn leaves'),
      m('Nov',best,'13°C','medium','Fall foliage'),m('Dec',shoulder,'8°C','medium','Illuminations')
    ],
    celebrityVisits:[{celebrityId:'gordon',quote:'Tokyo is the food capital of the world',spotsVisited:['Tsukiji','Shinjuku'],year:2023}],
    topAttractions:['Senso-ji Temple','Shibuya Crossing','Meiji Shrine','Akihabara','Tsukiji Market'],
    topExperiences:['Sushi Making Class','Robot Restaurant','Day Trip to Mt Fuji']
  },
  {
    id:'santorini',name:'Santorini',country:'Greece',continent:'Europe',
    tripTypes:['couple','beach','cultural'],
    tagline:'Sunsets over the Aegean',
    description:'Santorini captivates with its white-washed cliff villages, volcanic beaches, and the most breathtaking sunsets on Earth.',
    imageUrl:'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    lat:36.3932,lng:25.4615,rating:4.8,currency:'EUR',language:'Greek',
    visitMonths:[
      m('Jan',avoid,'10°C','low','Cold winds'),m('Feb',avoid,'10°C','low','Off season'),
      m('Mar',shoulder,'12°C','low','Opening up'),m('Apr',best,'16°C','medium','Wildflowers'),
      m('May',best,'20°C','medium','Perfect'),m('Jun',best,'25°C','high','Peak sun'),
      m('Jul',best,'27°C','very high','Hot & busy'),m('Aug',best,'27°C','very high','Busiest'),
      m('Sep',best,'24°C','high','Still warm'),m('Oct',shoulder,'20°C','medium','Quieter'),
      m('Nov',avoid,'15°C','low','Closing'),m('Dec',avoid,'12°C','low','Off season')
    ],
    celebrityVisits:[],
    topAttractions:['Oia Sunset Point','Red Beach','Fira','Akrotiri Ruins'],
    topExperiences:['Catamaran Cruise','Wine Tour','Volcano Hike']
  },
  {
    id:'manali',name:'Manali',country:'India',continent:'Asia',
    tripTypes:['trek','adventure','couple','solo'],
    tagline:'Valley of the Gods',
    description:'Nestled in the Himalayas, Manali offers snow-capped peaks, pine forests, and thrilling adventure sports amidst stunning natural beauty.',
    imageUrl:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
    lat:32.2396,lng:77.1887,rating:4.5,currency:'INR',language:'Hindi',
    visitMonths:[
      m('Jan',shoulder,'-2°C','low','Snowfall'),m('Feb',shoulder,'0°C','low','Snow sports'),
      m('Mar',shoulder,'8°C','medium','Snow melting'),m('Apr',best,'14°C','medium','Spring bloom'),
      m('May',best,'18°C','high','Peak season'),m('Jun',best,'22°C','high','Pre-monsoon'),
      m('Jul',avoid,'20°C','low','Heavy rain'),m('Aug',avoid,'19°C','low','Landslide risk'),
      m('Sep',shoulder,'17°C','medium','Rain easing'),m('Oct',best,'12°C','medium','Clear skies'),
      m('Nov',shoulder,'5°C','low','Getting cold'),m('Dec',shoulder,'0°C','medium','Snow begins')
    ],
    celebrityVisits:[{celebrityId:'virat',quote:'Mountains are my therapy',spotsVisited:['Solang Valley','Rohtang Pass'],year:2021}],
    topAttractions:['Rohtang Pass','Solang Valley','Hadimba Temple','Old Manali','Jogini Falls'],
    topExperiences:['Paragliding in Solang','Trek to Hampta Pass','River Rafting in Beas']
  },
  {
    id:'newyork',name:'New York',country:'USA',continent:'Americas',
    tripTypes:['city','cultural','solo','family'],
    tagline:'The city that never sleeps',
    description:'New York City pulses with energy — from Broadway shows to Central Park, world-class museums to diverse neighborhoods bursting with flavor.',
    imageUrl:'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    lat:40.7128,lng:-74.006,rating:4.7,currency:'USD',language:'English',
    visitMonths:[
      m('Jan',shoulder,'-1°C','medium','Winter deals'),m('Feb',shoulder,'0°C','medium','Fashion Week'),
      m('Mar',shoulder,'6°C','medium','Spring starts'),m('Apr',best,'13°C','high','Cherry blossoms'),
      m('May',best,'18°C','high','Ideal weather'),m('Jun',best,'24°C','high','Summer vibes'),
      m('Jul',shoulder,'27°C','very high','Hot & humid'),m('Aug',shoulder,'26°C','high','Sticky'),
      m('Sep',best,'22°C','high','Perfect fall'),m('Oct',best,'16°C','high','Fall foliage'),
      m('Nov',shoulder,'9°C','high','Thanksgiving'),m('Dec',shoulder,'3°C','very high','Holiday magic')
    ],
    celebrityVisits:[],
    topAttractions:['Statue of Liberty','Central Park','Times Square','Brooklyn Bridge','MoMA'],
    topExperiences:['Broadway Show','Food Tour in Chinatown','Helicopter Tour']
  },
  {
    id:'varanasi',name:'Varanasi',country:'India',continent:'Asia',
    tripTypes:['pilgrimage','cultural','solo'],
    tagline:'The spiritual heart of India',
    description:'One of the oldest continuously inhabited cities, Varanasi offers mesmerizing Ganga Aarti, ancient ghats, and deep spiritual experiences.',
    imageUrl:'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
    lat:25.3176,lng:82.9739,rating:4.4,currency:'INR',language:'Hindi',
    visitMonths:[
      m('Jan',best,'15°C','medium','Pleasant cool'),m('Feb',best,'18°C','medium','Clear skies'),
      m('Mar',shoulder,'26°C','medium','Holi festival'),m('Apr',avoid,'35°C','low','Very hot'),
      m('May',avoid,'40°C','low','Extreme heat'),m('Jun',avoid,'38°C','low','Pre-monsoon'),
      m('Jul',avoid,'32°C','low','Monsoon'),m('Aug',avoid,'31°C','low','Heavy rain'),
      m('Sep',shoulder,'30°C','low','Rain easing'),m('Oct',best,'28°C','medium','Dev Deepawali'),
      m('Nov',best,'22°C','high','Festival season'),m('Dec',best,'16°C','high','Ganga Aarti best')
    ],
    celebrityVisits:[{celebrityId:'zuckerberg',quote:'Varanasi changed my perspective on life',spotsVisited:['Dashashwamedh Ghat','Kashi Vishwanath'],year:2015}],
    topAttractions:['Dashashwamedh Ghat','Kashi Vishwanath Temple','Sarnath','Assi Ghat'],
    topExperiences:['Evening Ganga Aarti','Boat Ride at Sunrise','Silk Weaving Workshop']
  },
  {
    id:'capetown',name:'Cape Town',country:'South Africa',continent:'Africa',
    tripTypes:['adventure','beach','cultural','couple'],
    tagline:'Where mountains meet the sea',
    description:'Cape Town stuns with Table Mountain views, pristine beaches, world-class vineyards, and rich cultural diversity at the tip of Africa.',
    imageUrl:'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
    lat:-33.9249,lng:18.4241,rating:4.6,currency:'ZAR',language:'English',
    visitMonths:[
      m('Jan',best,'26°C','high','Beach season'),m('Feb',best,'26°C','high','Hot & sunny'),
      m('Mar',best,'24°C','high','Harvest fest'),m('Apr',shoulder,'20°C','medium','Autumn'),
      m('May',shoulder,'17°C','low','Cooling down'),m('Jun',avoid,'14°C','low','Winter rain'),
      m('Jul',avoid,'13°C','low','Coldest'),m('Aug',shoulder,'14°C','low','Whale season'),
      m('Sep',shoulder,'16°C','medium','Spring flowers'),m('Oct',best,'19°C','medium','Wildflowers'),
      m('Nov',best,'22°C','medium','Warming up'),m('Dec',best,'24°C','high','Summer starts')
    ],
    celebrityVisits:[],
    topAttractions:['Table Mountain','Boulders Beach','Cape Point','V&A Waterfront','Robben Island'],
    topExperiences:['Wine Tour in Stellenbosch','Shark Cage Diving','Cable Car to Table Mountain']
  },
  {
    id:'sydney',name:'Sydney',country:'Australia',continent:'Oceania',
    tripTypes:['city','beach','family','adventure'],
    tagline:'Harbour city dreams',
    description:'Sydney charms with its iconic Opera House, golden beaches, vibrant harbour, and laid-back outdoor lifestyle under endless blue skies.',
    imageUrl:'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    lat:-33.8688,lng:151.2093,rating:4.7,currency:'AUD',language:'English',
    visitMonths:[
      m('Jan',best,'26°C','high','Summer peak'),m('Feb',best,'26°C','high','Beach weather'),
      m('Mar',best,'24°C','medium','Warm autumn'),m('Apr',shoulder,'21°C','medium','Cooler'),
      m('May',shoulder,'18°C','low','Vivid Sydney'),m('Jun',shoulder,'15°C','low','Winter mild'),
      m('Jul',shoulder,'14°C','low','Whale watching'),m('Aug',shoulder,'16°C','low','Quiet'),
      m('Sep',best,'19°C','medium','Spring bloom'),m('Oct',best,'21°C','medium','Warming up'),
      m('Nov',best,'23°C','medium','Pre-summer'),m('Dec',best,'25°C','high','Christmas sun')
    ],
    celebrityVisits:[],
    topAttractions:['Sydney Opera House','Harbour Bridge','Bondi Beach','Taronga Zoo','Blue Mountains'],
    topExperiences:['Bridge Climb','Ferry to Manly','Coastal Walk Bondi to Coogee']
  },
  {
    id:'dubai',name:'Dubai',country:'UAE',continent:'Asia',
    tripTypes:['city','family','couple','adventure'],
    tagline:'Where luxury knows no limits',
    description:'Dubai astounds with futuristic skyscrapers, desert adventures, luxury shopping, and a cosmopolitan food scene that spans the globe.',
    imageUrl:'/images/dubai_ultra_luxury_hero_1778225180437.png',
    lat:25.2048,lng:55.2708,rating:4.6,currency:'AED',language:'Arabic',
    visitMonths:[
      m('Jan',best,'20°C','high','Perfect weather'),m('Feb',best,'21°C','high','Shopping fest'),
      m('Mar',best,'24°C','high','Still pleasant'),m('Apr',shoulder,'29°C','medium','Warming up'),
      m('May',avoid,'35°C','low','Too hot'),m('Jun',avoid,'38°C','low','Extreme heat'),
      m('Jul',avoid,'41°C','low','Peak heat'),m('Aug',avoid,'41°C','low','Unbearable'),
      m('Sep',avoid,'38°C','low','Still very hot'),m('Oct',shoulder,'32°C','medium','Cooling'),
      m('Nov',best,'26°C','high','Great weather'),m('Dec',best,'22°C','very high','Peak season')
    ],
    celebrityVisits:[{celebrityId:'cr7',quote:'Dubai is my second home',spotsVisited:['Burj Khalifa','Palm Jumeirah'],year:2024}],
    topAttractions:['Burj Khalifa','Palm Jumeirah','Dubai Mall','Dubai Marina','Desert Safari'],
    topExperiences:['Desert Safari with BBQ','Dhow Cruise','Skydiving over Palm']
  }
];
