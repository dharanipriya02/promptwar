const ACTIVITY_POOL = {
  trek: {morning:['Sunrise trek','Trail hike','Mountain viewpoint'],afternoon:['Valley exploration','Waterfall visit','Nature photography'],evening:['Campfire dinner','Stargazing','Hot springs']},
  couple: {morning:['Breakfast with a view','Couples spa','Market stroll'],afternoon:['Scenic boat ride','Wine tasting','Cooking class'],evening:['Candlelit dinner','Sunset viewpoint','Night walk']},
  pilgrimage: {morning:['Temple visit','Morning prayer','Heritage walk'],afternoon:['Museum visit','Local craft workshop','Spiritual talk'],evening:['Evening ceremony','Meditation','Temple lights']},
  solo: {morning:['Cafe hopping','Free walking tour','Photography walk'],afternoon:['Museum deep-dive','Street food crawl','Local meetup'],evening:['Rooftop bar','Live music','Night market']},
  family: {morning:['Beach time','Zoo visit','Park exploration'],afternoon:['Interactive museum','Boat ride','Ice cream trail'],evening:['Family dinner','Night show','Board games']},
  adventure: {morning:['Paragliding','Scuba diving','Rock climbing'],afternoon:['Zip-lining','Kayaking','ATV ride'],evening:['BBQ dinner','Adventure stories','Gear check']},
  beach: {morning:['Sunrise beach walk','Snorkeling','Surfing lesson'],afternoon:['Beach club','Jet ski','Island hop'],evening:['Beach bonfire','Seafood dinner','Sunset cruise']},
  city: {morning:['Iconic landmark','Coffee culture','Architecture walk'],afternoon:['Shopping district','Food tour','Street art hunt'],evening:['Rooftop dining','Theatre show','Nightlife tour']},
  cultural: {morning:['Heritage site','Art gallery','Temple complex'],afternoon:['Craft workshop','Local market','Dance performance'],evening:['Traditional dinner','Cultural show','Night heritage walk']}
};

export function generateItinerary(destination, days, tripType, interests = []) {
  const type = tripType || (destination.tripTypes && destination.tripTypes[0]) || 'city';
  const pool = ACTIVITY_POOL[type] || ACTIVITY_POOL.city;
  const itinerary = [];

  for (let d = 1; d <= days; d++) {
    const dayPlan = {
      day: d,
      morning: { activity: pool.morning[d % pool.morning.length], time: '8:00 AM', duration: '3h', notes: '' },
      afternoon: { activity: pool.afternoon[d % pool.afternoon.length], time: '1:00 PM', duration: '3h', notes: '' },
      evening: { activity: pool.evening[d % pool.evening.length], time: '6:00 PM', duration: '3h', notes: '' }
    };

    // Add destination-specific attractions
    if (destination.topAttractions && destination.topAttractions[d - 1]) {
      dayPlan.morning.activity = `Visit ${destination.topAttractions[d - 1]}`;
    }

    itinerary.push(dayPlan);
  }

  return itinerary;
}

export const PACKING_PRESETS = {
  trek: ['Hiking boots','Rain jacket','Trekking poles','Water bottle','First aid kit','Headlamp','Thermal layers','Backpack cover'],
  couple: ['Smart casual outfits','Camera','Portable speaker','Sunscreen','Travel pillow'],
  pilgrimage: ['Modest clothing','Offerings','Comfortable shoes','Water bottle','Sun hat','Prayer beads'],
  solo: ['Day backpack','Portable charger','Lock','Journal','Multi-tool','Language phrasebook'],
  family: ['Snacks','First aid kit','Entertainment for kids','Sunscreen','Extra clothes','Wet wipes'],
  adventure: ['Quick-dry clothes','Action camera','Waterproof bag','Energy bars','Sunglasses','Gloves'],
  beach: ['Swimwear','Sunscreen SPF50','Beach towel','Flip flops','Snorkel gear','Waterproof phone pouch'],
  city: ['Comfortable walking shoes','Day bag','Umbrella','Adapter plug','City guide'],
  cultural: ['Modest clothing','Notebook','Camera','Comfortable shoes','Guidebook']
};
