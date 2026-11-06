/* Stories page: real reporting on Durban's temporary relocation sites. Headlines, dates and summaries are each publisher's own (fetched from the article page). Built from data/sites.js sources plus the Feb 2025 Lamontville coverage. */
const STORIES = [
 {
  "title": "Flood victims lose court bid for emergency housing",
  "pub": "GroundUp",
  "date": "2026-08-12",
  "url": "https://groundup.org.za/article/flood-victims-sleep-outside-in-the-cold-after-losing-emergency-housing-court-bid/",
  "sites": [
   "montclair",
   "point"
  ],
  "tags": [
   "Government",
   "Relocation"
  ],
  "dek": "Magistrate dismisses application by Point Road families",
  "img": "",
  "video": false
 },
 {
  "title": "KZN flood victims sleep outside in the rain after eviction from emergency housing",
  "pub": "GroundUp",
  "date": "2026-07-31",
  "url": "https://groundup.org.za/article/kzn-flood-victims-sleep-outside-after-eviction-from-temporary-accommodation/",
  "sites": [
   "point"
  ],
  "tags": [
   "Relocation"
  ],
  "dek": "EThekwini municipality says the group did not qualify for housing assistance",
  "img": "",
  "video": false
 },
 {
  "title": "Durban flood victims finally receive keys to new homes, four years later",
  "pub": "IOL",
  "date": "2026-05-18",
  "url": "https://iol.co.za/news/south-africa/kwazulu-natal/2026-05-18-durban-flood-victims-finally-receive-keys-to-new-homes-four-years-later/",
  "sites": [
   "crystal"
  ],
  "tags": [
   "Housing",
   "Government"
  ],
  "dek": "After years of living in transitional accommodation, Durban flood victims are finally receiving keys to their new homes, marking a new chapter filled with hope and gratitude.",
  "img": "",
  "video": false
 },
 {
  "title": "KZN flood victims stuck in emergency housing, three years later",
  "pub": "GroundUp",
  "date": "2026-02-11",
  "url": "https://groundup.org.za/article/kzn-flood-victims-stuck-in-emergency-housing-three-years-later/",
  "sites": [
   "astra",
   "crystal",
   "kwadimba"
  ],
  "tags": [
   "Housing",
   "Government"
  ],
  "dek": "Hundreds of families are living in apartment buildings leased by the City of eThekwini",
  "img": "",
  "video": false
 },
 {
  "title": "Flood victims struggle with 'strict' rules at temporary accommodation",
  "pub": "Sunday Tribune",
  "date": "2025-10-05",
  "url": "https://sundaytribune.co.za/news/2025-10-05-flood-victims-struggle-with-strict-rules-at-temporary-accommodation/",
  "sites": [
   "umbilo"
  ],
  "tags": [
   "Housing",
   "Residents"
  ],
  "dek": "Flood victims from Lamontville who lost their homes in February's devastating floods are struggling with strict rules at their temporary accommodation in Umbilo. Banned from having visitors, subject to curfews, and prohibited…",
  "img": "",
  "video": false
 },
 {
  "title": "DA calls for rights commission, Public Protector to probe ‘neglect’ of evicted KZN flood victims",
  "pub": "Daily Maverick",
  "date": "2025-07-15",
  "url": "https://www.dailymaverick.co.za/article/2025-07-15-kzn-flood-aftermath-da-calls-for-probe-after-victims-evicted/",
  "sites": [
   "bayside",
   "umbilo"
  ],
  "tags": [
   "Government"
  ],
  "dek": "The DA also says it will table a motion of no confidence against the city manager, the mayor and two council members after the flood victims were evicted from their Durban accommodation.",
  "img": "",
  "video": false
 },
 {
  "title": "Eviction forces flood victims to spend freezing night on pavements",
  "pub": "Berea Mail",
  "date": "2025-07-10",
  "url": "https://www.citizen.co.za/berea-mail/news-headlines/local-news/2025/07/10/eviction-forces-flood-victims-to-spend-freezing-night-on-pavements/",
  "sites": [
   "bayside"
  ],
  "tags": [
   "Relocation"
  ],
  "dek": "Scores of evicted tenants were thrown onto the street, with toddlers walking about, the elderly clutching their belongings, furniture lying about, frozen foods melting, and babies screaming from their mothers’ backs.",
  "img": "",
  "video": false
 },
 {
  "title": "More than 20 dead and hundreds displaced in KZN floods",
  "pub": "GroundUp",
  "date": "2025-03-05",
  "url": "https://groundup.org.za/article/over-20-people-died-and-hundreds-relocated-following-recent-kzn-floods/",
  "sites": [
   "gwala",
   "lamontville"
  ],
  "tags": [
   "Floods",
   "Relocation"
  ],
  "dek": "Sithembiso Mbutho died crossing the Mthwalume River. Residents have been pleading for the government to build a bridge",
  "img": "assets/photos/gu_lamontville_relocation_2025.jpg",
  "video": false
 },
 {
  "title": "Lamontville flood victims' flagging hope for formal abodes",
  "pub": "Daily News",
  "date": "2025-03-05",
  "url": "https://iol.co.za/dailynews/news/2025-03-05-lamontville-flood-victims-flagging-hope-for-formal-abodes/",
  "sites": [
   "gwala"
  ],
  "tags": [
   "Housing",
   "Government"
  ],
  "dek": "During a community meeting on Tuesday evening, the residents voiced their frustration and feelings of abandonment by the government.",
  "img": "",
  "video": false
 },
 {
  "title": "KZN floods: Five bodies recovered in Lamontville",
  "pub": "The Witness",
  "date": "2025-02-26",
  "url": "https://witness.co.za/news/2025/02/26/kzn-floods-five-bodies-recovered-in-lamontville/",
  "sites": [
   "lamontville"
  ],
  "tags": [
   "Floods"
  ],
  "dek": "The bodies of two men and three children who were swept away into a canal during the early hours of the morning have been recovered.",
  "img": "",
  "video": false
 },
 {
  "title": "Floods: Lamontville family mourns loss of three children",
  "pub": "Newzroom Afrika",
  "date": "2025-02-26",
  "url": "https://www.youtube.com/watch?v=MQCQF-rsvB4",
  "sites": [
   "lamontville"
  ],
  "tags": [
   "Floods",
   "Residents"
  ],
  "dek": "Search and rescue operations are underway in parts of KwaZulu-Natal following severe flooding. Heavy rain has battered the province and several people were s...",
  "img": "",
  "video": true
 },
 {
  "title": "Grieving mother calls for urgent relocation after deadly floods in Durban",
  "pub": "IOL",
  "date": "2025-02-26",
  "url": "https://iol.co.za/dailynews/news/2025-02-26-grieving-mother-calls-for-urgent-relocation-after-deadly-floods-in-durban/",
  "sites": [
   "lamontville"
  ],
  "tags": [
   "Floods",
   "Residents"
  ],
  "dek": "Now, as the destitute residents of the transit camp in Lamontville, who warned of a looming disaster last year, live to tell the harrowing tale following the death of seven people who were swept away, the death toll was…",
  "img": "",
  "video": false
 },
 {
  "title": "A mother’s plea for help after losing her three children in KZN floods",
  "pub": "IOL",
  "date": "2025-02-26",
  "url": "https://www.iol.co.za/news/south-africa/a-mothers-plea-for-help-after-losing-her-three-children-in-kzn-floods-edb38d5f-81d3-40ea-bd63-c87a3f59ab74",
  "sites": [
   "lamontville"
  ],
  "tags": [
   "Floods",
   "Residents"
  ],
  "dek": "After losing three children in the devastating Durban floods, Lulama Dingiswayo has called for the urgent relocation of families from the Gwala Street Transit Camp.",
  "img": "",
  "video": false,
  "pin": "lamontville"
 },
 {
  "title": "Tragedy strikes Lamontville as heavy rains claim lives amid previous community warnings",
  "pub": "Daily News",
  "date": "2025-02-26",
  "url": "https://iol.co.za/dailynews/news/2025-02-26-tragedy-strikes-lamontville-as-heavy-rains-claim-lives-amid-previous-community-warnings/",
  "sites": [
   "lamontville"
  ],
  "tags": [
   "Floods"
  ],
  "dek": "They warned that disaster loomed, as many homes, made of corrugated iron, sat less than ten metres from the banks of the uMlazi River, where the five people met their fate.",
  "img": "",
  "video": false
 },
 {
  "title": "These Inanda families have to walk to a primary school to use the toilet",
  "pub": "GroundUp",
  "date": "2024-06-10",
  "url": "https://groundup.org.za/article/these-inanda-families-have-to-walk-to-a-primary-school-to-use-the-toilet/",
  "sites": [
   "congo"
  ],
  "tags": [
   "Housing"
  ],
  "dek": "Victims of 2022 floods are still living in a “transit camp”",
  "img": "",
  "video": false
 },
 {
  "title": "No power for the forgotten flood victims",
  "pub": "Daily News",
  "date": "2024-06-10",
  "url": "https://iol.co.za/dailynews/news/2024-06-10-no-power-for-the-forgotten-flood-victims/",
  "sites": [
   "gwala",
   "lindelani"
  ],
  "tags": [
   "Housing"
  ],
  "dek": "The oldest transit camps within eThekwini Metropolitan Municipality host different generations of residents, with some from as far back as 2007 and 2013 to as recent as 2018-2020.",
  "img": "",
  "video": false
 },
 {
  "title": "PICS: ‘Our people live in squalor”",
  "pub": "Daily News",
  "date": "2024-05-08",
  "url": "https://www.iol.co.za/dailynews/news/pics-our-people-live-in-squalor-c144fa53-50db-485a-8415-e5ee74a35db2",
  "sites": [
   "gwala"
  ],
  "tags": [
   "Housing",
   "Residents"
  ],
  "dek": "Destitute residents who have been living in a transit camp in Lamontville near Mega City Mall since 2008, said they are now fed up and have resorted to blocking political parties from campaigning there.",
  "img": "",
  "video": false
 },
 {
  "title": "Media Statement: Committee on Flood Disaster Calls on Ethekwini Municipality to Find Permanent Accommodation for Flood Victims - Parliament of South Africa",
  "pub": "Parliament of RSA",
  "date": "2023-06-01",
  "url": "https://www.parliament.gov.za/press-releases/media-statement-committee-flood-disaster-calls-ethekwini-municipality-find-permanent-accommodation-flood-victims",
  "sites": [
   "frazer"
  ],
  "tags": [
   "Government"
  ],
  "dek": "",
  "img": "",
  "video": false,
  "approx": true
 },
 {
  "title": "Durban flood victims accuse government of not keeping its promises",
  "pub": "GroundUp",
  "date": "2023-04-24",
  "url": "https://groundup.org.za/article/durban-flood-victims-in-emergency-housing-accuse-government-of-not-keeping-its-promises/",
  "sites": [
   "astra",
   "point"
  ],
  "tags": [
   "Government"
  ],
  "dek": "We spoke to families living in emergency accommodation near the city centre",
  "img": "",
  "video": false
 },
 {
  "title": "One year on, KZN flood victims, living in temporary housing, are hopeful of getting permanent homes",
  "pub": "The Mercury",
  "date": "2023-04-14",
  "url": "https://iol.co.za/mercury/news/2023-04-14-one-year-on-kzn-flood-victims-living-in-temporary-housing-are-hopeful-of-getting-permanent-homes/",
  "sites": [
   "astra"
  ],
  "tags": [
   "Housing"
  ],
  "dek": "People who spoke to The Mercury yesterday are among a group of more than 500 who were moved to Astra Building, Russell Street, in the Durban CBD in December last year.",
  "img": "",
  "video": false
 },
 {
  "title": "eThekwini Municipality making headway in the relocation of flood victims, closing mass care centres by December 15",
  "pub": "Daily News",
  "date": "2022-11-10",
  "url": "https://iol.co.za/dailynews/news/kwazulu-natal/2022-11-10-ethekwini-municipality-making-headway-in-the-relocation-of-flood-victims-closing-mass-care-centres-by-december-15/",
  "sites": [
   "frazer"
  ],
  "tags": [
   "Relocation",
   "Government"
  ],
  "dek": "From the original 120 mass care centres occupied by the April and May 2022 flood victims, 62 of these have been closed through various interventions.",
  "img": "",
  "video": false
 },
 {
  "title": "Evicted flood victims to be housed in Montclair Lodge again",
  "pub": "Daily News",
  "date": "2022-09-02",
  "url": "https://dailynews.co.za/news/kwazulu-natal/2022-09-02-evicted-flood-victims-to-be-housed-in-montclair-lodge-again/",
  "sites": [
   "montclair"
  ],
  "tags": [
   "Relocation"
  ],
  "dek": "SA Human Rights Commission Commissioner Philile Ntuli called for more consequence management and accountability.",
  "img": "",
  "video": false
 },
 {
  "title": "Some Durban flood victims have been moved four times",
  "pub": "GroundUp",
  "date": "2022-06-08",
  "url": "https://groundup.org.za/article/we-have-been-moved-from-one-place-to-another-says-durban-flood-victim/",
  "sites": [
   "lamontville"
  ],
  "tags": [
   "Relocation"
  ],
  "dek": "About 100 households living at a transit camp in Lamontville have been uprooted several times",
  "img": "assets/photos/gu_lamontville_camp_2022.jpg",
  "video": false
 },
 {
  "title": "Human Rights Day? No human rights for eThekwini’s Umlazi flood victims three years down the line",
  "pub": "Daily Maverick",
  "date": "2022-03-23",
  "url": "https://www.dailymaverick.co.za/opinionista/2022-03-23-human-rights-day-no-human-rights-for-ethekwinis-umlazi-flood-victims-three-years-down-the-line/",
  "sites": [
   "lamontville"
  ],
  "tags": [
   "Government",
   "Residents"
  ],
  "dek": "The plight of eThekwini flood victims reveals the depth of the ANC-led local government’s complete disregard for human rights.",
  "img": "",
  "video": false
 }
];
