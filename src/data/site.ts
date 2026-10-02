// ===========================================================================
// TEMPLATE SETTINGS — start here. Replace every placeholder value below with
// your client's real info. Most of the site reads from this one file.
// ===========================================================================

export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Prefix an internal path (e.g. "/services/") with the site's base path. */
export const href = (p: string) => `${base}${p}`;

export const business = {
  name: 'Your Business Name',
  tagline: 'Where every pup leaves fresh, fluffy & happy.',
  owner: 'Owner Name',
  phone: '(555) 555-0123',
  phoneHref: 'tel:+15555550123',      // digits only, with country code
  phoneIntl: '+1-555-555-0123',       // used for search-engine data
  email: 'hello@example.com',
  street: '123 Main Street, Suite 100',
  city: 'Your City',
  state: 'ST',
  zip: '00000',

  // Opening hours. The "Open now / Closed" badge is calculated from these.
  hours: {
    daysLong: 'Monday – Friday',
    daysShort: 'Mon–Fri',
    closedDays: 'Saturday & Sunday',
    openDays: [1, 2, 3, 4, 5],        // 0 = Sunday … 6 = Saturday
    openHour: 9,                      // 24-hour clock
    closeHour: 17,
    timezone: 'America/Chicago',      // IANA time zone of the shop
  },

  // Big "social proof" number on the home page trust strip.
  stat: { value: '500+', label: 'happy pups groomed' },

  // Google Map on the Contact page. Turn on once a real address is set above.
  showMap: false,

  // Drop a file at public/media/hero.mp4 (+ optional hero-poster.jpg) and set this to '/media/hero.mp4'
  heroVideo: null as string | null,
};

const fmtHour = (h: number) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? 'am' : 'pm'}`;
export const hoursText = `${fmtHour(business.hours.openHour)} – ${fmtHour(business.hours.closeHour)}`;
export const hoursLine = `${business.hours.daysLong} · ${hoursText}`;
export const hoursShortLine = `${business.hours.daysShort} · ${hoursText.replace(' – ', '–')}`;
export const closedLine = `Closed ${business.hours.closedDays}`;
export const fullAddress = `${business.street}, ${business.city}, ${business.state} ${business.zip}`;
export const mapsQuery = encodeURIComponent(`${business.name}, ${fullAddress}`);

export const nav = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services/' },
  { label: 'Gallery', path: '/gallery/' },
  { label: 'About', path: '/about/' },
  { label: 'Contact', path: '/contact/' },
];

// Service names/descriptions/prices are SAMPLE values — edit freely.
// `id` picks the icon (see src/components/Icon.astro); `tint` picks the pastel tile color.
export type Service = { id: string; name: string; price: number; blurb: string; tint: string };
export const services: Service[] = [
  { id: 'full-groom', name: 'Full Groom', price: 80, tint: 'blue', blurb: 'Bath, brush-out and a breed-specific haircut styled just for your pup.' },
  { id: 'bath-brush', name: 'Bath & Brush', price: 50, tint: 'butter', blurb: 'A fluffy, fresh-smelling reset between full grooms — no haircut needed.' },
  { id: 'nail-paw', name: 'Nail Trim & Paw Care', price: 20, tint: 'peach', blurb: 'Gentle nail trims and tidy, comfy paws.' },
  { id: 'deshed', name: 'De-Shedding Treatment', price: 60, tint: 'mint', blurb: 'Loosens and lifts loose undercoat so there’s less fur on your couch.' },
  { id: 'puppy', name: 'Puppy’s First Groom', price: 40, tint: 'blue', blurb: 'A calm, positive first visit that teaches young pups grooming is nothing to fear.' },
  { id: 'teeth-ears', name: 'Teeth & Ear Care', price: 25, tint: 'butter', blurb: 'Fresher breath and clean ears — an easy add-on to any visit.' },
  { id: 'flea-tick', name: 'Flea & Tick Treatment', price: 65, tint: 'peach', blurb: 'A thorough treatment bath to help keep unwanted hitchhikers off your dog.' },
  { id: 'cat', name: 'Cat Grooming', price: 55, tint: 'mint', blurb: 'Patient, low-stress grooming for our feline friends.' },
];
