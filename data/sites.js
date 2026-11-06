/* ============================================================
   EDIT HERE: site facts, photos and videos.
   photo: a file in this folder (e.g. "assets/photos/lamontville.jpg") or a web address.
   video: a YouTube link.
   Each condition is [colour, text]; colour is "red", "yellow", "green" or "grey".
   kind is "camp" (tent icon), "building" or "stop" (journey stop, no conditions).
   ============================================================ */
const SITES = [
 {
  "id": "lamontville",
  "name": "Lamontville riverside camp",
  "kind": "camp",
  "lat": -29.9537,
  "lon": 30.9455,
  "addr": "Gwala Street, Lamontville",
  "type": "Transit camp",
  "yin": 2021,
  "yclosed": null,
  "hh": "About 100 households",
  "flooded": "April 2022 and February 2025",
  "lead": [
   "Three children",
   "swept away in the February 2025 flood"
  ],
  "water": [
   "red",
   "One standpipe for more than 100 households"
  ],
  "san": [
   "red",
   "16 portable toilets, rarely cleaned; nowhere to wash"
  ],
  "safe": [
   "red",
   "Flooded twice; homes under 10 m from the river"
  ],
  "crowd": [
   "red",
   "A family of nine in one tin room"
  ],
  "extra": null,
  "journey": "j1",
  "cut": true,
  "photo": "",
  "video": "",
  "src": [
   [
    "GroundUp, Jun 2022",
    "https://groundup.org.za/article/we-have-been-moved-from-one-place-to-another-says-durban-flood-victim/"
   ],
   [
    "Daily Maverick, Mar 2022",
    "https://www.dailymaverick.co.za/opinionista/2022-03-23-human-rights-day-no-human-rights-for-ethekwinis-umlazi-flood-victims-three-years-down-the-line/"
   ],
   [
    "IOL, Feb 2025",
    "https://www.iol.co.za/news/south-africa/a-mothers-plea-for-help-after-losing-her-three-children-in-kzn-floods-edb38d5f-81d3-40ea-bd63-c87a3f59ab74"
   ]
  ]
 },
 {
  "id": "gwala",
  "name": "Larger Gwala Street camp",
  "kind": "camp",
  "lat": -29.953,
  "lon": 30.9462,
  "addr": "Gwala Street, Lamontville (eMathinini)",
  "type": "Transit camp",
  "yin": 2008,
  "yclosed": null,
  "hh": "“Thousands” of residents; no count published",
  "flooded": "Not confirmed",
  "lead": [
   "Since 2008",
   "flood victims placed here are still waiting"
  ],
  "water": [
   "yellow",
   "Inadequate; residents do their own repairs"
  ],
  "san": [
   "red",
   "Toilets broken; rubbish uncollected"
  ],
  "safe": [
   "red",
   "High crime reported by residents"
  ],
  "crowd": [
   "yellow",
   "Single iron rooms, described as congested"
  ],
  "extra": null,
  "journey": null,
  "cut": false,
  "photo": "",
  "video": "",
  "src": [
   [
    "Daily News, May 2024",
    "https://www.iol.co.za/dailynews/news/pics-our-people-live-in-squalor-c144fa53-50db-485a-8415-e5ee74a35db2"
   ],
   [
    "Daily News, Jun 2024",
    "https://iol.co.za/dailynews/news/2024-06-10-no-power-for-the-forgotten-flood-victims/"
   ],
   [
    "Daily News, Mar 2025",
    "https://iol.co.za/dailynews/news/2025-03-05-lamontville-flood-victims-flagging-hope-for-formal-abodes/"
   ]
  ]
 },
 {
  "id": "lindelani",
  "name": "Lindelani camp",
  "kind": "camp",
  "lat": -29.716,
  "lon": 30.935,
  "addr": "Lindelani",
  "type": "Transit camp",
  "yin": 2019,
  "yclosed": null,
  "hh": "Not reported",
  "flooded": "Not reported",
  "lead": [
   "13 people",
   "in one small unit; the family had to split up"
  ],
  "water": [
   "red",
   "Not enough water"
  ],
  "san": [
   "red",
   "Yards fouled because of the water shortage"
  ],
  "safe": [
   "grey",
   "Not reported"
  ],
  "crowd": [
   "red",
   "13 people in one small unit"
  ],
  "extra": null,
  "journey": null,
  "cut": false,
  "photo": "",
  "video": "",
  "src": [
   [
    "Daily News, Jun 2024",
    "https://iol.co.za/dailynews/news/2024-06-10-no-power-for-the-forgotten-flood-victims/"
   ]
  ]
 },
 {
  "id": "congo",
  "name": "Congo camp",
  "kind": "camp",
  "lat": -29.693826,
  "lon": 30.93531,
  "addr": "Beside Sekusile Primary School, Inanda",
  "type": "Transit camp",
  "yin": 2022,
  "yclosed": null,
  "hh": "About 250 people, including children",
  "flooded": "Not reported",
  "lead": [
   "Two rooms burned",
   "neighbours broke through the walls to get people out"
  ],
  "water": [
   "red",
   "Tank empty; the water tanker rarely comes"
  ],
  "san": [
   "red",
   "Toilets blocked and locked; residents use a school’s"
  ],
  "safe": [
   "red",
   "Fire from candles; board walls bent and broken"
  ],
  "crowd": [
   "yellow",
   "Nine people in two rooms"
  ],
  "extra": [
   "Power",
   "red",
   "No official electricity"
  ],
  "journey": "j4",
  "cut": false,
  "photo": "",
  "video": "",
  "src": [
   [
    "GroundUp, Jun 2024",
    "https://groundup.org.za/article/these-inanda-families-have-to-walk-to-a-primary-school-to-use-the-toilet/"
   ]
  ]
 },
 {
  "id": "astra",
  "name": "Astra Building",
  "kind": "building",
  "lat": -29.85789,
  "lon": 31.014773,
  "addr": "Russell Street, Durban",
  "type": "Rented building",
  "yin": 2022,
  "yclosed": null,
  "hh": "About 285 families (Feb 2026), down from 531",
  "flooded": "Not reported",
  "lead": [
   "Rooms shared with strangers",
   "for more than three years"
  ],
  "water": [
   "grey",
   "Not reported"
  ],
  "san": [
   "grey",
   "Not reported"
  ],
  "safe": [
   "yellow",
   "Frequent fights reported"
  ],
  "crowd": [
   "red",
   "Families share single rooms with strangers"
  ],
  "extra": null,
  "journey": null,
  "cut": false,
  "photo": "",
  "video": "",
  "src": [
   [
    "GroundUp, Feb 2026",
    "https://groundup.org.za/article/kzn-flood-victims-stuck-in-emergency-housing-three-years-later/"
   ],
   [
    "GroundUp, Apr 2023",
    "https://groundup.org.za/article/durban-flood-victims-in-emergency-housing-accuse-government-of-not-keeping-its-promises/"
   ],
   [
    "The Mercury, Apr 2023",
    "https://iol.co.za/mercury/news/2023-04-14-one-year-on-kzn-flood-victims-living-in-temporary-housing-are-hopeful-of-getting-permanent-homes/"
   ]
  ]
 },
 {
  "id": "crystal",
  "name": "Crystal Valley",
  "kind": "building",
  "lat": -29.808166,
  "lon": 30.970211,
  "addr": "120 O’Flaherty Road, Reservoir Hills",
  "type": "Rented apartment buildings",
  "yin": 2022,
  "yclosed": null,
  "hh": "About 300 families in three buildings",
  "flooded": "Not reported",
  "lead": [
   "No security",
   "residents run their own neighbourhood watch"
  ],
  "water": [
   "grey",
   "Not reported"
  ],
  "san": [
   "yellow",
   "Cleaned once or twice a week"
  ],
  "safe": [
   "yellow",
   "No security on site"
  ],
  "crowd": [
   "grey",
   "Not reported"
  ],
  "extra": null,
  "journey": null,
  "cut": false,
  "photo": "",
  "video": "",
  "src": [
   [
    "GroundUp, Feb 2026",
    "https://groundup.org.za/article/kzn-flood-victims-stuck-in-emergency-housing-three-years-later/"
   ],
   [
    "IOL, May 2026",
    "https://iol.co.za/news/south-africa/kwazulu-natal/2026-05-18-durban-flood-victims-finally-receive-keys-to-new-homes-four-years-later/"
   ]
  ]
 },
 {
  "id": "point",
  "name": "Point Road",
  "kind": "building",
  "lat": -29.868,
  "lon": 31.045,
  "addr": "Mahatma Gandhi (Point) Road, Durban",
  "type": "Rented building",
  "yin": 2022,
  "yclosed": 2026,
  "hh": "312 people (April 2023); about 100 families (2026)",
  "flooded": "Not reported",
  "lead": [
   "Locked out, July 2026",
   "about 17 people slept on the pavement"
  ],
  "water": [
   "grey",
   "Not reported"
  ],
  "san": [
   "grey",
   "Not reported"
  ],
  "safe": [
   "red",
   "Evicted when the city stopped renting"
  ],
  "crowd": [
   "red",
   "Four or five beds a room, shared with strangers"
  ],
  "extra": null,
  "journey": "j2",
  "cut": false,
  "photo": "",
  "video": "",
  "src": [
   [
    "GroundUp, Jul 2026",
    "https://groundup.org.za/article/kzn-flood-victims-sleep-outside-after-eviction-from-temporary-accommodation/"
   ],
   [
    "GroundUp, Aug 2026",
    "https://groundup.org.za/article/flood-victims-sleep-outside-in-the-cold-after-losing-emergency-housing-court-bid/"
   ],
   [
    "GroundUp, Apr 2023",
    "https://groundup.org.za/article/durban-flood-victims-in-emergency-housing-accuse-government-of-not-keeping-its-promises/"
   ]
  ]
 },
 {
  "id": "bayside",
  "name": "Bayside Hotel",
  "kind": "building",
  "lat": -29.855178,
  "lon": 31.033383,
  "addr": "110 Dr Pixley KaSeme Street, Durban",
  "type": "Hotel rented by the province",
  "yin": 2025,
  "yclosed": 2025,
  "hh": "Counts differ: 64 families, or “more than 150” people",
  "flooded": "Not reported",
  "lead": [
   "Evicted over an unpaid bill",
   "families with infants slept on the pavement"
  ],
  "water": [
   "grey",
   "Not reported"
  ],
  "san": [
   "grey",
   "Not reported"
  ],
  "safe": [
   "red",
   "Evicted after about four months"
  ],
  "crowd": [
   "grey",
   "Not reported"
  ],
  "extra": null,
  "journey": "j1",
  "cut": false,
  "photo": "",
  "video": "",
  "src": [
   [
    "Daily Maverick, Jul 2025",
    "https://www.dailymaverick.co.za/article/2025-07-15-kzn-flood-aftermath-da-calls-for-probe-after-victims-evicted/"
   ],
   [
    "Berea Mail, Jul 2025",
    "https://www.citizen.co.za/berea-mail/news-headlines/local-news/2025/07/10/eviction-forces-flood-victims-to-spend-freezing-night-on-pavements/"
   ]
  ]
 },
 {
  "id": "kwadimba",
  "name": "KwaDimba",
  "kind": "building",
  "lat": -29.853,
  "lon": 30.823,
  "addr": "KwaDimba, near Thornwood",
  "type": "Rented apartments",
  "yin": 2022,
  "yclosed": null,
  "hh": "Almost 40 people in one building",
  "flooded": "Not reported",
  "lead": [
   "One room per family",
   "a mother rents a second room near her work"
  ],
  "water": [
   "grey",
   "Not reported"
  ],
  "san": [
   "grey",
   "Not reported"
  ],
  "safe": [
   "yellow",
   "Frequent tension among residents"
  ],
  "crowd": [
   "red",
   "Each family lives in a single room"
  ],
  "extra": null,
  "journey": "j3",
  "cut": false,
  "photo": "",
  "video": "",
  "src": [
   [
    "GroundUp, Feb 2026",
    "https://groundup.org.za/article/kzn-flood-victims-stuck-in-emergency-housing-three-years-later/"
   ]
  ]
 },
 {
  "id": "frazer",
  "name": "Frazer Compound",
  "kind": "building",
  "lat": -29.535,
  "lon": 31.135,
  "addr": "Conway Farm, outside oThongathi",
  "type": "Compound",
  "yin": 2022,
  "yclosed": null,
  "hh": "118 families (June 2023), down from 163",
  "flooded": "Not reported",
  "lead": [
   "Water, power and safety",
   "all flagged by a Parliament committee in 2023"
  ],
  "water": [
   "yellow",
   "Water supply problems"
  ],
  "san": [
   "grey",
   "Not reported"
  ],
  "safe": [
   "yellow",
   "Safety problems flagged"
  ],
  "crowd": [
   "green",
   "Families have privacy"
  ],
  "extra": [
   "Power",
   "yellow",
   "Electricity supply problems"
  ],
  "journey": null,
  "cut": false,
  "photo": "",
  "video": "",
  "src": [
   [
    "Parliament, Jun 2023",
    "https://www.parliament.gov.za/press-releases/media-statement-committee-flood-disaster-calls-ethekwini-municipality-find-permanent-accommodation-flood-victims"
   ],
   [
    "Daily News, Nov 2022",
    "https://iol.co.za/dailynews/news/kwazulu-natal/2022-11-10-ethekwini-municipality-making-headway-in-the-relocation-of-flood-victims-closing-mass-care-centres-by-december-15/"
   ]
  ]
 },
 {
  "id": "montclair",
  "name": "Montclair Lodge",
  "kind": "stop",
  "lat": -29.919209,
  "lon": 30.972718,
  "addr": "58 Wood Road, Montclair",
  "type": "State-owned building",
  "yin": 2026,
  "yclosed": null,
  "hh": "84 families moved in from Point Road",
  "flooded": "Not reported",
  "lead": null,
  "water": [
   "grey",
   "Not reported"
  ],
  "san": [
   "grey",
   "Not reported"
  ],
  "safe": [
   "grey",
   "Not reported"
  ],
  "crowd": [
   "grey",
   "Not reported"
  ],
  "extra": null,
  "journey": "j2",
  "cut": false,
  "photo": "",
  "video": "",
  "src": [
   [
    "GroundUp, Aug 2026",
    "https://groundup.org.za/article/flood-victims-sleep-outside-in-the-cold-after-losing-emergency-housing-court-bid/"
   ],
   [
    "Daily News, Sep 2022",
    "https://dailynews.co.za/news/kwazulu-natal/2022-09-02-evicted-flood-victims-to-be-housed-in-montclair-lodge-again/"
   ]
  ]
 },
 {
  "id": "umbilo",
  "name": "Umbilo residence",
  "kind": "stop",
  "lat": -29.887,
  "lon": 30.985,
  "addr": "Umbilo, Durban",
  "type": "Former student residence",
  "yin": 2025,
  "yclosed": null,
  "hh": "Not reported",
  "flooded": "Not reported",
  "lead": null,
  "water": [
   "grey",
   "Not reported"
  ],
  "san": [
   "grey",
   "Not reported"
  ],
  "safe": [
   "grey",
   "Not reported"
  ],
  "crowd": [
   "grey",
   "Not reported"
  ],
  "extra": null,
  "journey": "j1",
  "cut": false,
  "photo": "",
  "video": "",
  "src": [
   [
    "Sunday Tribune, Oct 2025",
    "https://sundaytribune.co.za/news/2025-10-05-flood-victims-struggle-with-strict-rules-at-temporary-accommodation/"
   ],
   [
    "Daily Maverick, Jul 2025",
    "https://www.dailymaverick.co.za/article/2025-07-15-kzn-flood-aftermath-da-calls-for-probe-after-victims-evicted/"
   ]
  ]
 }
];

