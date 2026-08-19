(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const app = $('#app');
  const PRODUCTS = window.ELSEWHERE_PRODUCTS || [];
  const money = n => `$${Number(n).toFixed(2)}`;
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const productById = id => PRODUCTS.find(p => p.id === id);
  const perItem = new Set(['posters', 'entity-pins', 'attraction-pins', 'magnets']);
  const categoryNames = {
    mascots: 'Mascots', apparel: 'Apparel', kids: 'Kids', gear: 'Explorer Gear',
    souvenirs: 'Souvenirs', collectibles: 'Collectibles', premium: 'Premium'
  };

  const shopSectionIds = {
    our: new Set(['echo-plush','keeper-plush','explorer-shirt','theme-hoodie','lab-coat','hazmat','cap','keeper-lantern','echo-keychain','backpack','mug','bottle','cup','map-poster','posters','notebook','passport','cards','lanyard','entity-pins','attraction-pins','stickers','magnets','blind-box','mini-models','metro-model','snowglobe','music-box','patches','tattoos']),
    premium: new Set(['coins','blueprint-book','statue','desk-lamp','opening-poster']),
    apparel: new Set(['expedition-jacket','glow-hoodie','containment-shirt','karma-jersey','socks','bucket-hat']),
    kids: new Set(['card-game','activity-book','binoculars','mini-flashlight','build-echo'])
  };

  const officialIdentity = {
    name: 'Elsewhere',
    mission: 'To create unforgettable attractions that blend immersive storytelling, innovative technology, and educational experiences, inspiring guests to explore the unknown while promoting creativity, curiosity, and environmental responsibility.',
    vision: 'To redefine themed entertainment by creating a park where every attraction invites guests to step beyond reality and explore the impossible. Bringing mysterious worlds to life through innovation and sustainability shaping the future of immersive experiences.',
    themes: ['Backrooms/liminal space', 'Water and normal park'],
    mascots: ['Echo', 'The Keeper']
  };

  const routeMeta = {
    home: ['Elsewhere — Find your way. Or don\'t.', 'transit'],
    park: ['Park — Elsewhere', 'transit'],
    attractions: ['Attractions — Elsewhere', 'transit'],
    experience: ['Experience — Elsewhere', 'transit'],
    characters: ['The Keeper + Echo — Elsewhere', 'transit'],
    guide: ['Virtual Guide — Elsewhere', 'transit'],
    learn: ['M.E.G. Research & Discovery Center — Elsewhere', 'transit'],
    sustainability: ['Sustainability — Elsewhere', 'water'],
    ecosystem: ['Elsewhere Ecosystem — Elsewhere', 'containment'],
    visit: ['Plan Your Visit — Elsewhere', 'transit'],
    tickets: ['Tickets + RunPass — Elsewhere', 'transit'],
    schedule: ['Schedule — Elsewhere', 'transit'],
    dining: ['Dining — Elsewhere', 'karma'],
    shop: ['Shop @Elsewhere', 'shop'],
    business: ['Business Model — Elsewhere', 'transit'],
    feedback: ['Feedback — Elsewhere', 'transit'],
    archive: ['Concept Archive — Elsewhere', 'transit'],
    dossier: ['Complete Project Dossier — Elsewhere', 'transit'],
    routes: ['Route Directory — Elsewhere', 'containment']
  };

  const attractionData = {
    'infinite-transit': {
      name: 'Infinite Transit',
      eyebrow: 'THE CITY · LEVEL 903 “THE METRO”',
      theme: 'transit',
      hero: 'assets/banners/transit-cinematic.webp',
      concept: 'assets/attractions/infinite-transit-concept.png',
      type: 'Indoor roller coaster and simulator',
      audience: ['13 and up', 'Roller coaster lovers'],
      summary: 'An endless train station slowly stops behaving like a normal place.',
      description: [
        'Inspired by Level 903 “The Metro”. It is an indoor rollercoaster and simulator that immerses guests into an endless train station.',
        'The experience begins in a quiet, modern metro terminal filled with glowing signs written in different languages, fluorescent lighting, and clean platforms. As guests board their train themed roller coaster cart, the station slowly changes.',
        'The coaster accelerates through endless tunnels, abandoned platforms, floating railways, and impossible dimensions where the train appears to phase through solid walls and travel without tracks. Massive projection screens, practical scenery, synchronized lighting, fog, and immersive audio create the illusion that the metro is traveling between realities rather than through a normal subway system.',
        'The ride finishes with an inspiration of Level 903.1 “Tunnel Vision” with a simulation of a crash between the carts of the ride and a beam of light that confuses guests, after this everyone returns to the metro station as it was.'
      ],
      education: [
        'How subway systems are designed and operated.',
        'The engineering behind high-speed rail and magnetic transportation.',
        'How architecture, lighting, and acoustics influence human perception of space and comfort.'
      ],
      educationNote: 'All of these educational experiences are presented to you by the M.E.G. (a hybrid exploratory-governmental group dedicated primarily to exploration of the Backrooms\' various Levels) to maintain the Backrooms ambiance.',
      sustainability: [
        'Regenerative braking, which captures energy during braking and reuses it to help power the attraction.',
        'Energy-efficient LED lighting and projection mapping to reduce electricity consumption.',
        'Modular scenery built from recycled and reusable materials, minimizing construction waste.',
        'Solar panels installed on the roof of the show building, generating renewable electricity to help power the attraction and reduce reliance on the electrical grid.',
        'An indoor design that optimizes energy use and minimizes land disturbance compared to large outdoor attractions.'
      ],
      sections: [
        ['Phase 1', 'The departure'],
        ['Phase 2', 'Inter-dimensional clipping'],
        ['Phase 3', 'The map room / convergence'],
        ['Finale', 'Tunnel Vision crash simulation']
      ],
      specs: [['Ride system','Coaster + simulator'],['Setting','Endless metro'],['Finale','Tunnel Vision crash illusion'],['Education','Transport + engineering']]
    },
    'the-last-dive': {
      name: 'The Last Dive',
      eyebrow: 'INFINITE WATER · POOLROOMS / SUBLIMITY',
      theme: 'water',
      hero: 'assets/banners/last-dive-cinematic.webp',
      concept: 'assets/attractions/the-last-dive-concept.webp',
      type: 'Hybrid indoor-outdoor water ride',
      audience: [
        'Families with children 8+',
        'Teenagers and young adults who enjoy immersive themed experiences.',
        'Fans of the Backrooms, liminal spaces, and atmospheric storytelling.',
        'Guests looking for a family thrill ride with exciting drops and beautiful scenery.'
      ],
      summary: 'A peaceful Poolrooms journey opens into waterfalls, ruins and a dramatic 60-foot splashdown.',
      description: [
        'Inspired by the iconic Sublimity level, this attraction is a hybrid indoor-outdoor water ride that blends peaceful exploration with exhilarating thrills.',
        'Guests board six-passenger boats and begin inside a vast, climate-controlled show building where they drift through endless glowing pools, submerged hallways, marble walkways, and softly illuminated chambers. The atmosphere is calm, with crystal-clear turquoise water, gentle echoes, and natural ambient sounds creating the feeling of being lost in an infinite aquatic maze.',
        'The ride then exits the building into an open-air lagoon, where riders float beneath waterfalls, between rocky cliffs, lush vegetation, and elevated bridges. Sunlight reflects off the water, making it feel like they have escaped the endless maze—only for the boats to enter another mysterious structure through a massive waterfall.',
        'Back inside, the experience becomes more dynamic. Boats travel through larger chambers with waterfalls cascading from high ceilings, hidden caves, flooded ruins, and glowing underwater windows. The climax is a vertical lift to the top of an ancient-looking tower before a dramatic 60-foot splashdown, sending riders racing back into the outdoor lagoon for one final splash before returning to the station.',
        'The alternating indoor and outdoor sections make guests feel as though they are constantly discovering new areas of an endless world while keeping the mysterious, liminal atmosphere of the Poolrooms.'
      ],
      education: [
        'How water is filtered and recycled in large attractions.',
        'How dams, canals, and reservoirs manage water resources.',
        'The science of waves, buoyancy, and waterfalls.',
        'The importance of protecting freshwater ecosystems around the world.'
      ],
      educationNote: 'All of these educational experiences are presented to you by the M.E.G. (a hybrid exploratory-governmental group dedicated primarily to exploration of the Backrooms\' various Levels) to maintain the Backrooms ambiance.',
      sustainability: [
        'A closed-loop water filtration system that continuously cleans and recirculates the ride\'s water, minimizing waste.',
        'Solar panels installed across the roofs of the indoor show buildings to generate renewable electricity for pumps, lighting, and special effects.',
        'Rainwater harvesting systems that collect rain from the rooftops to supplement the attraction\'s water supply.',
        'Energy-efficient LED lighting and variable-speed pumps to reduce electricity consumption.',
        'Landscaping with native, drought-tolerant plants around the outdoor lagoon to reduce irrigation needs.',
        'Construction using recycled and sustainably sourced materials, lowering the attraction\'s environmental footprint.'
      ],
      sections: [['Section 1','Indoor labyrinth'],['Section 2','Outdoor lagoon'],['Section 3','Merging areas and climax'],['Finale','60-foot splashdown']],
      specs: [['Ride vehicle','Six-passenger boats'],['Structure','Indoor + outdoor'],['Finale','60-foot splashdown'],['Education','Water + hydraulics']]
    },
    karma: {
      name: 'Karma',
      eyebrow: 'KARMALAND · LEVEL 995',
      theme: 'karma',
      hero: 'assets/banners/karma-cinematic.webp',
      concept: null,
      type: 'Indoor launched roller coaster',
      audience: ['Ages 10+', 'Teenagers and young adults', 'Families seeking high-thrill attractions', 'Fans of the Backrooms and immersive storytelling'],
      summary: 'One physical track, but lighting, sound and projection make the experience feel like Karmaland is judging each rider differently.',
      description: [
        'Indoor launched roller coaster, fast launches, sharp turns, inversions, synchronized lighting, and immersive show scenes.',
        'Inspired by Level 995: Karmaland Amusement Park, this attraction places guests inside a mysterious abandoned carnival where every ride is said to judge those who board it. The roller coasters of Karmaland change depending on the rider\'s “karma,” becoming either beautiful and smooth or dangerous and deteriorated.',
        'Guests enter through the rusted entrance of Karmaland, where faded carnival music echoes through the empty midway. Flickering lights, broken prize booths, and abandoned attractions create an eerie but fascinating atmosphere. M.E.G. researchers warn guests that this roller coaster is the only way to investigate the park, but no one knows how it will react.',
        'After boarding, the train launches from 0 to 60 mph (97 km/h) in just a few seconds through a fog-filled tunnel, similar to the intense launch of Rock \"n\" Roller Coaster.',
        'Although every guest experiences the same physical track, lighting, projections, sound effects, and screens randomly change each ride to make it feel as though Karmaland is judging each visitor differently.'
      ],
      scenes: [
        ['The Forgotten Midway', 'Abandoned carnival games illuminated by flickering bulbs.'],
        ['The Fog Zone', 'Dense fog hides collapsing coaster tracks and giant silhouettes.'],
        ['The Judgment Circuit', 'Projection mapping makes the track appear to split into different “karma paths.”'],
        ['Neon Redemption', 'Colorful lights suddenly illuminate the ride, inspired by the positive-karma version of Level 995.'],
        ['The Crimson Descent', 'The tracks turn bright red and appear broken before the train narrowly escapes an illusion of a collapsing track through sound effects.']
      ],
      education: [
        'Ethics and decision-making by encouraging reflection on how everyday actions affect communities.',
        'Human perception, showing how lighting, sound, and visual effects can completely change the emotional experience of the same environment.',
        'Roller coaster engineering, including launched coaster technology, magnetic braking, and ride safety systems.',
        'Interactive exhibits in the queue allow guests to answer ethical dilemmas and explore how choices can have different consequences, connecting to the fictional “karma” system without actually judging guests.'
      ],
      sustainability: [
        'Solar panels on the show building that help power lighting, audio, and special effects.',
        'Regenerative magnetic braking, recovering energy as the trains slow down.',
        'Energy-efficient LED lighting that changes colors throughout the experience while using less electricity.',
        'Modular scenery and recycled materials, allowing scenes to be updated without major reconstruction.',
        'Landscaping around the building using native plants that require minimal irrigation.'
      ],
      specs: [['Launch','0–60 mph / 97 km/h'],['Ride style','Indoor launched coaster'],['Variation','Randomized show effects'],['Education','Ethics + perception']]
    },
    'containment-protocol': {
      name: 'M.E.G. Containment Protocol',
      eyebrow: 'ENTITY CONTAINMENT ZONE',
      theme: 'containment',
      hero: 'assets/banners/containment-cinematic.webp',
      concept: null,
      type: 'Trackless dark ride',
      audience: ['Ages 8+', 'Families', 'Teenagers', 'Science enthusiasts'],
      summary: 'A secure research tour becomes an emergency evacuation when the containment systems fail.',
      description: [
        'Trackless dark, instead of following a fixed track, the M.E.G. transport vehicles navigate through different laboratory sectors, making each turn feel unpredictable.',
        'Welcome to the M.E.G. Containment Zone, the organization\'s largest research laboratory dedicated to studying and safely containing the mysterious entities of the Backrooms.',
        'Guests are recruited as temporary Containment Specialists and board autonomous M.E.G. transport vehicles to tour the facility. Along the route, scientists explain the biology, behavior, and ecology of several captured entities through observation windows and interactive displays.',
        'Everything appears under control... until a massive power surge causes the containment systems to fail. Emergency lights flash. Containment doors unlock. Entities begin escaping throughout the laboratory.',
        'The M.E.G. orders an immediate evacuation, but the only route back to safety passes directly through the containment sectors. Guests must escape while learning how researchers understand—not destroy—the creatures of the Backrooms.'
      ],
      queue: [
        'Entity classification system', 'Hazard levels', 'How the M.E.G. safely studies unknown organisms',
        'Scientific equipment', 'Observation rooms', 'Security checkpoints',
        'A pre-show with a lead researcher welcoming new recruits before an alarm interrupts the presentation.'
      ],
      scenes: [
        ['Scene 1 — Orientation Laboratory', 'Scientists introduce the mission. Holographic displays explain entity biology, adaptation, behavior and ecosystems. Everything seems completely safe.'],
        ['Scene 2 — System Failure', 'Lights flicker, emergency sirens activate and containment doors begin opening. An AI announces: “Containment Protocol Failure. Sector lockdown unsuccessful.” The vehicle reroutes.'],
        ['Scene 3 — Observation Hall', 'Entities remain behind reinforced glass while scientists explain how they survive, their habitats and their role in the ecosystem. One containment window cracks and the vehicle escapes.'],
        ['Scene 4 — Laboratory Escape', 'Projection mapping, animatronics, lighting and sound make creatures appear throughout corridors while M.E.G. teams attempt to secure the facility.'],
        ['Scene 5 — Research Core', 'The central reactor begins shutting down. Guests discover the facility\'s solar energy, battery storage and emergency renewable power systems.'],
        ['Scene 6 — Final Escape', 'The vehicle accelerates through collapsing laboratory corridors. Containment teams trap the remaining escaped entities and guests exit as honorary M.E.G. Containment Specialists.']
      ],
      education: [
        'Biology: animal adaptations, predator-prey relationships, ecosystem balance and evolution.',
        'Scientific research: observation before intervention, laboratory safety and ethical treatment of unknown organisms.',
        'Engineering: containment technology, robotics used in hazardous environments and emergency systems.',
        'Renewable energy infrastructure.',
        'The core message: understanding unknown life is more valuable than fearing it.'
      ],
      sustainability: [
        'Solar panels on the laboratory roof provide renewable energy for lighting, research equipment, and containment systems.',
        'Energy storage batteries ensure critical containment systems remain operational during emergencies.',
        'Water recycling systems filter and reuse water for laboratory cooling and habitat maintenance.',
        'Recycled laboratory materials are used for exhibit construction and maintenance.',
        'Interactive displays show how studying ecosystems helps scientists protect biodiversity rather than disrupt it.'
      ],
      specs: [['Ride system','Trackless M.E.G. vehicles'],['Role','Temporary Containment Specialist'],['Story','Facility failure + escape'],['Education','Biology + engineering']]
    }
  };

  const zones = [
    {
      slug: 'twilight-zone', name: 'The Twilight Zone', label: 'CENTRAL HUB', img: 'assets/park-blueprint.webp',
      landmark: 'The M.E.G. Research Spire', restaurant: "Explorer's Mess Hall",
      description: 'Central Hub “The Twilight Zone”. The M.E.G. Research Spire acts as the visual landmark and educational heart of Elsewhere.',
      items: ['Educational Zone','Guest Services','First Aid','Park Information','Lockers','Rest Areas','Character interactions with M.E.G. researchers.']
    },
    {
      slug: 'the-city', name: 'The City', label: 'ZONE 1', img: 'assets/banners/transit-cinematic.webp',
      landmark: 'The Derailed Gateway', restaurant: 'Terminal 903 Café',
      description: 'Inspired by Level 903: a city built around impossible transit and endless metro routes.',
      items: ['Infinite Transit rollercoaster/simulator','Metro Operations Simulator']
    },
    {
      slug: 'infinite-water', name: 'Infinite Water', label: 'ZONE 2', img: 'assets/banners/last-dive-cinematic.webp',
      landmark: 'The Infinite Fountain', restaurant: 'The Deep End Café',
      description: 'A Poolrooms-inspired water zone combining a family water park with liminal indoor spaces.',
      items: ['The Last Dive water ride','Wave Pool','Lazy River',"Children's Splash Zone",'Water Play Structure','Relaxation Lagoon']
    },
    {
      slug: 'karmaland', name: 'Karmaland', label: 'ZONE 3', img: 'assets/banners/karma-cinematic.webp',
      landmark: 'The Clockwork Ferris Wheel', restaurant: "Fortune's Feast",
      description: 'A Level 995-inspired carnival zone where bright colors, nostalgia and unsettling changes live side by side.',
      items: ['Karma rollercoaster','Festival games']
    },
    {
      slug: 'entity-containment', name: 'Entity Containment Zone', label: 'ZONE 4', img: 'assets/banners/containment-cinematic.webp',
      landmark: 'Containment Core Alpha', restaurant: 'Containment Canteen',
      description: 'The M.E.G. high-security research complex dedicated to studying and safely containing Backrooms entities.',
      items: ['M.E.G. Containment Protocol simulator','Entity Discovery Lab']
    }
  ];

  const dining = {
    mess: {
      name: "Explorer's Mess Hall", zone: 'Twilight Zone',
      items: [["Explorer's Chicken Bowl",14.99],["Sustainable Veggie Bowl",13.99],["Classic Cheeseburger & Fries",15.49],["Grilled Chicken Sandwich",13.99],["Caesar Salad",11.99],["Tomato Soup & Bread",8.99],["Kids Meal (Chicken Tenders)",9.99],["Fresh Fruit Cup",4.99],["Brownie",4.49],["Coffee",3.99],["Smoothie",6.49],["Soft Drink",4.29]]
    },
    terminal: {
      name: 'Terminal 903 Café', zone: 'The City zone',
      items: [["Ham & Cheese Panini",11.99],["Turkey Wrap",10.99],["Croissant Sandwich",9.99],["Breakfast Bagel",8.99],["Caesar Salad",10.49],["Chocolate Croissant",4.99],["Blueberry Muffin",4.49],["Coffee",3.99],["Latte",5.49],["Iced Coffee",5.29],["Soft Drink",4.29]]
    },
    fortune: {
      name: "Fortune's Feast", zone: 'Karmaland Zone',
      items: [["Cheeseburger Combo",15.99],["Corn Dog Basket",11.99],["Hot Dog Combo",12.99],["Loaded Fries",8.99],["Giant Pretzel",6.99],["Popcorn Bucket",8.49],["Churros",6.49],["Funnel Cake",8.99],["Cotton Candy",5.99],["Candy Apple",6.49],["Midday Crepe",4.00],["Milkshake",7.49],["Slushie",5.99]]
    },
    deep: {
      name: 'The Deep End Café', zone: 'Infinite water zone',
      items: [["Fish Tacos (3)",15.99],["Chicken Wrap",13.99],["Tropical Burger",15.49],["Poke Bowl",16.99],["Fresh Fruit Bowl",8.99],["Fries",5.49],["Ice Cream Sundae",6.99],["Smoothie",6.49],["Fresh Lemonade",5.29],["Coconut Water",4.99]]
    },
    stands: {
      name: 'Food Stands & Carts', zone: 'Throughout the park',
      items: [["Popcorn",5.99],["Ice Cream Bar",5.49],["Pretzel",5.99],["Chips",3.99],["Cookie",3.49],["Brownie",4.49],["Water Bottle",3.99],["Soft Drink",4.29],["Coffee",3.99],["Fresh Fruit Cup",4.99],["Refillable Souvenir Cup (includes first drink)",18.99],["Unlimited Refill Wristband (1 day)",12.99]]
    },
    canteen: {
      name: 'Containment Canteen', zone: 'Entity Containment Zone',
      items: [["Research Protein Bowl",15.99],["Chicken Wrap",13.49],["Pasta Primavera",14.49],["Stir-Fried Vegetables & Rice",13.99],["Baked Potato with Toppings",9.99],["M.E.G. Research Lunch Box",12.99],["\"Specimen\" Cheesecake (served in a beaker)",6.99],["Fruit Cup",4.99],["Energy Drink",4.99],["Juice",3.99]]
    }
  };

  const schedules = {
    daily: [
      ['9:00 AM','Park Opens','Entrance Plaza'],
      ['9:15 AM','Welcome Ceremony – “The M.E.G. Briefing”','Twilight Zone'],
      ['9:30 AM','Educational Zone Opens','M.E.G. Research & Discovery Center'],
      ['10:00 AM','M.E.G. Robotics Demonstration','Robotics Lab'],
      ['10:30 AM','Renewable Energy Talk – “How Renewable Energy Powers the Backrooms”','Robotics Lab Theater'],
      ['11:00 AM','Meet & Greet with M.E.G. Researchers','Twilight Zone'],
      ['11:30 AM','Conservation Workshop – “Protecting Wildlife”','Conservation Center'],
      ['12:00 PM','Lunch Service Begins','All Restaurants'],
      ['1:00 PM','Entity Feeding Demonstration (Educational Show)','Entity Containment Zone'],
      ['2:00 PM','Design Your Sustainable Metro Challenge','Robotics Lab'],
      ['3:00 PM','M.E.G. Science Show','Twilight Zone Stage'],
      ['4:00 PM','Water Conservation Presentation','Educational Area'],
      ['5:00 PM','Karmaland Street Performance','Karmaland Plaza'],
      ['6:30 PM','Evening M.E.G. Briefing','Twilight Zone'],
      ['9:30 PM','Nighttime Spectacular – “Signals Through the Backrooms”','M.E.G. Research Spire (Twilight Zone)'],
      ['10:00 PM','Park Closes','Main Entrance Plaza']
    ],
    attractions: [
      ['9:00 AM – 9:30 PM','The Metro: Infinite Transit','Infinite Transit District'],
      ['9:00 AM – 9:00 PM','The Poolrooms: Beyond the Surface','Poolrooms'],
      ['9:00 AM – 9:30 PM','Karma Run: Judgment Rail','Karmaland'],
      ['9:00 AM – 9:30 PM','M.E.G. Containment Protocol','Entity Containment Zone'],
      ['9:30 AM – 9:00 PM','Other attractions','All Themed Lands']
    ],
    entertainment: [
      ['9:15 AM & 6:00 PM','M.E.G. Briefing Ceremony','Twilight Zone'],
      ['10:00 AM & 2:00 PM','M.E.G. Robotics Demonstration','Robotics Lab'],
      ['10:30 AM & 3:30 PM','Renewable Energy Talk','Robotics Lab Theater'],
      ['11:30 AM & 4:30 PM','Conservation Workshop','Conservation Center'],
      ['1:00 PM & 5:30 PM','Entity Feeding Demonstration','Entity Containment Zone'],
      ['5:00 PM & 6:30 PM','Karmaland Street Performance','Karmaland Plaza'],
      ['9:30 PM','“Signals Through the Backrooms” Nighttime Spectacular','M.E.G. Research Spire, Twilight Zone']
    ],
    water: [
      ['10:00 AM – 8:00 PM','Wave Pool','Poolrooms Water Park'],
      ['10:00 AM – 8:00 PM','Lazy River','Poolrooms Water Park'],
      ['10:00 AM – 7:30 PM','Splash Zone','Poolrooms Water Park'],
      ['10:00 AM – 8:00 PM','Relaxation Lagoon','Poolrooms Water Park']
    ],
    restaurants: [
      ['9:00 AM – 9:30 PM',"Explorer's Mess Hall",'Twilight Zone'],
      ['8:30 AM – 9:00 PM','Terminal 903 Café','Infinite Transit District'],
      ['10:00 AM – 9:00 PM','The Deep End Café','Water Park'],
      ['11:00 AM – 9:30 PM',"Fortune's Feast",'Karmaland'],
      ['11:00 AM – 9:30 PM','Containment Canteen','Entity Containment Zone']
    ]
  };

  const plans = {
    thrills: [['Twilight Zone','M.E.G. Briefing'],['Karmaland','Karma + Clockwork Ferris Wheel'],['The City','Infinite Transit'],['Entity Containment','Containment Protocol'],['Twilight Zone','Signals Through the Backrooms']],
    family: [['Twilight Zone','Research & Discovery Center'],['Infinite Water','Wave Pool + Lazy River'],['Infinite Water','The Last Dive'],['Karmaland','Festival Games + Ferris Wheel'],['Twilight Zone','Evening M.E.G. Briefing']],
    science: [['Twilight Zone','M.E.G. Research & Discovery Center'],['The City','Metro Operations Simulator'],['Infinite Water','Water Conservation Laboratory'],['Entity Containment','Entity Discovery Lab'],['Twilight Zone','M.E.G. Science Show']],
    chill: [['Twilight Zone','Explore the central hub'],['Infinite Water','Relaxation Lagoon'],['Infinite Water','Lazy River'],['Karmaland','Clockwork Ferris Wheel'],['Twilight Zone','Nighttime Spectacular']]
  };

  const legacyMerch = [
    ['Almond Water','The official drink concept, served in collectible industrial-style bottles as part of the M.E.G. Survival Kit line.'],
    ['UV Flashlight','An explorer-gear concept designed to reveal secret messages hidden throughout the park.'],
    ['Yellow Wallpaper T-Shirt','Clothing built around the recognizable yellow-wallpaper Backrooms look.'],
    ['Level Pins','Enamel pins representing Elsewhere / Backrooms levels, including Poolrooms-inspired designs.'],
    ['M.E.G. Survival Kit','The early product-line concept connecting Almond Water, UV gear, clothing, level pins and Echo merchandise under the M.E.G. explorer identity.']
  ];

  const keeperAnswers = {
    start: 'Begin at The Twilight Zone. It gives you the M.E.G. story, the Research Spire, guest services and the clearest starting point for every land.',
    city: 'The City is inspired by Level 903. Infinite Transit is the main attraction, with the Metro Operations Simulator, The Derailed Gateway and Terminal 903 Café around it.',
    tickets: 'The project lists an $80 opening special, $110 regular entrance and $135 holiday special. Ages 2–5 are free, ages 6–15 are $95 and ages 16+ are $110. RunPass is $70, the RunPass watch is $15, and the website/app QR code is free.',
    keeper: 'I am The Keeper. I watch the paths, encourage curiosity and help explorers without giving every answer away.',
    schedule: 'The park opens at 9:00 AM, and “Signals Through the Backrooms” begins at 9:30 PM before the 10:00 PM park close.'
  };

  const echoAnswers = {
    green: 'Elsewhere uses solar energy, recycling, water conservation, sustainable construction and wildlife protection across the park concept.',
    ssp: 'The Sustainable Storage Project is a roughly 20-minute walkthrough led by Echo: A Picking of Cherries, Reality Check and GET TO DO IT!',
    water: 'Infinite Water includes The Last Dive, Wave Pool, Lazy River, Children’s Splash Zone, Water Play Structure, Relaxation Lagoon and The Infinite Fountain.',
    lost: '...You are not lost... lost. Go back to The Twilight Zone, find the Research Spire, then choose a new path from there.',
    shop: 'The current Shop @Elsewhere catalog contains 46 priced products, plus an earlier concept-merch archive with Almond Water, UV flashlights, yellow-wallpaper shirts, level pins and the M.E.G. Survival Kit.'
  };

  function hero(img, eyebrow, title, lead, actions = '', stats = '') {
    return `<section class="hero"><div class="hero-bg"><img src="${img}" alt=""></div><div class="hero-overlay"></div><div class="hero-content"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lead">${lead}</p>${actions ? `<div class="actions">${actions}</div>` : ''}${stats ? `<div class="hero-stats">${stats}</div>` : ''}</div></section>`;
  }

  function pageHero(img, crumb, title, lead, eyebrow = crumb) {
    return `<section class="page-hero"><div class="bg"><img src="${img}" alt=""></div><div><div class="breadcrumbs"><a href="#/home">Elsewhere</a><span>›</span><span>${esc(crumb)}</span></div><p class="eyebrow">${esc(eyebrow)}</p><h1>${title}</h1><p class="lead">${lead}</p></div></section>`;
  }

  function cont(links) {
    return `<section class="section tight"><div class="continue"><div><p class="eyebrow">KEEP EXPLORING</p><strong>The path does not end here.</strong></div><div class="continue-links">${links.map(([label, href]) => `<a href="#/${href}">${label} →</a>`).join('')}</div></div></section>`;
  }

  function attractionCard(id) {
    const a = attractionData[id];
    return `<article class="feature-card card"><img src="${a.hero}" alt="${esc(a.name)}"><div class="card-body"><span class="mini-label">${esc(a.eyebrow)}</span><h3>${esc(a.name)}</h3><p>${esc(a.summary)}</p><div class="link-row"><a class="link-arrow" href="#/attractions/${id}">Explore attraction →</a></div></div></article>`;
  }

  function zoneCard(z) {
    return `<a class="zone-card" href="#/park/${z.slug}"><img src="${z.img}" alt="${esc(z.name)}"><div class="zone-copy"><span class="route-chip">${esc(z.label)}</span><h3>${esc(z.name)}</h3><p><b>${esc(z.landmark)}</b><br>${esc(z.items.slice(0, 3).join(' · '))}</p><span class="link-arrow">Open zone →</span></div></a>`;
  }

  function exactSourceNote(text = 'Core project wording.') {
    return `<div class="source-note">${esc(text)}</div>`;
  }

  function renderHome() {
    return hero(
      'assets/banners/transit-cinematic.webp',
      'WELCOME BACK TO...',
      'Else<span>where</span>',
      'Or is it your first time here...? Find your way. Or don\'t.',
      `<a class="btn primary" href="#/experience">Start exploring</a><a class="btn" href="#/visit">Plan your visit</a><a class="btn gold" href="#/shop">Shop @Elsewhere</a>`,
      `<span>4 themed zones + central hub</span><span>4 headline attractions</span><span>46 priced shop products</span><span>5 sustainability systems</span>`
    ) +
    `<section class="quick-grid"><a href="#/park"><small>PARK</small><strong>Map, lands and landmarks</strong></a><a href="#/attractions"><small>THRILLS</small><strong>Four headline attractions</strong></a><a href="#/characters"><small>STORY</small><strong>The Keeper + Echo</strong></a><a href="#/learn"><small>LEARN</small><strong>M.E.G. Research Center</strong></a><a href="#/ecosystem"><small>BEYOND</small><strong>Noclip OS + Abyss Vision</strong></a><a href="#/shop"><small>SHOP</small><strong>All products + prices</strong></a></section>` +
    `<section class="section"><div class="section-head"><p class="eyebrow">PARK IDENTITY</p><h2>The idea behind Elsewhere.</h2><p>Elsewhere grows from two theme directions: <strong>Backrooms/liminal space</strong> and <strong>Water and normal park</strong>. Echo and The Keeper are the park mascots.</p></div><div class="grid cols-2"><article class="callout"><p class="eyebrow">MISSION</p><h3>Official mission</h3><p>${esc(officialIdentity.mission)}</p></article><article class="callout"><p class="eyebrow">VISION</p><h3>Official vision</h3><p>${esc(officialIdentity.vision)}</p></article></div></section>` +
    `<section class="section"><div class="section-head"><p class="eyebrow">HEADLINERS</p><h2>Four attractions. Four different kinds of strange.</h2></div><div class="grid cols-4">${['infinite-transit','the-last-dive','karma','containment-protocol'].map(attractionCard).join('')}</div></section>` +
    `<section class="section"><div class="character-grid"><article class="character-card card"><img src="assets/mascots/the-keeper.webp" alt="The Keeper"><div class="character-copy"><p class="eyebrow">THE KEEPER</p><h2>Someone knows the way.</h2><p>The Keeper watches over every realm, tending to doors, pathways and forgotten corners while encouraging guests to discover Elsewhere for themselves.</p><p class="quote">“Every journey begins with someone who knows the way.”</p><a class="link-arrow" href="#/characters">Read the full story →</a></div></article><article class="character-card card"><img src="assets/mascots/echo-plush.webp" alt="Echo"><div class="character-copy"><p class="eyebrow">ECHO</p><h2>Every memory finds its way home.</h2><p>Echo formed from forgotten sounds and follows visitors through the park, repeating familiar voices and leaving shimmering trails of light.</p><p class="quote">“Every sound leaves a memory. Every memory finds its way home.”</p><a class="link-arrow" href="#/guide">Ask Echo →</a></div></article></div></section>` +
    `<section class="section"><a class="shop-hero-banner" href="#/shop"><img src="assets/banners/shop-hero.webp" alt="Shop at Elsewhere"><span class="shop-hero-copy"><p class="eyebrow">SHOP @ELSEWHERE</p><h1>Products you won’t find anywhere else... except Elsewhere.</h1><p class="lead">All 46 current products are here with their listed prices, plus Premium, Apparel and Kids collections.</p></span></a></section>` +
    cont([['Open the park map','park'],['See today’s schedule','schedule'],['Open the full shop','shop']]);
  }

  function renderPark() {
    return pageHero('assets/park-map-official.jpg','PARK','Find your way.<br>Or don’t.','The Twilight Zone is the central hub. The City, Infinite Water, Karmaland and the Entity Containment Zone branch out from it.') +
      `<section class="section"><div class="map-shell"><article class="map-view card"><img src="assets/park-map-official.jpg" alt="Official Elsewhere park map" data-lightbox="assets/park-map-official.jpg" data-caption="Official Elsewhere park map"></article><aside class="route-planner card"><p class="eyebrow">BUILD A ROUTE</p><h3>What kind of day do you want?</h3><div class="planner-buttons"><button data-plan="thrills" class="active">Thrills</button><button data-plan="family">Family</button><button data-plan="science">Science</button><button data-plan="chill">Chill</button></div><div class="route-output" id="routeOutput"></div></aside></div></section>` +
      `<section class="section"><div class="section-head"><p class="eyebrow">LANDS + HUB</p><h2>Five places to get lost in.</h2><p>Each card opens its own route with the exact landmark, attractions and restaurant information from the team prototype.</p></div><div class="zone-grid">${zones.map(zoneCard).join('')}</div></section>` +
      `<section class="section"><div class="art-grid"><article class="art-card"><img src="assets/park-map-official.jpg" alt="Official park map"><button data-lightbox="assets/park-map-official.jpg" data-caption="Official park map">Open official map</button></article><article class="art-card"><img src="assets/park-blueprint.webp" alt="M.E.G. park blueprint"><button data-lightbox="assets/park-blueprint.webp" data-caption="M.E.G. park blueprint">Open blueprint</button></article></div></section>` +
      cont([['Explore attractions','attractions'],['Plan your visit','visit'],['Open concept archive','archive']]);
  }

  function renderZone(slug) {
    const z = zones.find(x => x.slug === slug);
    if (!z) return render404();
    return pageHero(z.img, z.name, z.name, z.description, z.label) +
      `<section class="section"><div class="detail-shell"><article class="detail-main card"><p class="eyebrow">YOU CAN FIND</p><h2>${esc(z.landmark)}</h2><ul>${z.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></article><aside class="detail-side card"><p class="eyebrow">LANDMARK</p><h2>${esc(z.landmark)}</h2><p class="eyebrow" style="margin-top:24px">RESTAURANT</p><h3>${esc(z.restaurant)}</h3><a class="link-arrow" href="#/dining">Open dining menus →</a></aside></div></section>` +
      cont([['Back to park map','park'],['See attractions','attractions'],['Dining','dining']]);
  }

  function renderAttractions() {
    return pageHero('assets/banners/transit-cinematic.webp','ATTRACTIONS','The impossible,<br>engineered.','The four major attractions combine immersive storytelling, educational purpose and sustainability. Every attraction connects its story to education and sustainability, with the full ride details kept in one place.') +
      `<section class="section"><div class="grid cols-2">${['infinite-transit','the-last-dive','karma','containment-protocol'].map(attractionCard).join('')}</div></section>` +
      `<section class="section"><div class="section-head"><p class="eyebrow">OTHER ATTRACTIONS</p><h2>Everything else listed in the project.</h2></div><div class="research-grid"><article class="research-card card"><h3>M.E.G. Mission Simulator</h3><p>A short interactive walkthrough where guests receive their “Explorer Clearance” before entering Twilight Zone.</p></article><article class="research-card card"><h3>Metro Operations Simulator</h3><p>Guests operate miniature metro systems while learning how public transportation reduces emissions.</p></article><article class="research-card card"><h3>Water Park Features</h3><p>Wave Pool · Lazy River · Children’s Splash Zone · Water Play Structure · Relaxation Lagoon.</p></article><article class="research-card card"><h3>The Clockwork Ferris Wheel</h3><p>A giant illuminated Ferris wheel slowly rotates on its own, even without passengers. Every few minutes the lights flicker, the music distorts, and projections transform the wheel into its decayed version before returning it to normal.</p></article><article class="research-card card"><h3>Festival Games</h3><p>Guests have the opportunity of enjoying some good-old festival games. To get rewards you need to pay a small price to play, yet you can still play without paying.</p></article><article class="research-card card"><h3>Entity Discovery Lab</h3><p>An interactive exhibit where guests tour a part of the containment laboratory seeing entities, their classification, and learn about their fictional biology alongside real-world concepts like ecosystems, adaptation, and conservation.</p></article></div></section>` +
      cont([['See the park map','park'],['Explore M.E.G. learning','learn'],['See schedule','schedule/attractions']]);
  }

  function renderAttraction(id) {
    const a = attractionData[id];
    if (!a) return render404();
    document.body.dataset.theme = a.theme;
    const audience = a.audience.map(x => `<li>${esc(x)}</li>`).join('');
    const sceneBlock = a.scenes ? `<section class="section"><div class="section-head"><p class="eyebrow">RIDE SCENES</p><h2>The complete story flow.</h2></div><div class="scene-grid">${a.scenes.map(([n,d]) => `<article class="scene-card card"><span>${esc(n)}</span><p>${esc(d)}</p></article>`).join('')}</div></section>` : '';
    const queueBlock = a.queue ? `<section class="section"><div class="callout"><p class="eyebrow">QUEUE EXPERIENCE</p><h3>Before the ride begins</h3><div class="checklist">${a.queue.map(q => `<div class="check">${esc(q)}</div>`).join('')}</div></div></section>` : '';
    const sectionsBlock = a.sections ? `<div class="phase-strip">${a.sections.map(([k,v]) => `<div><small>${esc(k)}</small><strong>${esc(v)}</strong></div>`).join('')}</div>` : '';
    return pageHero(a.hero, a.name, a.name, a.summary, a.eyebrow) +
      `<section class="section"><div class="detail-shell"><article class="detail-main card"><p class="eyebrow">DESCRIPTION</p><h2>${esc(a.type)}</h2>${a.description.map(p => `<p>${esc(p)}</p>`).join('')}${sectionsBlock}<div class="spec-grid">${a.specs.map(([k,v]) => `<div class="spec"><small>${esc(k)}</small><strong>${esc(v)}</strong></div>`).join('')}</div></article><aside class="detail-side card"><p class="eyebrow">TARGET AUDIENCE</p><ul>${audience}</ul><p class="eyebrow" style="margin-top:26px">EDUCATIONAL PURPOSE</p><ul>${a.education.map(x => `<li>${esc(x)}</li>`).join('')}</ul>${a.educationNote ? `<p class="source-note compact">${esc(a.educationNote)}</p>` : ''}<p class="eyebrow" style="margin-top:26px">SUSTAINABILITY CONNECTION</p><ul>${a.sustainability.map(x => `<li>${esc(x)}</li>`).join('')}</ul></aside></div></section>` +
      queueBlock + sceneBlock +
      `<section class="section"><div class="section-head"><p class="eyebrow">CONCEPT + ATMOSPHERE</p><h2>Original design and cinematic direction.</h2></div><div class="art-grid"><article class="art-card"><img src="${a.hero}" alt="${esc(a.name)} cinematic concept"><button data-lightbox="${a.hero}" data-caption="${esc(a.name)} cinematic concept">Open cinematic art</button></article>${a.concept ? `<article class="art-card"><img src="${a.concept}" alt="${esc(a.name)} original concept art"><button data-lightbox="${a.concept}" data-caption="${esc(a.name)} original concept art">Open original concept</button></article>` : ''}</div></section>` +
      cont([['Back to all attractions','attractions'],['See sustainability','sustainability'],['Open the park map','park']]);
  }

  function renderExperience() {
    return pageHero('assets/banners/explorer-kit.webp','EXPERIENCE','Choose your way in.','Elsewhere is more than the rides: story, characters, science, sustainability, park operations, digital extensions and merchandise are all part of the same concept.') +
      `<section class="section"><div class="section-head"><p class="eyebrow">START HERE</p><h2>What do you want from Elsewhere?</h2></div><div class="visit-grid"><article class="visit-card card"><p class="eyebrow">THRILLS</p><h3>The major attractions</h3><p>Infinite Transit, The Last Dive, Karma and M.E.G. Containment Protocol.</p><a href="#/attractions">Explore attractions →</a></article><article class="visit-card card"><p class="eyebrow">STORY</p><h3>The Keeper + Echo</h3><p>Two mascots with different roles: one guides the path, the other protects memories.</p><a href="#/characters">Meet the mascots →</a></article><article class="visit-card card"><p class="eyebrow">SCIENCE</p><h3>M.E.G. Research Center</h3><p>Robotics, transportation, renewable energy, conservation, water systems and hands-on missions.</p><a href="#/learn">Become a recruit →</a></article><article class="visit-card card"><p class="eyebrow">ACTION</p><h3>Sustainable Storage Project</h3><p>A roughly 20-minute Echo-led walkthrough that moves from wonder to environmental reality to practical action.</p><a href="#/learn/ssp">Open SSP →</a></article><article class="visit-card card"><p class="eyebrow">BEYOND</p><h3>Noclip OS + Abyss Vision</h3><p>Digital and interactive concepts extend Elsewhere beyond rides and queues.</p><a href="#/ecosystem">See the ecosystem →</a></article><article class="visit-card card"><p class="eyebrow">MERCH</p><h3>Shop @Elsewhere</h3><p>All 46 priced products plus the earlier M.E.G. Survival Kit concepts.</p><a href="#/shop">Browse the shop →</a></article></div></section>` +
      cont([['Meet The Keeper + Echo','characters'],['Ask the guides','guide'],['Plan a full day','visit']]);
  }

  function renderCharacters() {
    return pageHero('assets/banners/explorer-kit.webp','THE KEEPER + ECHO','The heart of<br>Elsewhere.','“Every journey begins with someone who knows the way, and every memory deserves to find its way home.”') +
      `<section class="section"><div class="mascot-duo card"><img src="assets/shop/mascot-duo.jpg" alt="The Keeper and Echo together"><div><p class="eyebrow">TOGETHER</p><h2>Explore. Remember. Find your way.</h2><p>The Keeper and Echo were designed as a pair: one encourages exploration, the other carries the memories that explorers leave behind.</p></div></div></section><section class="section"><div class="callout"><p class="eyebrow">TOGETHER</p><h3>No guest is ever truly lost.</h3><p>Long before Elsewhere welcomed its first visitors, The Keeper became its silent guardian, watching over every pathway, hidden passage, and forgotten corner. Alongside him is Echo, a gentle spirit born from the countless voices, footsteps, and memories left behind by explorers. Together, they ensure that no guest is ever truly lost.</p><p>The Keeper welcomes visitors with warmth and curiosity, encouraging them to explore and discover the park's secrets for themselves rather than revealing every answer. Meanwhile, Echo drifts through the realms, repeating familiar sounds and leaving shimmering trails of light to gently guide those who wander off course.</p><p>Together, they represent the heart of Elsewhere: The Keeper inspires exploration, while Echo reminds guests that every adventure leaves behind memories worth remembering. As visitors journey through the park, the two mascots quietly accompany them, turning every path into a story waiting to be discovered.</p></div></section>` +
      `<section class="section"><div class="character-grid"><article class="character-card card"><img src="assets/mascots/the-keeper.webp" alt="The Keeper"><div class="character-copy"><p class="eyebrow">THE KEEPER</p><h2>“Every journey begins with someone who knows the way.”</h2><p>Long before Elsewhere welcomed its first visitor, there was The Keeper. No one knows where they came from, and no one can remember a time before they existed. Some believe they were once an explorer who wandered so far from reality that they became part of Elsewhere itself. Others say the park created them so no traveler would ever be truly lost.</p><p>The Keeper watches over every realm, quietly tending to doors, pathways, and forgotten corners before guests ever arrive. They know every shortcut, every hidden passage, and every secret, yet they never reveal everything at once. Instead, they encourage curiosity, believing that discoveries are most meaningful when made on your own.</p><p>Although mysterious, The Keeper is warm and welcoming. They greet every guest with genuine excitement, as though each new arrival is about to write another chapter in Elsewhere's endless story. They often pause to listen, examine strange objects, or smile at things no one else notices, reminding visitors that wonder exists in the smallest details.</p><p class="quote">“Welcome to Elsewhere. Every path is the right one... if you're willing to follow it.”</p><details><summary>Appearance — full file</summary><ul><li>Tall and elegant — around 6'4".</li><li>Long navy-blue coat lined with tiny embroidered maps.</li><li>Bronze buttons shaped like keys.</li><li>Soft cream scarf that gently moves as though touched by a breeze.</li><li>A polished brass lantern glowing with warm golden light.</li><li>A porcelain mask with kind eyes — or a face filled with tiny stars.</li><li>Worn leather boots from centuries of exploration.</li></ul></details><details><summary>Personality — full file</summary><ul><li>Wise but playful.</li><li>Speaks softly.</li><li>Loves asking questions rather than giving answers.</li><li>Never rushes anyone.</li><li>Notices things everyone else overlooks.</li></ul></details></div></article><article class="character-card card"><img src="assets/mascots/echo-plush.webp" alt="Echo"><div class="character-copy"><p class="eyebrow">ECHO</p><h2>“Every sound leaves a memory. Every memory finds its way home.”</h2><p>Long before the endless halls had names, before the lights hummed overhead and footsteps echoed through empty corridors, there was only silence. But silence never lasts forever. Every laugh, every whisper, every question, and every footstep left behind a tiny piece of itself. Over time, those forgotten sounds gathered together until they became someone.</p><p>That someone was Echo.</p><p>Echo drifts through the halls collecting voices, memories, and moments that would otherwise disappear. They don't speak with a voice of their own. Instead, they borrow the sounds around them, repeating words with a gentle delay that feels both comforting and mysterious.</p><p>Echo quietly guides visitors who lose their way, leaving faint trails of shimmering light or repeating familiar voices to lead them toward the next discovery. Echo believes that every visitor deserves to find their own path—but no one should have to walk it completely alone.</p><p>Even after guests leave the park, many swear they hear one final, cheerful “...goodbye...” drifting through the air, as if Elsewhere itself is wishing them a safe journey.</p><p class="quote">“...Hello... hello... Welcome to Elsewhere... elsewhere. I'll stay with you... with you.”</p><details><summary>Appearance — full file</summary><ul><li>Small floating spirit — around 3 feet tall.</li><li>Rounded body made of soft white and pale-gray static.</li><li>Bright glowing cyan eyes with a warm, friendly expression.</li><li>Tiny floating hands and feet that drift independently.</li><li>Wisps of shimmering static trailing behind while moving.</li><li>Gentle sound-wave ripples appear whenever Echo repeats a voice.</li><li>A faint glow that becomes brighter in darker areas.</li><li>A smile that occasionally flickers like an old television screen.</li></ul></details><details><summary>Personality — full file</summary><ul><li>Curious and playful.</li><li>Gentle and reassuring.</li><li>Speaks by repeating words and sounds with a slight delay.</li><li>Loves following guests on their adventures.</li><li>Easily fascinated by new voices and laughter.</li><li>Always ready to help someone who feels lost.</li></ul></details></div></article></div></section>` +
      cont([['Talk to the guides','guide'],['See mascot merchandise','shop']]);
  }

  function renderGuide() {
    return pageHero('assets/banners/explorer-kit.webp','VIRTUAL GUIDE','Two guides.<br>Two different jobs.','The Keeper knows the paths. Echo remembers the details. Ask either one for a quick way into the park.') +
      `<section class="section"><div class="guide-grid"><article class="guide-card card"><div class="guide-top"><img src="assets/mascots/the-keeper.webp" alt="The Keeper"><div><p class="eyebrow">THE KEEPER</p><h2>Park guide</h2></div></div><div class="guide-log" id="keeperLog"><div class="guide-msg keeper">If you are unsure where to begin, I can point to the path. I will not spoil what is waiting at the end.</div></div><div class="guide-actions"><button data-guide="keeper:start">Where should I start?</button><button data-guide="keeper:city">Tell me about The City</button><button data-guide="keeper:tickets">Ticket + RunPass prices</button><button data-guide="keeper:schedule">Park hours</button><button data-guide="keeper:keeper">Who are you?</button></div></article><article class="guide-card card"><div class="guide-top"><img src="assets/mascots/echo-plush.webp" alt="Echo"><div><p class="eyebrow">ECHO</p><h2>Park companion</h2></div></div><div class="guide-log" id="echoLog"><div class="guide-msg">...Hello... hello. Ask me about the parts people usually forget... forget.</div></div><div class="guide-actions"><button data-guide="echo:green">Sustainability</button><button data-guide="echo:ssp">What is SSP?</button><button data-guide="echo:water">Infinite Water</button><button data-guide="echo:shop">Shop info</button><button data-guide="echo:lost">I feel lost</button></div></article></div></section>` +
      cont([['Open the park map','park'],['See today’s schedule','schedule'],['Open SSP','learn/ssp']]);
  }

  function renderLearn(section = 'overview') {
    const overview = pageHero('assets/park-blueprint.webp','M.E.G. RESEARCH & DISCOVERY CENTER','Become a<br>new recruit.','The educational hub of Elsewhere is presented as a secure M.E.G. research facility where visitors become “new recruits” and connect the fictional Backrooms world to real science, engineering and environmental conservation.') +
      `<section class="section"><div class="grid cols-2"><article class="callout"><p class="eyebrow">OVERVIEW</p><h3>M.E.G. Research Pass</h3><p>The M.E.G. (Major Explorer Group) Research & Discovery Center is the educational hub of the Elsewhere Theme Park. Presented as a secure research facility operated by the M.E.G.—the explorers who study and document the entities—the building invites guests to become “new recruits.”</p><p>Guests receive a digital M.E.G. Research Pass upon entering, allowing them to complete missions, interact with exhibits, and earn a “Junior Researcher” certificate at the end of their visit.</p></article><article class="callout"><p class="eyebrow">CONNECTION TO THE PARK</p><h3>Science stays inside the story.</h3><p>The center ties directly into the park's attractions by explaining the real-world science behind them. M.E.G. researchers act as guides, reinforcing the story that the organization is studying the Backrooms while using sustainable technology to power and protect its research facilities.</p></article></div></section>`;

    const robotics = `<section class="section"><div class="section-head"><p class="eyebrow">AREA 1</p><h2>M.E.G. Robotics Lab</h2><p>“Welcome, Recruit. Every successful expedition depends on technology. Help us design the next generation of sustainable equipment for exploring the Backrooms.”</p><p>This interactive laboratory teaches robotics, engineering, renewable energy, transportation, and sustainability through hands-on activities inspired by the park's attractions.</p></div><div class="research-grid"><article class="research-card card"><h3>Design Your Sustainable Metro</h3><p>Guests use touchscreens and physical models to build an eco-friendly metro system by selecting solar-powered stations, regenerative braking systems, efficient rail layouts, renewable energy sources, green roofs and rainwater collection.</p><p>A simulator calculates energy efficiency, carbon emissions, passenger capacity and a sustainability score.</p></article><article class="research-card card"><h3>Build an M.E.G. Exploration Robot</h3><p>Using magnetic components, guests assemble miniature exploration robots with cameras, sensors, water-quality monitors, thermal scanners and solar panels. A testing arena challenges each robot to navigate miniature environments.</p></article><article class="research-card card"><h3>Power the Zones</h3><p>Guests experiment with solar panels, wind turbines, hydroelectric systems and battery storage. The goal is to generate enough clean electricity to keep an M.E.G. research base operating.</p></article><article class="research-card card"><h3>M.E.G. Briefing Theater</h3><p>Every hour, M.E.G. researchers in full hazmat suits present a live 15–20 minute demonstration covering renewable energy, solar panels, regenerative braking, water recycling inside The Last Dive and sustainable theme-park design. Guests can ask questions at the end.</p></article></div></section>`;

    const conservation = `<section class="section"><div class="section-head"><p class="eyebrow">AREA 2</p><h2>M.E.G. Conservation Center</h2><p>“Not everything in the Backrooms should be feared. Many environments teach us how important ecosystems are in our own world. Help us protect them.”</p><p>The Conservation Center focuses on biodiversity, ecosystems, and environmental stewardship by comparing Earth's habitats with fictional “research zones” inspired by the Backrooms.</p></div><div class="research-grid"><article class="research-card card"><h3>Ecosystems Gallery</h3><p>Recreated environments feature native species and plants. Interactive displays explain native flora and fauna, threatened species, habitat restoration and climate-change impacts.</p></article><article class="research-card card"><h3>Pollinator Garden</h3><p>An indoor garden showcases native flowering plants that attract butterflies, bees and hummingbirds. Guests learn why pollinators are essential, how gardens support biodiversity and how to create pollinator-friendly spaces at home.</p></article><article class="research-card card"><h3>Water Conservation Laboratory</h3><p>Inspired by The Last Dive, this area demonstrates water filtration systems, rainwater harvesting, closed-loop recycling and wetland ecosystems. Guests operate miniature filtration systems.</p></article><article class="research-card card"><h3>M.E.G. Environmental Monitoring Station</h3><p>Guests monitor air quality, test water quality, identify plant species and track wildlife populations—real scientific methods used by conservationists and environmental researchers.</p></article></div></section>`;

    const objectives = `<section class="section"><div class="callout"><p class="eyebrow">EDUCATIONAL OBJECTIVES</p><h3>What visitors should leave understanding.</h3><div class="checklist"><div class="check">Understand how engineering and sustainability work together.</div><div class="check">Explore renewable energy technologies.</div><div class="check">Learn about robotics and transportation systems.</div><div class="check">Discover different biodiversity and conservation efforts.</div><div class="check">Appreciate the importance of protecting ecosystems and natural resources.</div><div class="check">See how innovative technologies can solve environmental challenges.</div></div></div></section>`;

    if (section === 'ssp') return renderSSP();
    if (section === 'robotics') return overview + robotics + objectives + cont([['Conservation Center','learn/conservation'],['Sustainable Storage Project','learn/ssp'],['Sustainability','sustainability']]);
    if (section === 'conservation') return overview + conservation + objectives + cont([['Robotics Lab','learn/robotics'],['Sustainable Storage Project','learn/ssp'],['Sustainability','sustainability']]);
    return overview + `<section class="section"><div class="subroute-nav"><a href="#/learn/robotics"><strong>Robotics Lab</strong><span>Engineering · transport · energy</span></a><a href="#/learn/conservation"><strong>Conservation Center</strong><span>Biodiversity · ecosystems · water</span></a><a href="#/learn/ssp"><strong>Sustainable Storage Project</strong><span>Echo-led environmental walkthrough</span></a></div></section>` + robotics + conservation + objectives + cont([['See sustainability','sustainability'],['Explore SSP','learn/ssp'],['Return to attractions','attractions']]);
  }

  function renderSSP() {
    return pageHero('assets/banners/echo-plush-promo.webp','SUSTAINABLE STORAGE PROJECT','Wonder. Reality.<br>Action.','The SSP is a roughly 20-minute walkthrough led by Echo, designed around environmental awareness and action.') +
      `<section class="section"><div class="ssp-route"><article class="ssp-stage card"><span>01</span><p class="eyebrow">A PICKING OF CHERRIES</p><h2>Start with what is worth protecting.</h2><p>A warm, nature-filled stage about the beauty and value of Earth. The goal is to create wonder before confronting the environmental problem.</p></article><article class="ssp-stage card"><span>02</span><p class="eyebrow">REALITY CHECK</p><h2>Then show what is happening.</h2><p>A darker stage confronting environmental damage, fires and pollution. The tone changes so the problem feels real instead of abstract.</p></article><article class="ssp-stage card"><span>03</span><p class="eyebrow">GET TO DO IT!</p><h2>Finish with something visitors can do.</h2><p>A hopeful final stage focused on practical ecological solutions and hands-on recycling. The experience ends with action instead of guilt.</p></article></div></section>` +
      cont([['Back to M.E.G. Center','learn'],['See full sustainability plan','sustainability'],['Ask Echo','guide']]);
  }

  function renderSustainability() {
    return pageHero('assets/banners/last-dive-cinematic.webp','SUSTAINABILITY','Explore the impossible.<br>Protect the real world.','Elsewhere Theme Park is designed to provide immersive entertainment while minimizing its environmental impact. Sustainability is integrated into attractions, operations and infrastructure.') +
      `<section class="section"><div class="sustain-grid"><article class="sustain-card card"><p class="eyebrow">01</p><h3>Solar Energy</h3><p>The rooftops of all major show buildings, including indoor attractions such as Infinite Transit and The Last Dive, are equipped with solar panels that generate renewable electricity. This clean energy helps power ride systems, LED lighting, projection mapping, and special effects, reducing the park's dependence on fossil fuels.</p></article><article class="sustain-card card"><p class="eyebrow">02</p><h3>Recycling Systems</h3><p>The park features a comprehensive recycling program with clearly marked bins for paper, plastic, metal, and glass throughout guest areas. Restaurants use recyclable or compostable packaging, while construction materials from attraction refurbishments are reused whenever possible. Behind the scenes, maintenance teams recycle ride components and electronic equipment to minimize waste.</p></article><article class="sustain-card card"><p class="eyebrow">03</p><h3>Water Conservation</h3><p>Attractions such as The Last Dive operate using closed-loop filtration systems, continuously cleaning and recirculating water instead of wasting it. Rainwater collected from the roofs of show buildings is stored and reused for landscaping, cleaning pathways, and supplementing attraction water systems. The park also uses drought-tolerant native plants to reduce irrigation needs.</p></article><article class="sustain-card card"><p class="eyebrow">04</p><h3>Sustainable Construction</h3><p>Buildings are constructed using recycled steel, responsibly sourced timber, and low-carbon concrete whenever possible. Indoor attractions rely on modular sets and digital projection mapping, allowing scenery to be updated without extensive demolition or material waste. Energy-efficient insulation and smart climate-control systems help reduce heating and cooling demands.</p></article><article class="sustain-card card"><p class="eyebrow">05</p><h3>Wildlife Protection Initiatives</h3><p>The park is designed to preserve and enhance local biodiversity. Native trees, flowering plants, and pollinator gardens provide habitats for birds, butterflies, and beneficial insects. Outdoor lighting is carefully directed and dimmed at night to reduce light pollution and minimize its impact on wildlife. Landscaping avoids invasive plant species and supports the surrounding ecosystem while creating natural, immersive environments for guests.</p></article><article class="sustain-card card"><p class="eyebrow">OVERALL COMMITMENT</p><h3>Immersive entertainment + environmental responsibility</h3><p>The Backrooms Theme Park demonstrates that immersive entertainment and environmental responsibility can coexist. By combining renewable energy, efficient water management, sustainable construction, recycling practices, and wildlife conservation, the park aims to deliver unforgettable experiences while protecting natural resources for future generations.</p></article></div></section>` +
      `<section class="section"><div class="section-head"><p class="eyebrow">SUSTAINABLE DEVELOPMENT GOALS</p><h2>SDGs Elsewhere advocates for.</h2></div><div class="sdgs"><span class="sdg">SDG 6 · Clean Water and Sanitation</span><span class="sdg">SDG 7 · Affordable and Clean Energy</span><span class="sdg">SDG 9 · Industry, Innovation and Infrastructure</span><span class="sdg">SDG 11 · Sustainable Cities and Communities</span><span class="sdg">SDG 12 · Responsible Consumption and Production</span><span class="sdg">SDG 13 · Climate Action</span><span class="sdg">SDG 15 · Life on Land</span></div></section>` +
      cont([['See the science behind it','learn'],['Open SSP','learn/ssp'],['See The Last Dive','attractions/the-last-dive']]);
  }

  function renderEcosystem() {
    return pageHero('assets/banners/containment-cinematic.webp','BEYOND THE PARK','The Elsewhere<br>ecosystem.','The project also includes digital, AR and interactive concepts that extend the park beyond the four headline attractions.') +
      `<section class="section"><div class="research-grid"><article class="research-card card"><p class="eyebrow">APP</p><h3>Noclip OS</h3><p>A retro monitoring-terminal concept with a sanity meter, park map, live event alerts, hidden QR codes, classified files and a virtual inventory.</p></article><article class="research-card card"><p class="eyebrow">AR</p><h3>Abyss Vision</h3><p>Phone-camera augmented reality that reveals hidden doors, entities, static effects and themed photo opportunities.</p></article><article class="research-card card"><p class="eyebrow">INTERACTIVE</p><h3>Control & Containment Post</h3><p>Guests repair gas leaks, tune radio frequencies and solve mechanical puzzles while the environment reacts in real time.</p></article><article class="research-card card"><p class="eyebrow">MERCH CONCEPT</p><h3>M.E.G. Survival Kit</h3><p>Almond Water, UV flashlights, yellow-wallpaper shirts, level pins and Echo merchandise were part of the earlier merchandise concept.</p><a class="link-arrow" href="#/shop/concept-archive">Open early merch concepts →</a></article></div></section>` +
      cont([['Explore attractions','attractions'],['M.E.G. Research Center','learn'],['Shop @Elsewhere','shop']]);
  }

  function renderVisit() {
    return pageHero('assets/park-map-official.jpg','PLAN YOUR VISIT','Everything you need<br>before you wander off.','Map, tickets, RunPass, operating hours, restaurants and the full schedule are collected here.') +
      `<section class="section"><div class="visit-grid"><article class="visit-card card"><p class="eyebrow">MAP</p><h3>Know the zones.</h3><p>Start at The Twilight Zone and see how The City, Infinite Water, Karmaland and Entity Containment connect.</p><a href="#/park">Open park map →</a></article><article class="visit-card card"><p class="eyebrow">TICKETS</p><h3>Entry + RunPass.</h3><p>Opening, regular, holiday and age pricing, plus the $70 RunPass, $15 RunPass watch and free website/app QR.</p><a href="#/tickets">See all prices →</a></article><article class="visit-card card"><p class="eyebrow">TODAY</p><h3>Schedule your day.</h3><p>From the 9:00 AM park opening and 9:15 AM M.E.G. Briefing to the 9:30 PM nighttime spectacular and 10:00 PM park close.</p><a href="#/schedule">Open schedule →</a></article><article class="visit-card card"><p class="eyebrow">FOOD</p><h3>Five restaurants + park stands.</h3><p>Every zone has a restaurant identity, plus stands and carts throughout the park.</p><a href="#/dining">See every menu + price →</a></article></div></section>` +
      cont([['Tickets + RunPass','tickets'],['Build a route','park'],['Browse dining','dining']]);
  }

  function renderTickets() {
    return pageHero('assets/banners/transit-cinematic.webp','TICKETS + RUNPASS','Choose your entry.','Admission, age pricing and RunPass details are collected in one place.') +
      `<section class="section"><div class="ticket-grid"><article class="ticket-card card"><p class="eyebrow">OPENING SPECIAL</p><h3>Opening special</h3><div class="price">$80</div></article><article class="ticket-card card featured"><p class="eyebrow">REGULAR</p><h3>Regular park entrance</h3><div class="price">$110</div></article><article class="ticket-card card"><p class="eyebrow">HOLIDAY SPECIAL</p><h3>Halloween and Christmas</h3><div class="price">$135</div></article></div></section>` +
      `<section class="section"><div class="grid cols-2"><article class="callout"><p class="eyebrow">TICKET PRICE FOR KIDS + ADULTS</p><h3>Age pricing</h3><div class="checklist"><div class="check">Ages 2–5: Free</div><div class="check">Ages 6–15: $95</div><div class="check">Ages 16+: $110</div></div><p style="margin-top:14px">Contact us for any doubt about bundles and offers at: <a href="tel:+593997019798">+593 99 701 9798</a>.</p></article><article class="callout"><p class="eyebrow">RUNPASS</p><h3>Attraction access route</h3><p><strong>$70</strong> including access to all attractions; food services are not included.</p><div class="price-list"><div><span>RunPass watch</span><strong>$15</strong></div><div><span>Website/app QR code</span><strong>Free</strong></div></div><p class="source-note compact">The original RunPass screen says “Needs previous payment.”</p></article></div></section>` +
      cont([['Plan the day','visit'],['Check the schedule','schedule'],['Open dining','dining']]);
  }

  function renderSchedule(initial = 'daily') {
    return pageHero('assets/park-map-official.jpg','SCHEDULE','A full day inside Elsewhere.','Daily operations, attraction hours, entertainment, water-park hours and restaurant hours are all here.') +
      `<section class="section"><div class="tabs"><button data-schedule="daily" class="${initial==='daily'?'active':''}">Daily</button><button data-schedule="attractions" class="${initial==='attractions'?'active':''}">Attractions</button><button data-schedule="entertainment" class="${initial==='entertainment'?'active':''}">Entertainment</button><button data-schedule="water" class="${initial==='water'?'active':''}">Water Park</button><button data-schedule="restaurants" class="${initial==='restaurants'?'active':''}">Restaurants</button></div><div class="timeline" id="timeline" data-initial-schedule="${initial}"></div></section>` +
      cont([['Choose tickets','tickets'],['Find food','dining'],['Park map','park']]);
  }

  function renderDining(initial = 'mess') {
    return pageHero('assets/banners/karma-cinematic.webp','DINING','Every menu.<br>Every price.','The complete menus from the original App Lab screens are here, including food stands, souvenir drinks and the allergy / food preference note.') +
      `<section class="section"><div class="menu-layout"><div class="restaurant-list">${Object.entries(dining).map(([k,d]) => `<button data-restaurant="${k}" class="${k===initial?'active':''}"><strong>${esc(d.name)}</strong><small>${esc(d.zone)}</small></button>`).join('')}</div><article class="menu-card card"><p class="eyebrow" id="menuZone"></p><h2 id="menuName"></h2><div class="menu-items" id="menuItems"></div><div class="allergy">If you have any allergy or any food preference, please ask a staff member for accomodations.</div></article></div></section>` +
      cont([['See restaurant hours','schedule/restaurants'],['Tickets + RunPass','tickets'],['Back to visitor hub','visit']]);
  }

  function renderShop(category = 'all') {
    const heroMap = {all:'assets/banners/shop-hero.webp',our:'assets/banners/shop-hero.webp',premium:'assets/banners/premium-hero.webp',apparel:'assets/banners/apparel-hero.webp',kids:'assets/banners/kids-hero.webp'};
    const nameMap = {all:'Shop @Elsewhere',our:'Our Products',premium:'The Premium Collection',apparel:'Apparel Collection',kids:'Kids Collection'};
    const tagMap = {
      all:'Products you won’t find anywhere else... except Elsewhere.',
      our:'The finest collection for our everyday travelers!',
      premium:'Brought to you by our finest researchers!',
      apparel:'But now, dress like a true explorer.',
      kids:'The best memories for our little adventurers!'
    };
    const topCopy = (category === 'all' || category === 'our') ? `<div class="shop-copy-strip"><strong>Beware, or you could be amazed.</strong><span>The finest collection for our everyday travelers!</span></div>` : '';
    return `<section class="section"><a class="shop-hero-banner" href="#/shop"><img src="${heroMap[category] || heroMap.all}" alt="${esc(nameMap[category] || nameMap.all)}"><span class="shop-hero-copy"><p class="eyebrow">SHOP @ELSEWHERE</p><h1>${esc(nameMap[category] || nameMap.all)}</h1><p class="lead">${esc(tagMap[category] || tagMap.all)}</p></span></a>${topCopy}</section>` +
      `<section class="section tight"><div class="collection-banners four"><a class="collection-link" href="#/shop/our-products"><img src="assets/banners/shop-hero.webp" alt="Our Products"><span><small>SHOP</small><strong>Our Products</strong></span></a><a class="collection-link" href="#/shop/premium"><img src="assets/banners/premium-hero.webp" alt="Premium collection"><span><small>COLLECTION</small><strong>Premium</strong></span></a><a class="collection-link" href="#/shop/apparel"><img src="assets/banners/apparel-hero.webp" alt="Apparel collection"><span><small>COLLECTION</small><strong>Apparel</strong></span></a><a class="collection-link" href="#/shop/kids"><img src="assets/banners/kids-hero.webp" alt="Kids collection"><span><small>COLLECTION</small><strong>Kids</strong></span></a></div></section>` +
      `<section class="section"><div class="shop-toolbar"><input id="shopSearch" class="search" type="search" placeholder="Search all 46 priced products..." autocomplete="off"><select id="shopSort" class="sort"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="az">Name A–Z</option></select><div class="filters" id="shopFilters"></div></div><div class="section-head" style="margin-bottom:20px"><p class="eyebrow" id="productCount"></p><h2 style="font-size:clamp(34px,4vw,54px)">${esc(nameMap[category] || nameMap.all)}</h2><p><a class="link-arrow" href="#/shop/price-index">Open the complete price index →</a> &nbsp; <a class="link-arrow" href="#/shop/concept-archive">Early merchandise concepts →</a></p></div><div class="product-grid" id="productGrid"></div></section>` +
      cont([['Complete price index','shop/price-index'],['Early merch concepts','shop/concept-archive'],['Business model','business']]);
  }

  function renderPriceIndex() {
    return pageHero('assets/banners/shop-hero.webp','SHOP PRICE INDEX','All 46 products.<br>All prices.','Every current Shop @Elsewhere item and listed price in one compact index.') +
      `<section class="section"><div class="price-index card"><div class="price-index-head"><span>Product</span><span>Collection</span><span>Price</span></div>${PRODUCTS.map(p => `<a href="#/shop/product/${encodeURIComponent(p.id)}"><span>${esc(p.name)}</span><span>${esc(categoryNames[p.category] || p.category)}</span><strong>${money(p.price)}${perItem.has(p.id) ? ' each' : ''}</strong></a>`).join('')}</div></section>` +
      cont([['Back to shop','shop'],['Premium','shop/premium'],['Apparel','shop/apparel'],['Kids','shop/kids']]);
  }

  function renderLegacyShop() {
    return pageHero('assets/banners/explorer-kit.webp','EARLY MERCH CONCEPTS','The first M.E.G.<br>Survival Kit ideas.','These ideas belong to an earlier M.E.G. Survival Kit concept. They do not have listed prices, so they stay in the archive without one.') +
      `<section class="section"><div class="research-grid">${legacyMerch.map(([name,desc]) => `<article class="research-card card"><p class="eyebrow">EARLY CONCEPT · PRICE NOT PROVIDED</p><h3>${esc(name)}</h3><p>${esc(desc)}</p></article>`).join('')}</div></section>` +
      cont([['Current 46-product shop','shop'],['Complete price index','shop/price-index'],['Elsewhere ecosystem','ecosystem']]);
  }

  function renderProduct(id) {
    const p = productById(id);
    if (!p) return render404();
    document.body.dataset.theme = 'shop';
    return pageHero('assets/banners/shop-hero.webp','SHOP PRODUCT','Take a piece of Elsewhere.','A Shop @Elsewhere catalog item.') +
      `<section class="section"><div class="product-detail"><article class="product-detail-media card"><img src="${p.image}" alt="${esc(p.name)}" data-lightbox="${p.image}" data-caption="${esc(p.name)}"></article><article class="product-detail-copy card"><p class="eyebrow">${esc(categoryNames[p.category] || p.category)}</p><h1>${esc(p.name)}</h1><p class="lead">${esc(p.desc)}</p><div class="big-price">${money(p.price)}${perItem.has(p.id) ? ' each' : ''}</div><div class="actions"><button class="btn primary" data-add-product="${p.id}">Add to cart</button><a class="btn" href="#/shop">Back to shop</a></div><p class="source-note compact">Demo cart — no real payment is processed on this website.</p></article></div></section>` +
      cont([['Browse all products','shop'],['Open complete price index','shop/price-index']]);
  }

  function renderBusiness() {
    return pageHero('assets/park-blueprint.webp','BUSINESS MODEL','Built as a complete<br>park concept.','These figures are the team’s project estimates, not operating results.') +
      `<section class="section"><div class="business-stats"><article class="business-stat card"><strong>~3.5M</strong><span>projected annual visitors</span></article><article class="business-stat card"><strong>~$530M</strong><span>projected total annual revenue</span></article><article class="business-stat card"><strong>~$79.5M</strong><span>projected annual profit</span></article><article class="business-stat card"><strong>15%</strong><span>projected profit margin</span></article></div></section>` +
      `<section class="section"><div class="callout"><p class="eyebrow">REVENUE MIX</p><h3>Multiple ways the park earns.</h3>${[['Tickets','70–75%','72.5%'],['Food & beverage','10–12%','11%'],['Merchandise','10–12%','11%'],['Sponsorships / licensing / other','3–8%','5.5%']].map(([a,b,w]) => `<div class="bar"><div class="bar-row"><span>${a}</span><strong>${b}</strong></div><div class="bar-track"><div class="bar-fill" style="--w:${w}"></div></div></div>`).join('')}</div></section>` +
      `<section class="section"><div class="grid cols-2"><article class="callout"><p class="eyebrow">TICKET PRICING</p><h3>Entry references</h3><p>$80 opening special · $110 regular · $135 holiday special · ages 2–5 free · ages 6–15 $95 · ages 16+ $110.</p></article><article class="callout"><p class="eyebrow">MERCHANDISE</p><h3>Shop @Elsewhere</h3><p>The current web catalog contains 46 priced products across general, Premium, Apparel and Kids collections.</p><a class="link-arrow" href="#/shop/price-index">See every product + price →</a></article></div></section>` +
      cont([['See visitor experience','experience'],['Browse merchandise','shop'],['Tickets + RunPass','tickets']]);
  }

  function renderFeedback() {
    return pageHero('assets/banners/explorer-kit.webp','FEEDBACK','Would you enter<br>Elsewhere?','A short concept survey. Responses are saved only on this device so the website works without a server.') +
      `<section class="section"><form class="feedback-form card" id="feedbackForm" style="padding:24px"><div class="field"><label>How strong is the Elsewhere concept?</label><div class="rating-row">${[1,2,3,4,5].map(n => `<label><input type="radio" name="rating" value="${n}" required><span>${n}</span></label>`).join('')}</div></div><div class="field"><label for="favZone">Which zone would you visit first?</label><select id="favZone" name="zone" required><option value="">Choose one</option>${zones.map(z => `<option>${esc(z.name)}</option>`).join('')}</select></div><div class="field"><label for="favPart">What stands out most?</label><select id="favPart" name="part" required><option value="">Choose one</option><option>Attractions</option><option>Backrooms / liminal theme</option><option>The Keeper & Echo</option><option>Sustainability</option><option>Education</option><option>Shop / merchandise</option></select></div><div class="field"><label for="feedbackText">One thing you would improve</label><textarea id="feedbackText" name="comment" placeholder="Your idea..."></textarea></div><button class="btn primary" type="submit">Submit feedback</button><p id="feedbackStatus" style="margin:0;color:var(--muted);font-size:12px"></p></form></section>` +
      cont([['Back to home','home'],['Explore the park','park']]);
  }

  function renderArchive() {
    return pageHero('assets/park-blueprint.webp','CONCEPT ARCHIVE','From sketch to<br>atmosphere.','Original maps and attraction concepts sit next to the cinematic visual direction used in this website.') +
      `<section class="section"><div class="archive-grid">${[
        ['Official park map','assets/park-map-official.jpg'],
        ['Park blueprint','assets/park-blueprint.webp'],
        ['Infinite Transit — original concept','assets/attractions/infinite-transit-concept.png'],
        ['Infinite Transit — cinematic direction','assets/banners/transit-cinematic.webp'],
        ['The Last Dive — original concept','assets/attractions/the-last-dive-concept.webp'],
        ['The Last Dive — cinematic direction','assets/banners/last-dive-cinematic.webp'],
        ['Karma — cinematic direction','assets/banners/karma-cinematic.webp'],
        ['Containment Protocol — cinematic direction','assets/banners/containment-cinematic.webp'],
        ['Shop — cinematic direction','assets/banners/shop-hero.webp'],
        ['Premium Collection — cinematic direction','assets/banners/premium-hero.webp'],
        ['Apparel Collection — cinematic direction','assets/banners/apparel-hero.webp'],
        ['Kids Collection — cinematic direction','assets/banners/kids-hero.webp']
      ].map(([t,img]) => `<article class="archive-card card"><img src="${img}" alt="${esc(t)}"><div class="card-body"><strong>${esc(t)}</strong><button data-lightbox="${img}" data-caption="${esc(t)}">Open</button></div></article>`).join('')}</div></section>` +
      cont([['Explore attractions','attractions'],['Open park map','park'],['Shop concepts','shop/concept-archive']]);
  }


  function dossierDetails(title, eyebrow, body, open = false) {
    return `<details class="dossier-block card" ${open ? 'open' : ''}><summary><span><small>${esc(eyebrow)}</small><strong>${esc(title)}</strong></span><b>+</b></summary><div class="dossier-body">${body}</div></details>`;
  }

  function renderDossier() {
    const identity = `<div class="grid cols-2"><article class="callout"><p class="eyebrow">MISSION</p><p>${esc(officialIdentity.mission)}</p></article><article class="callout"><p class="eyebrow">VISION</p><p>${esc(officialIdentity.vision)}</p></article></div><div class="checklist"><div class="check"><strong>Theme ideas:</strong> ${officialIdentity.themes.map(esc).join(' · ')}</div><div class="check"><strong>Mascots:</strong> ${officialIdentity.mascots.map(esc).join(' + ')}</div><div class="check"><strong>Slogan:</strong> Find your way. Or don't.</div></div>`;

    const zoneBody = `<div class="dossier-grid">${zones.map(z => `<article><p class="eyebrow">${esc(z.label)}</p><h3>${esc(z.name)}</h3><p>${esc(z.description)}</p><p><strong>Landmark:</strong> ${esc(z.landmark)}</p><p><strong>Restaurant:</strong> ${esc(z.restaurant)}</p><ul>${z.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul><a class="link-arrow" href="#/park/${z.slug}">Open zone route →</a></article>`).join('')}</div>`;

    const attractionBody = Object.entries(attractionData).map(([id,a]) => `<article class="dossier-attraction"><div class="dossier-attraction-head"><div><p class="eyebrow">${esc(a.eyebrow)}</p><h3>${esc(a.name)}</h3><p><strong>${esc(a.type)}</strong></p></div><a class="btn small" href="#/attractions/${id}">Open ride</a></div>${a.description.map(x=>`<p>${esc(x)}</p>`).join('')}${a.queue?`<h4>Queue Experience</h4><ul>${a.queue.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}${a.scenes?`<h4>Ride Scenes</h4><div class="scene-grid compact-scenes">${a.scenes.map(([n,d])=>`<div class="scene-card"><strong>${esc(n)}</strong><p>${esc(d)}</p></div>`).join('')}</div>`:''}${a.sections?`<h4>Concept-art flow</h4><div class="phase-strip">${a.sections.map(([n,d])=>`<div><small>${esc(n)}</small><strong>${esc(d)}</strong></div>`).join('')}</div>`:''}<h4>Educational Purpose</h4><ul>${a.education.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${a.educationNote?`<p class="source-note compact">${esc(a.educationNote)}</p>`:''}<h4>Target Audience</h4><ul>${a.audience.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h4>Sustainability Connection</h4><ul>${a.sustainability.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article>`).join('');

    const otherAttractions = `<div class="research-grid"><article class="research-card"><h3>M.E.G. Mission Simulator</h3><p>A short interactive walkthrough where guests receive their “Explorer Clearance” before entering Twilight Zone.</p></article><article class="research-card"><h3>Metro Operations Simulator</h3><p>Guests operate miniature metro systems while learning how public transportation reduces emissions.</p></article><article class="research-card"><h3>Water Park Features</h3><p>Wave Pool · Lazy River · Children's Splash Zone · Water Play Structure · Relaxation Lagoon.</p></article><article class="research-card"><h3>The Clockwork Ferris Wheel</h3><p>A giant illuminated Ferris wheel slowly rotates on its own, even without passengers. Every few minutes the lights flicker, the music distorts, and projections transform the wheel into its decayed version before returning it to normal.</p></article><article class="research-card"><h3>Festival games</h3><p>Guests have the opportunity of enjoying some good-old festival games. To get rewards you need to pay a small price to play, yet you can still play without paying.</p></article><article class="research-card"><h3>Entity Discovery Lab</h3><p>An interactive exhibit where guests tour part of the containment laboratory, see entities and their classification, and learn fictional biology alongside real-world ecosystems, adaptation and conservation.</p></article></div>`;

    const research = `<article class="callout"><p class="eyebrow">OVERVIEW</p><p>The M.E.G. (Major Explorer Group) Research & Discovery Center is the educational hub of Elsewhere. It is presented as a secure research facility operated by the explorers who study and document the entities. Guests become “new recruits,” receive a digital M.E.G. Research Pass, complete missions, interact with exhibits and can earn a “Junior Researcher” certificate.</p></article><div class="dossier-grid"><article><h3>Area 1 · M.E.G. Robotics Lab</h3><p class="quote">“Welcome, Recruit. Every successful expedition depends on technology. Help us design the next generation of sustainable equipment for exploring the Backrooms.”</p><ul><li><strong>Design Your Sustainable Metro:</strong> solar-powered stations, regenerative braking, efficient rail layouts, renewable energy, green roofs and rainwater collection. The simulator calculates energy efficiency, carbon emissions, passenger capacity and a sustainability score.</li><li><strong>Build an M.E.G. Exploration Robot:</strong> cameras, sensors, water-quality monitors, thermal scanners and solar panels; then test the robot in a miniature arena.</li><li><strong>Power the zones:</strong> compare solar panels, wind turbines, hydroelectric systems and battery storage to keep a research base operating.</li><li><strong>M.E.G. Briefing Theater:</strong> hourly 15–20 minute presentations by M.E.G. researchers in hazmat suits covering renewable energy, park solar panels, regenerative braking, water recycling in The Last Dive and sustainable theme-park engineering, followed by questions.</li></ul></article><article><h3>Area 2 · M.E.G. Conservation Center</h3><p class="quote">“Not everything in the Backrooms should be feared. Many environments teach us how important ecosystems are in our own world. Help us protect them.”</p><ul><li><strong>Ecosystems Gallery:</strong> native flora/fauna, threatened species, habitat restoration and climate-change impacts.</li><li><strong>Pollinator Garden:</strong> native flowers for butterflies, bees and hummingbirds; why pollinators matter and how to build pollinator-friendly spaces.</li><li><strong>Water Conservation Laboratory:</strong> filtration, rainwater harvesting, closed-loop recycling and wetland ecosystems, with miniature filtration systems.</li><li><strong>M.E.G. Environmental Monitoring Station:</strong> air quality, water quality, plant identification and wildlife population tracking.</li></ul></article></div><article class="callout"><h3>Educational Objectives</h3><ul><li>Understand how engineering and sustainability work together.</li><li>Explore renewable energy technologies.</li><li>Learn about robotics and transportation systems.</li><li>Discover biodiversity and conservation efforts.</li><li>Appreciate the importance of protecting ecosystems and natural resources.</li><li>See how innovative technologies can solve environmental challenges.</li></ul><p>The center connects directly to the attractions by explaining the real-world science behind them while M.E.G. researchers keep the learning inside the park story.</p></article>`;

    const ssp = `<div class="ssp-route"><article class="ssp-stage"><span>01</span><h3>A Picking of Cherries</h3><p>A warm, nature-filled stage about the beauty and value of Earth.</p></article><article class="ssp-stage"><span>02</span><h3>Reality Check</h3><p>A darker stage confronting environmental damage, fires and pollution.</p></article><article class="ssp-stage"><span>03</span><h3>GET TO DO IT!</h3><p>A hopeful final stage focused on practical ecological solutions and hands-on recycling.</p></article></div><p>A roughly 20-minute walkthrough led by Echo, designed around environmental awareness and action.</p>`;

    const sustain = `<div class="dossier-grid"><article><h3>Solar Energy</h3><p>Rooftops of all major show buildings, including Infinite Transit and The Last Dive, use solar panels. Renewable electricity helps power ride systems, LED lighting, projection mapping and special effects, reducing dependence on fossil fuels.</p></article><article><h3>Recycling Systems</h3><p>Clearly marked bins for paper, plastic, metal and glass; recyclable or compostable restaurant packaging; reused refurbishment materials; recycled ride components and electronic equipment behind the scenes.</p></article><article><h3>Water Conservation</h3><p>The Last Dive uses closed-loop filtration. Roof rainwater is stored for landscaping, pathway cleaning and attraction-water systems. Drought-tolerant native plants reduce irrigation.</p></article><article><h3>Sustainable Construction</h3><p>Recycled steel, responsibly sourced timber, low-carbon concrete, modular sets, projection mapping, efficient insulation and smart climate control.</p></article><article><h3>Wildlife Protection Initiatives</h3><p>Native trees, flowering plants and pollinator gardens; directed and dimmed night lighting to reduce light pollution; avoidance of invasive plants.</p></article><article><h3>Overall Commitment</h3><p>Elsewhere is designed to show that immersive entertainment and environmental responsibility can coexist through renewable energy, efficient water management, sustainable construction, recycling and wildlife conservation.</p></article></div><div class="sdg-list"><span>SDG 6 · Clean Water and Sanitation</span><span>SDG 7 · Affordable and Clean Energy</span><span>SDG 9 · Industry, Innovation and Infrastructure</span><span>SDG 11 · Sustainable Cities and Communities</span><span>SDG 12 · Responsible Consumption and Production</span><span>SDG 13 · Climate Action</span><span>SDG 15 · Life on Land</span></div>`;

    const ticketBody = `<div class="ticket-grid"><article class="ticket-card"><p class="eyebrow">OPENING SPECIAL</p><div class="price">$80</div></article><article class="ticket-card"><p class="eyebrow">REGULAR PARK ENTRANCE</p><div class="price">$110</div></article><article class="ticket-card"><p class="eyebrow">HOLIDAY SPECIAL · HALLOWEEN + CHRISTMAS</p><div class="price">$135</div></article></div><div class="dossier-grid"><article><h3>Age pricing</h3><ul><li>Ages 2–5: Free</li><li>Ages 6–15: $95</li><li>Ages 16+: $110</li></ul><p>Bundles and offers: <a href="tel:+593997019798">+593 99 701 9798</a></p></article><article><h3>RunPass</h3><p><strong>$70</strong> including access to all attractions; food services are not included.</p><ul><li>RunPass watch: $15</li><li>Website/app QR code: Free</li><li>Original RunPass screen: “Needs previous payment.”</li></ul></article></div>`;

    const scheduleBody = Object.entries(schedules).map(([key,rows])=>`<article class="dossier-schedule"><h3>${esc({daily:'Daily schedule',attractions:'Attraction schedule',entertainment:'Entertainment schedule',water:'Water Park Operating Hours',restaurants:'Restaurant Park Operating Hours'}[key]||key)}</h3>${rows.map(([t,n,place])=>`<div class="time-row"><time>${esc(t)}</time><div><strong>${esc(n)}</strong><span>${esc(place)}</span></div></div>`).join('')}</article>`).join('');

    const diningBody = Object.entries(dining).map(([key,d])=>`<article class="dossier-menu"><h3>${esc(d.name)}</h3><p>${esc(d.zone)}</p>${d.items.map(([n,price])=>`<div class="menu-item"><span>${esc(n)}</span><strong>${money(price)}</strong></div>`).join('')}</article>`).join('') + `<p class="allergy">If you have any allergy or any food preference, please ask a staff member for accomodations.</p>`;

    const ecosystem = `<div class="dossier-grid"><article><p class="eyebrow">APP</p><h3>Noclip OS</h3><p>A retro monitoring-terminal concept with a sanity meter, park map, live event alerts, hidden QR codes, classified files and a virtual inventory.</p></article><article><p class="eyebrow">AR</p><h3>Abyss Vision</h3><p>Phone-camera augmented reality that reveals hidden doors, entities, static effects and themed photo opportunities.</p></article><article><p class="eyebrow">INTERACTIVE</p><h3>Control & Containment Post</h3><p>Guests repair gas leaks, tune radio frequencies and solve mechanical puzzles while the environment reacts in real time.</p></article><article><p class="eyebrow">EARLY MERCH</p><h3>M.E.G. Survival Kit</h3><p>Almond Water, UV flashlights, yellow-wallpaper shirts, level pins and Echo merchandise. No prices were listed for these early concepts.</p></article></div>`;

    const business = `<div class="business-stats"><article class="business-stat"><strong>~3.5M</strong><span>projected annual visitors</span></article><article class="business-stat"><strong>~$530M</strong><span>projected total annual revenue</span></article><article class="business-stat"><strong>~$79.5M</strong><span>projected annual profit</span></article><article class="business-stat"><strong>15%</strong><span>projected profit margin</span></article></div><div class="price-index compact-index"><div class="price-index-head"><span>Revenue source</span><span>Share</span><span></span></div><div><span>Tickets</span><strong>70–75%</strong><span></span></div><div><span>Food & beverage</span><strong>10–12%</strong><span></span></div><div><span>Merchandise</span><strong>10–12%</strong><span></span></div><div><span>Sponsorships / licensing / other</span><strong>3–8%</strong><span></span></div></div><p class="source-note compact">These are project estimates, not operating results.</p>`;

    const shopBody = `<p>The current Shop @Elsewhere catalog contains <strong>${PRODUCTS.length} priced products</strong>. Items marked “each” keep the per-item wording from the shop.</p><div class="price-index"><div class="price-index-head"><span>Product</span><span>Collection</span><span>Price</span></div>${PRODUCTS.map(p=>`<a href="#/shop/product/${encodeURIComponent(p.id)}"><span>${esc(p.name)}</span><span>${esc(categoryNames[p.category]||p.category)}</span><strong>${money(p.price)}${perItem.has(p.id)?' each':''}</strong></a>`).join('')}</div><h3>Early M.E.G. Survival Kit concepts · price not listed</h3><ul>${legacyMerch.map(([n,d])=>`<li><strong>${esc(n)}:</strong> ${esc(d)}</li>`).join('')}</ul>`;

    const characters = `<div class="dossier-grid"><article><h3>The Keeper</h3><p class="quote">“Every journey begins with someone who knows the way.”</p><p>Long before Elsewhere welcomed its first visitor, there was The Keeper. No one knows where they came from. Some believe they were once an explorer who wandered so far from reality that they became part of Elsewhere itself; others say the park created them so no traveler would ever be truly lost.</p><p>The Keeper watches doors, pathways and forgotten corners, knows every shortcut and secret, but encourages visitors to discover things for themselves.</p><ul><li>Around 6'4" tall.</li><li>Long navy-blue coat lined with tiny embroidered maps.</li><li>Bronze key-shaped buttons.</li><li>Soft cream scarf.</li><li>Polished brass lantern with warm golden light.</li><li>Porcelain mask with kind eyes — or a face filled with tiny stars.</li><li>Worn leather boots.</li><li>Wise but playful; soft-spoken; asks questions; never rushes; notices overlooked details.</li></ul><p class="quote">“Welcome to Elsewhere. Every path is the right one... if you're willing to follow it.”</p></article><article><h3>Echo</h3><p class="quote">“Every sound leaves a memory. Every memory finds its way home.”</p><p>Forgotten laughs, whispers, questions and footsteps gathered until they became Echo. Echo has no voice of their own, borrows nearby sounds and repeats words with a gentle delay. Shimmering trails and familiar voices guide visitors who lose their way.</p><ul><li>Around 3 feet tall.</li><li>Rounded body made of soft white and pale-gray static.</li><li>Bright glowing cyan eyes.</li><li>Tiny floating hands and feet.</li><li>Shimmering static wisps.</li><li>Sound-wave ripples when repeating a voice.</li><li>Glow becomes brighter in dark areas.</li><li>Smile sometimes flickers like an old television.</li><li>Curious, playful, gentle, reassuring and fascinated by voices.</li></ul><p>Even after guests leave, some hear one last cheerful “...goodbye...” drifting through the air.</p><p class="quote">“...Hello... hello... Welcome to Elsewhere... elsewhere. I'll stay with you... with you.”</p></article></div>`;

    return pageHero('assets/park-blueprint.webp','COMPLETE DOSSIER','Everything Elsewhere,<br>in one route.','Identity, park layout, attractions, mascots, education, sustainability, operations, prices, shop and business model.') +
      `<section class="section dossier-stack">${dossierDetails('Park Identity','01',identity,true)}${dossierDetails('Park Layout + Zones','02',zoneBody)}${dossierDetails('Four Major Attractions','03',attractionBody)}${dossierDetails('Other Attractions','04',otherAttractions)}${dossierDetails('The Keeper + Echo','05',characters)}${dossierDetails('M.E.G. Research & Discovery Center','06',research)}${dossierDetails('Sustainable Storage Project','07',ssp)}${dossierDetails('Sustainability Plan + SDGs','08',sustain)}${dossierDetails('Tickets + RunPass','09',ticketBody)}${dossierDetails('Full Schedule','10',scheduleBody)}${dossierDetails('Dining Menus + Prices','11',diningBody)}${dossierDetails('Noclip OS + Beyond the Park','12',ecosystem)}${dossierDetails('Business Model','13',business)}${dossierDetails('Shop @Elsewhere · 46 Prices','14',shopBody)}</section>` +
      `<section class="section"><div class="callout"><p class="eyebrow">ORIGINAL PROJECT LINKS</p><h3>Keep the original routes available.</h3><div class="actions"><a class="btn" href="https://studio.code.org/projects/applab/4b27b91c-888d-4dcb-b146-abcc7fd42a07?qr=true" target="_blank" rel="noopener noreferrer">Open App Lab ↗</a><a class="btn" href="https://sites.google.com/view/shopelsewhere/our-products" target="_blank" rel="noopener noreferrer">Open original shop ↗</a><a class="btn" href="#/routes">Route directory</a></div></div></section>` +
      cont([['Return home','home'],['Route directory','routes'],['Shop price index','shop/price-index']]);
  }

  function renderRoutes() {
    const current = [
      ['#/home','Entrance / home'],['#/park','Park map + zones'],['#/park/twilight-zone','The Twilight Zone'],['#/park/the-city','The City'],['#/park/infinite-water','Infinite Water'],['#/park/karmaland','Karmaland'],['#/park/entity-containment','Entity Containment Zone'],['#/attractions','Attractions hub'],['#/attractions/infinite-transit','Infinite Transit'],['#/attractions/the-last-dive','The Last Dive'],['#/attractions/karma','Karma'],['#/attractions/containment-protocol','M.E.G. Containment Protocol'],['#/characters','The Keeper + Echo'],['#/guide','Virtual guide'],['#/learn','M.E.G. Research Center'],['#/learn/robotics','Robotics Lab'],['#/learn/conservation','Conservation Center'],['#/learn/ssp','Sustainable Storage Project'],['#/sustainability','Sustainability plan'],['#/ecosystem','Noclip OS + beyond'],['#/visit','Visitor hub'],['#/tickets','Tickets + RunPass'],['#/schedule','Full schedule'],['#/schedule/attractions','Attraction hours'],['#/schedule/entertainment','Entertainment'],['#/schedule/water','Water Park hours'],['#/schedule/restaurants','Restaurant hours'],['#/dining','Dining'],['#/dining/terminal','Terminal 903 Café'],['#/dining/deep','The Deep End Café'],['#/dining/fortune',"Fortune's Feast"],['#/dining/canteen','Containment Canteen'],['#/dining/stands','Food Stands'],['#/shop','Shop · full 46-item catalog'],['#/shop/our-products','Our Products · original main collection'],['#/shop/premium','Premium Collection'],['#/shop/apparel','Apparel Collection'],['#/shop/kids','Kids Collection'],['#/shop/price-index','Complete price index'],['#/shop/concept-archive','Early merch concepts'],['#/business','Business model'],['#/feedback','Visitor feedback'],['#/archive','Concept archive'],['#/dossier','Complete project dossier'],['#/routes','Route directory']
    ];
    const legacy = [
      ['Image-screen','#/home'],['InfiniteTransit-screen','#/attractions/infinite-transit'],['Info/map-screen','#/park'],['Karma-Screen','#/attractions/karma'],['Learn-screen','#/learn'],['M.E.G.ContainmentProtocol-screen','#/attractions/containment-protocol'],['Map-screen','#/park'],['Menu-screen','#/dining'],['Merchandise-screen','#/shop'],['NoclipOS-screen','#/ecosystem'],['OtherAttractions-screen','#/attractions'],['OtherFoods-screen','#/dining/stands'],['Park-screen','#/park'],['RunPass-screen','#/tickets'],['Schedule-screen','#/schedule'],['Terminal903Café-screen','#/dining/terminal'],['TheDeepEndCafé-screen','#/dining/deep'],['TheLastDive-screen','#/attractions/the-last-dive'],['Tickets-screen','#/tickets']
    ];
    return pageHero('assets/banners/containment-cinematic.webp','ROUTE DIRECTORY','Every path has<br>a destination.','The site uses one-page JavaScript routes. Selecting a route replaces the content inside the app without reloading the whole website.') +
      `<section class="section"><div class="section-head"><p class="eyebrow">CURRENT SPA ROUTES</p><h2>Clean routes inside Elsewhere.</h2></div><div class="route-directory">${current.map(([r,n])=>`<a href="${r}"><code>${esc(r)}</code><span>${esc(n)}</span></a>`).join('')}</div></section>` +
      `<section class="section"><div class="section-head"><p class="eyebrow">APP LAB SCREEN ALIASES</p><h2>The old screen names still work as aliases.</h2><p>These are the screen names visible in the original Code.org App Lab project.</p></div><div class="route-directory legacy-routes">${legacy.map(([old,to])=>`<a href="${to}"><code>${esc(old)}</code><span>${esc(to)}</span></a>`).join('')}</div></section>` +
      cont([['Complete dossier','dossier'],['Return home','home'],['Concept archive','archive']]);
  }

  function render404() {
    return hero('assets/banners/containment-cinematic.webp','ROUTE NOT FOUND','You clipped.','That route is not part of the current Elsewhere build.',`<a class="btn primary" href="#/home">Return home</a><a class="btn" href="#/park">Open park map</a>`);
  }

  const aliasRoutes = {
    'image-screen': 'home',
    'infinitetransit-screen': 'attractions/infinite-transit',
    'info/map-screen': 'park',
    'karma-screen': 'attractions/karma',
    'learn-screen': 'learn',
    'm.e.g.containmentprotocol-screen': 'attractions/containment-protocol',
    'map-screen': 'park',
    'menu-screen': 'dining',
    'merchandise-screen': 'shop',
    'noclipos-screen': 'ecosystem',
    'otherattractions-screen': 'attractions',
    'otherfoods-screen': 'dining/stands',
    'park-screen': 'park',
    'runpass-screen': 'tickets',
    'schedule-screen': 'schedule',
    'terminal903café-screen': 'dining/terminal',
    'terminal903cafe-screen': 'dining/terminal',
    'thedeependcafé-screen': 'dining/deep',
    'thedeependcafe-screen': 'dining/deep',
    'thelastdive-screen': 'attractions/the-last-dive',
    'tickets-screen': 'tickets'
  };

  function parseRoute() {
    let h = decodeURIComponent(location.hash.replace(/^#\/?/, '').replace(/\/+$/, '')) || 'home';
    const alias = aliasRoutes[h.toLowerCase()];
    return alias || h;
  }

  function topRoute(r) {
    if (r.startsWith('attractions/')) return 'attractions';
    if (r.startsWith('park/')) return 'park';
    if (r.startsWith('shop/')) return 'shop';
    if (r.startsWith('learn/')) return 'learn';
    if (r.startsWith('schedule/')) return 'visit';
    if (r.startsWith('dining/')) return 'visit';
    if (['tickets','schedule','dining'].includes(r)) return 'visit';
    return r;
  }

  function render() {
    const r = parseRoute();
    let html = '';
    let metaKey = r;

    if (r === 'home') html = renderHome();
    else if (r === 'park') html = renderPark();
    else if (r.startsWith('park/')) { html = renderZone(r.split('/')[1]); metaKey = 'park'; }
    else if (r === 'attractions') html = renderAttractions();
    else if (r.startsWith('attractions/')) { html = renderAttraction(r.split('/')[1]); metaKey = 'attractions'; }
    else if (r === 'experience') html = renderExperience();
    else if (r === 'characters') html = renderCharacters();
    else if (r === 'guide') html = renderGuide();
    else if (r === 'learn') html = renderLearn('overview');
    else if (r.startsWith('learn/')) { html = renderLearn(r.split('/')[1]); metaKey = 'learn'; }
    else if (r === 'sustainability') html = renderSustainability();
    else if (r === 'ecosystem') html = renderEcosystem();
    else if (r === 'visit') html = renderVisit();
    else if (r === 'tickets') html = renderTickets();
    else if (r === 'schedule') html = renderSchedule('daily');
    else if (r.startsWith('schedule/')) { html = renderSchedule(r.split('/')[1]); metaKey = 'schedule'; }
    else if (r === 'dining') html = renderDining('mess');
    else if (r.startsWith('dining/')) { html = renderDining(r.split('/')[1]); metaKey = 'dining'; }
    else if (r === 'shop') html = renderShop('all');
    else if (r === 'shop/our-products') html = renderShop('our');
    else if (r === 'shop/premium') html = renderShop('premium');
    else if (r === 'shop/apparel') html = renderShop('apparel');
    else if (r === 'shop/kids') html = renderShop('kids');
    else if (r === 'shop/price-index') html = renderPriceIndex();
    else if (r === 'shop/concept-archive') html = renderLegacyShop();
    else if (r.startsWith('shop/product/')) { html = renderProduct(r.split('/')[2]); metaKey = 'shop'; }
    else if (r === 'business') html = renderBusiness();
    else if (r === 'feedback') html = renderFeedback();
    else if (r === 'archive') html = renderArchive();
    else if (r === 'dossier') html = renderDossier();
    else if (r === 'routes') html = renderRoutes();
    else { html = render404(); metaKey = 'home'; }

    app.setAttribute('aria-busy', 'true');
    app.innerHTML = html;
    app.classList.remove('route-enter');
    void app.offsetWidth;
    app.classList.add('route-enter');
    app.removeAttribute('aria-busy');

    const [title, baseTheme] = routeMeta[metaKey] || routeMeta.home;
    document.title = title;
    const attractionId = r.startsWith('attractions/') ? r.split('/')[1] : null;
    document.body.dataset.theme = attractionId && attractionData[attractionId] ? attractionData[attractionId].theme : baseTheme;
    updateActive(r);
    bindPage(r);
    closeDrawer();
    window.scrollTo({top: 0, behavior: 'auto'});
    setTimeout(() => app.focus({preventScroll: true}), 0);
  }

  function updateActive(r) {
    const top = topRoute(r);
    $$('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === top));
    $$('[data-mobile]').forEach(a => a.classList.toggle('active', a.dataset.mobile === top || (a.dataset.mobile === 'home' && r === 'home')));
  }

  function bindPage(r) {
    $$('[data-lightbox]', app).forEach(el => el.addEventListener('click', () => openLightbox(el.dataset.lightbox, el.dataset.caption || '')));
    if (r === 'park') bindPlanner();
    if (r === 'schedule' || r.startsWith('schedule/')) {
      const initial = $('#timeline')?.dataset.initialSchedule || 'daily';
      renderTimeline(schedules[initial] ? initial : 'daily');
      $$('[data-schedule]', app).forEach(b => b.addEventListener('click', () => renderTimeline(b.dataset.schedule)));
    }
    if (r === 'dining' || r.startsWith('dining/')) {
      const key = r.startsWith('dining/') ? r.split('/')[1] : 'mess';
      renderMenu(dining[key] ? key : 'mess');
      $$('[data-restaurant]', app).forEach(b => b.addEventListener('click', () => renderMenu(b.dataset.restaurant)));
    }
    if (r === 'guide') bindGuides();
    if (r.startsWith('shop') && !['shop/price-index','shop/concept-archive'].includes(r)) bindShop(r);
    if (r === 'feedback') bindFeedback();
  }

  function bindPlanner() {
    function draw(k) {
      const out = $('#routeOutput');
      if (!out || !plans[k]) return;
      out.innerHTML = plans[k].map(([a,b],i) => `<div class="route-step"><b>${i+1}</b><div><strong>${esc(a)}</strong><span>${esc(b)}</span></div></div>`).join('');
      $$('[data-plan]', app).forEach(x => x.classList.toggle('active', x.dataset.plan === k));
    }
    $$('[data-plan]', app).forEach(b => b.addEventListener('click', () => draw(b.dataset.plan)));
    draw('thrills');
  }

  function renderTimeline(k) {
    const out = $('#timeline');
    if (!out || !schedules[k]) return;
    out.innerHTML = schedules[k].map(([t,n,p]) => `<div class="time-row"><time>${esc(t)}</time><div><strong>${esc(n)}</strong><span>${esc(p)}</span></div></div>`).join('');
    $$('[data-schedule]', app).forEach(b => b.classList.toggle('active', b.dataset.schedule === k));
  }

  function renderMenu(k) {
    const d = dining[k];
    const items = $('#menuItems');
    if (!d || !items) return;
    $('#menuZone').textContent = d.zone;
    $('#menuName').textContent = d.name;
    items.innerHTML = d.items.map(([n,p]) => `<div class="menu-item"><span>${esc(n)}</span><strong>${money(p)}</strong></div>`).join('');
    $$('[data-restaurant]', app).forEach(b => b.classList.toggle('active', b.dataset.restaurant === k));
  }

  function bindGuides() {
    $$('[data-guide]', app).forEach(b => b.addEventListener('click', () => {
      const [who, key] = b.dataset.guide.split(':');
      const answer = who === 'keeper' ? keeperAnswers[key] : echoAnswers[key];
      const log = $(`#${who}Log`);
      if (!answer || !log) return;
      const d = document.createElement('div');
      d.className = 'guide-msg' + (who === 'keeper' ? ' keeper' : '');
      d.textContent = answer;
      log.appendChild(d);
      log.scrollTop = log.scrollHeight;
    }));
  }

  function bindFeedback() {
    const f = $('#feedbackForm');
    f?.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(f).entries());
      const list = safeParse(localStorage.getItem('elsewhereFeedbackV16') || localStorage.getItem('elsewhereFeedbackV15') || '[]', []);
      list.push({...data, submittedAt: new Date().toISOString()});
      try { localStorage.setItem('elsewhereFeedbackV16', JSON.stringify(list)); } catch {}
      $('#feedbackStatus').textContent = `Saved on this device. Response #${list.length}.`;
      f.reset();
      toast('Feedback saved');
    });
  }

  let shopState = {section: 'all', category: 'all', q: '', sort: 'featured'};

  function bindShop(r) {
    if (r.startsWith('shop/product/')) {
      $$('[data-add-product]', app).forEach(b => b.addEventListener('click', () => addToCart(b.dataset.addProduct)));
      return;
    }
    shopState.section = r === 'shop/our-products' ? 'our' : r === 'shop/premium' ? 'premium' : r === 'shop/apparel' ? 'apparel' : r === 'shop/kids' ? 'kids' : 'all';
    shopState.category = 'all';
    shopState.q = '';
    shopState.sort = 'featured';
    const filters = $('#shopFilters');
    if (filters) {
      const cats = shopState.section === 'all' ? [['all','All'],['premium','Premium type'],['apparel','Apparel type'],['kids','Kids type'],['mascots','Mascots'],['gear','Gear'],['collectibles','Collectibles'],['souvenirs','Souvenirs']] : [['all','This collection']];
      filters.innerHTML = cats.map(([k,n]) => `<button class="filter-chip ${shopState.category===k?'active':''}" data-shop-cat="${k}">${n}</button>`).join('');
      $$('[data-shop-cat]', filters).forEach(b => b.addEventListener('click', () => {
        shopState.category = b.dataset.shopCat;
        $$('[data-shop-cat]', filters).forEach(x => x.classList.toggle('active', x === b));
        renderProductGrid();
      }));
    }
    $('#shopSearch')?.addEventListener('input', e => { shopState.q = e.target.value.trim().toLowerCase(); renderProductGrid(); });
    $('#shopSort')?.addEventListener('change', e => { shopState.sort = e.target.value; renderProductGrid(); });
    renderProductGrid();
  }

  function shopView() {
    let a = PRODUCTS.filter(p =>
      (shopState.section === 'all' || shopSectionIds[shopState.section]?.has(p.id)) &&
      (shopState.category === 'all' || p.category === shopState.category) &&
      (`${p.name} ${p.desc} ${p.category}`).toLowerCase().includes(shopState.q)
    );
    if (shopState.sort === 'low') a.sort((x,y) => x.price - y.price);
    if (shopState.sort === 'high') a.sort((x,y) => y.price - x.price);
    if (shopState.sort === 'az') a.sort((x,y) => x.name.localeCompare(y.name));
    return a;
  }

  function renderProductGrid() {
    const g = $('#productGrid');
    if (!g) return;
    const a = shopView();
    $('#productCount').textContent = `${a.length} product${a.length === 1 ? '' : 's'}`;
    g.innerHTML = a.map(p => `<article class="product"><a class="product-media" href="#/shop/product/${encodeURIComponent(p.id)}"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy"></a><div class="product-body"><span class="cat">${esc(categoryNames[p.category] || p.category)}</span><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><div class="product-bottom"><strong class="product-price">${money(p.price)}${perItem.has(p.id)?' each':''}</strong><button class="add-btn" type="button" data-add-product="${p.id}">Add</button></div></div></article>`).join('') || `<div class="callout"><h3>No product found.</h3><p>Try another search or collection.</p></div>`;
    $$('[data-add-product]', g).forEach(b => b.addEventListener('click', () => addToCart(b.dataset.addProduct)));
  }

  const safeParse = (raw, fallback) => { try { return JSON.parse(raw); } catch { return fallback; } };
  let cart = safeParse(localStorage.getItem('elsewhereCartV16') || localStorage.getItem('elsewhereCartV15') || '[]', [])
    .filter(x => x && productById(x.id) && Number(x.qty) > 0)
    .map(x => ({id: x.id, qty: Math.max(1, Math.floor(Number(x.qty) || 1))}));

  function saveCart() {
    try { localStorage.setItem('elsewhereCartV16', JSON.stringify(cart)); } catch {}
    renderCart();
  }

  function addToCart(id) {
    const p = productById(id);
    if (!p) return;
    const x = cart.find(v => v.id === id);
    x ? x.qty++ : cart.push({id, qty: 1});
    saveCart();
    toast(`${p.name} added`);
  }

  function setQty(id, delta) {
    const x = cart.find(v => v.id === id);
    if (!x) return;
    x.qty += delta;
    if (x.qty <= 0) cart = cart.filter(v => v.id !== id);
    saveCart();
  }

  function renderCart() {
    const qty = cart.reduce((s,x) => s + x.qty, 0);
    $('#cartCount').textContent = qty;
    const list = $('#cartItems');
    if (!cart.length) {
      list.innerHTML = '<div class="callout"><h3>Your cart is empty.</h3><p>Find something worth bringing back.</p></div>';
    } else {
      list.innerHTML = cart.map(x => {
        const p = productById(x.id);
        return `<div class="cart-item"><img src="${p.image}" alt="${esc(p.name)}"><div><strong>${esc(p.name)}</strong><small>${money(p.price)} each</small><div class="qty"><button data-minus="${p.id}" type="button">−</button><span>${x.qty}</span><button data-plus="${p.id}" type="button">+</button></div></div><div class="cart-item-end"><b>${money(p.price*x.qty)}</b><button class="remove" data-remove="${p.id}" type="button">Remove</button></div></div>`;
      }).join('');
      $$('[data-minus]', list).forEach(b => b.onclick = () => setQty(b.dataset.minus, -1));
      $$('[data-plus]', list).forEach(b => b.onclick = () => setQty(b.dataset.plus, 1));
      $$('[data-remove]', list).forEach(b => b.onclick = () => { cart = cart.filter(v => v.id !== b.dataset.remove); saveCart(); });
    }
    $('#cartTotal').textContent = money(cart.reduce((s,x) => s + productById(x.id).price * x.qty, 0));
  }

  function setCart(open) {
    $('#cartDrawer').classList.toggle('open', open);
    $('#cartOverlay').classList.toggle('open', open);
    $('#cartDrawer').setAttribute('aria-hidden', String(!open));
    $('#cartFab').setAttribute('aria-expanded', String(open));
  }

  $('#cartFab').addEventListener('click', () => setCart(true));
  $('#cartClose').addEventListener('click', () => setCart(false));
  $('#cartOverlay').addEventListener('click', () => setCart(false));
  $('#copyOrder').addEventListener('click', async () => {
    if (!cart.length) return toast('Cart is empty');
    const rows = cart.map(x => {
      const p = productById(x.id);
      return `${x.qty} × ${p.name} — ${money(x.qty * p.price)}`;
    });
    rows.push(`Total: ${$('#cartTotal').textContent}`);
    const text = 'Shop @Elsewhere\n' + rows.join('\n');
    try { await navigator.clipboard.writeText(text); toast('Order summary copied'); }
    catch { window.prompt('Copy your order:', text); }
  });

  const drawer = $('#drawer');
  const menuButton = $('#menuButton');
  function setDrawer(open) {
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
  }
  function closeDrawer() { setDrawer(false); }
  menuButton.addEventListener('click', () => setDrawer(!drawer.classList.contains('open')));
  $('#drawerClose').addEventListener('click', closeDrawer);
  drawer.addEventListener('click', e => { if (e.target === drawer) closeDrawer(); });
  drawer.addEventListener('click', e => { if (e.target.closest('a')) closeDrawer(); });

  const echoPanel = $('#echoPanel');
  const echoText = $('#echoText');
  const echoJump = $('#echoJump');
  function setEcho(open) {
    echoPanel.classList.toggle('open', open);
    echoPanel.setAttribute('aria-hidden', String(!open));
    $('#echoFab').setAttribute('aria-expanded', String(open));
  }
  $('#echoFab').addEventListener('click', () => setEcho(!echoPanel.classList.contains('open')));
  $('#echoClose').addEventListener('click', () => setEcho(false));
  const echoTips = {
    first: ['Start at The Twilight Zone. It gives you the M.E.G. story and the easiest connection to every zone.','#/visit','Open visitor hub →'],
    rides: ['The four headliners are Infinite Transit, The Last Dive, Karma and M.E.G. Containment Protocol.','#/attractions','Explore all attractions →'],
    green: ['Solar power, recycling, closed-loop water, sustainable construction and biodiversity are built into the concept.','#/sustainability','See sustainability →'],
    today: ['The park opens at 9:00 AM. “Signals Through the Backrooms” begins at 9:30 PM and the park closes at 10:00 PM.','#/schedule','See full schedule →'],
    shop: ['The current catalog has 46 priced products, plus a separate archive of earlier M.E.G. Survival Kit concepts.','#/shop','Browse shop →']
  };
  $$('[data-echo]').forEach(b => b.addEventListener('click', () => {
    const [text, href, label] = echoTips[b.dataset.echo] || echoTips.first;
    echoText.textContent = text;
    echoJump.href = href;
    echoJump.textContent = label;
    setEcho(true);
  }));

  function openLightbox(src, title = '') {
    const d = $('#lightbox');
    $('#lightboxImage').src = src;
    $('#lightboxTitle').textContent = title;
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open','');
  }
  function closeLightbox() {
    const d = $('#lightbox');
    if (d.open && typeof d.close === 'function') d.close(); else d.removeAttribute('open');
  }
  $('#lightboxClose').addEventListener('click', closeLightbox);
  $('#lightbox').addEventListener('click', e => { if (e.target === $('#lightbox')) closeLightbox(); });

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeDrawer();
      setEcho(false);
      setCart(false);
      closeLightbox();
    }
  });

  function routeFromPathname() {
    const raw = location.pathname.replace(/\/index\.html$/i, '/').replace(/^\/+|\/+$/g, '');
    if (!raw) return 'home';
    const parts = raw.split('/');
    const knownStarts = ['park','attractions','experience','characters','guide','learn','sustainability','ecosystem','visit','tickets','schedule','dining','shop','business','feedback','archive','dossier','routes'];
    const start = parts.findIndex(x => knownStarts.includes(x.toLowerCase()));
    if (start < 0) return 'home';
    let r = parts.slice(start).join('/').replace(/\.html$/i, '');
    const oldMap = {
      'attractions/infinite-transit':'attractions/infinite-transit',
      'attractions/the-last-dive':'attractions/the-last-dive',
      'attractions/karma':'attractions/karma',
      'attractions/containment-protocol':'attractions/containment-protocol',
      'shop/premium':'shop/premium','shop/apparel':'shop/apparel','shop/kids':'shop/kids'
    };
    return oldMap[r] || r || 'home';
  }

  window.addEventListener('hashchange', render);
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister())).catch(() => {});
    if ('caches' in window) caches.keys().then(keys => keys.filter(k => k.toLowerCase().includes('elsewhere')).forEach(k => caches.delete(k))).catch(() => {});
    if (!location.hash) history.replaceState(null, '', location.pathname + location.search + '#/' + routeFromPathname());
    render();
    renderCart();
  });
})();