const JOURNEYS = {
 "j1": {
  "title": "From uMlazi to Umbilo",
  "sub": "Four moves in six years",
  "pts": [
   {
    "n": "Mega Village, uMlazi",
    "lat": -29.966,
    "lon": 30.905
   },
   {
    "n": "Tehuis Hostel",
    "lat": -29.966,
    "lon": 30.924
   },
   {
    "site": "lamontville"
   },
   {
    "site": "bayside"
   },
   {
    "site": "umbilo"
   }
  ],
  "legs": [
   [
    "Mega Village → tents at Tehuis Hostel",
    "April 2019 · homes flooded",
    "2019"
   ],
   [
    "Tehuis Hostel → Lamontville riverside camp",
    "2021 · after two years in tents",
    "2021"
   ],
   [
    "Lamontville camp → Bayside Hotel",
    "March 2025 · after the camp flooded a second time",
    "2025"
   ],
   [
    "Bayside Hotel → Umbilo residence",
    "July 2025 · evicted from the hotel",
    "2025"
   ]
  ]
 },
 "j2": {
  "title": "From Isipingo to Montclair",
  "sub": "Two moves in four years",
  "pts": [
   {
    "n": "Isipingo settlements",
    "lat": -29.99,
    "lon": 30.94
   },
   {
    "site": "point"
   },
   {
    "site": "montclair"
   }
  ],
  "legs": [
   [
    "Isipingo → Point Road",
    "2022 · informal settlements flooded",
    "2022"
   ],
   [
    "Point Road → Montclair Lodge",
    "June 2026 · 84 families moved before the building closed",
    "2026"
   ]
  ]
 },
 "j3": {
  "title": "From Shallcross to KwaDimba",
  "sub": "One move",
  "pts": [
   {
    "n": "Shallcross",
    "lat": -29.893,
    "lon": 30.872
   },
   {
    "site": "kwadimba"
   }
  ],
  "legs": [
   [
    "Shallcross → KwaDimba",
    "2022 · after the April floods",
    "2022"
   ]
  ]
 },
 "j4": {
  "title": "From Nhlungwane to the Congo camp",
  "sub": "One move, by way of a community hall",
  "pts": [
   {
    "n": "Nhlungwane",
    "lat": -29.709,
    "lon": 30.957
   },
   {
    "site": "congo"
   }
  ],
  "legs": [
   [
    "Nhlungwane → community hall → Congo camp",
    "2022 · after the April floods",
    "2022"
   ]
  ]
 }
};

const FLOODS = {
 "2019": {
  "when": "April 2019",
  "text": "Floods hit Durban. Families from uMlazi lose their homes and spend the next two years in tents.",
  "sites": []
 },
 "2022": {
  "when": "April 2022",
  "text": "The uMlazi River bursts its banks. The Lamontville riverside camp, open for one year, floods.",
  "sites": [
   "lamontville"
  ]
 },
 "2025": {
  "when": "February 2025",
  "text": "The Lamontville riverside camp floods again. More than 40 units are destroyed.",
  "sites": [
   "lamontville"
  ]
 }
};
