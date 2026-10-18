// Content transcribed from the Figma file "Archive" (page "Archive copy edits").
const img = (name) => `${import.meta.env.BASE_URL}images/${name}.webp`

export const categories = [
  { id: 'photography', label: 'Photography' },
  { id: 'music', label: 'Music' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'design', label: 'Design' },
]

export const banners = {
  photography: { title: 'Photography', image: img('banner-photography') },
  music: { title: 'MUSIC', image: img('banner-music') },
  fashion: { title: 'FASHION', image: img('banner-fashion') },
  design: { title: 'DESIGN', image: img('banner-design') },
}
export const bannerSubtitle = 'Nigeria through the lens of time'

export const hero = {
  image: img('hero'),
  tagline: 'Discover Nigeria’s culture, past and present.',
  title: ['Our Culture.', 'Our Stories.', 'Our Legacy.'],
}

export const photography = [
  {
    slug: 'studio-portraits',
    title: 'Studio portraits',
    summary:
      "Vintage portraits of individuals, couples, and families. These reveal past generations' fashion, self-expression, photographic poses, and studio traditions.",
    image: img('photo-studio-portraits'),
  },
  {
    slug: 'everyday-nigerian-life',
    title: 'Everyday Nigerian life',
    summary:
      'Street scenes, markets, public transport, schools, and family gatherings. These images make social history personal and relatable.',
    image: img('photo-everyday-life'),
  },
  {
    slug: 'people-behind-the-lens',
    title: 'The people behind the lens',
    summary:
      'Feature documented work by photographers such as Jonathan Adagogo Green, Solomon Osagie Alonge, and Sunmi Smart-Cole.',
    image: img('photo-behind-the-lens'),
  },
]

export const photoStrip = [1, 2, 3, 4, 5].map((n) => img(`strip-${n}`))

export const music = [
  { era: '1950s–1960s', title: 'Taxi Driver', artist: 'Bobby Benson', key: '5060', search: 'Bobby Benson Taxi Driver' },
  { era: '1970s', title: 'Water No Get Enemy', artist: 'Fela Kuti', key: '70s', search: 'Fela Kuti Water No Get Enemy' },
  { era: '1980s–1990s', title: 'Juju Music', artist: 'King Sunny Adé', key: '8090', search: 'King Sunny Ade Ja Funmi', artistMatch: 'Sunny' },
  { era: '2000s', title: 'African Queen', artist: '2Face Idibia (2Baba)', key: '2000s', search: '2face Idibia African Queen', artistMatch: '2face' },
].map((m) => ({
  ...m,
  cover: img(`music-${m.key}-cover`),
  left: img(`music-${m.key}-left`),
  right: img(`music-${m.key}-right`),
}))
export const vinyl = img('vinyl')

export const fashion = [
  {
    slug: 'aso-oke',
    title: 'Aṣọ òkè',
    date: 'Late 19th century',
    caption: 'A handwoven cotton textile with openwork patterns associated with Yoruba ceremonial traditions.',
    images: [img('fashion-asooke-1'), img('fashion-asooke-2'), img('fashion-asooke-3')],
  },
  {
    slug: 'adire',
    title: 'Adire',
    date: 'Acquired in 1971',
    caption: 'An indigo-dyed cotton cloth created using stitch-resist and tie-dye techniques.',
    images: [img('fashion-adire-3'), img('fashion-adire-1'), img('fashion-adire-2')],
  },
  {
    slug: 'akwete',
    title: 'Akwete',
    date: 'Early 1990s',
    caption:
      "A handwoven wrapper made by an Akwete women's weaving cooperative, illustrating the complexity of Igbo textile traditions and supplementary-weft patterning.",
    images: [img('fashion-akwete-1'), img('fashion-akwete-2'), img('fashion-akwete-3')],
  },
]

export const festac = {
  slug: 'festac-77-poster',
  title: 'FESTAC ’77',
  caption:
    'A bold yellow poster built around a black map of Africa and a sunburst of red and green rays. The festival badge anchors the base, and dancing figures frame the edges.',
  image: img('design-festac'),
}

// Two columns, in the order they appear in the design.
export const designColumns = [
  [
    { title: 'The guardian', year: '1960', tag: 'Newspaper', image: img('design-guardian') },
    { title: 'Things fall apart', year: '1958', tag: 'Book Design', image: img('design-things-fall-apart'), slug: 'things-fall-apart' },
    { title: 'Textile print design', year: '1980s', tag: 'Surface Design', image: img('design-textile-print') },
  ],
  [
    { title: 'Highlife Album Cover', year: '1960', tag: 'Music Design', image: img('design-highlife') },
    { title: 'Bournvita Tin', year: '1970s', tag: 'Packaging', image: img('design-bournvita'), slug: 'bournvita-tin' },
    { title: 'Drum magazine cover', year: '1950s', tag: 'Magazine Design', image: img('design-drum'), slug: 'drum-magazine-cover' },
  ],
]

export const footer = {
  tagline: 'Our culture. Our stories. Our legacy.',
  blurb:
    'A digital home for Nigerian creative heritage. Discover the photographs, sounds, styles, and designs that connect generations and preserve our stories for the future.',
  about: [
    { label: 'Our Mission', to: '/info/mission' },
    { label: 'About the Archive', to: '/info/about' },
    { label: 'Contribute', to: '/info/contribute' },
    { label: 'Contact Us', to: '/info/contact' },
  ],
}

// Detail pages ("Fashion details", "Design details", "Photography details" frames).
export const details = {
  'aso-oke': {
    category: 'fashion',
    title: 'Aṣọ òkè',
    size: 'lg',
    meta: ['Yoruba prestige cloth'],
    thumb: img('detail-asooke-thumb'),
    body: [
      'Aṣọ òkè means "top cloth" in Yoruba. It is woven by hand in narrow strips of cotton and silk, then stitched into wrappers and robes for ceremonies.',
      'Its name dates to the late 19th century, when Lagos merchants labelled cloth from the Iseyin hinterland.',
    ],
    image: { src: img('detail-asooke-loom'), alt: 'A weaver working narrow strips of aṣọ òkè on a loom', ratio: '306 / 200' },
    listLabel: 'Three classic types still shape the cloth today:',
    list: ['Etu in indigo blue', 'Sanyan in wild-silk beige', 'Alaari in crimson'],
  },
  adire: {
    category: 'fashion',
    title: 'Adire',
    size: 'lg',
    meta: ['Acquired in 1971'],
    thumb: img('detail-adire-thumb'),
    body: [
      'Adire means "tied and dyed" in Yoruba. Women make it by blocking dye from parts of a cotton cloth with raffia ties, stitching or painted starch, then dipping it in indigo until the blue runs deep.',
      'Imported shirting sparked a boom in Abeokuta and Ibadan in the early 1900s, and in the 1920s traders bought up to 2,000 wrappers in a single day.',
    ],
    image: { src: img('detail-adire-wide'), alt: 'Women wearing indigo adire cloth', ratio: '321 / 200' },
    after: 'Synthetic dyes and falling quality caused a collapse by the late 1930s, but a revival in the 1960s kept the starch-resist designs alive into the early 1970s.',
  },
  akwete: {
    category: 'fashion',
    title: 'Akwete',
    size: 'lg',
    meta: ["Igbo women's hand-woven cloth", '', 'Early 1990s'],
    thumb: img('detail-akwete-thumb'),
    body: [
      'Akwete is named for the town of Akwete in Abia State and is woven by Igbo women on an upright loom. Extra weft threads, heavier or in contrasting colours, are worked in to form patterns such as triangles and diamonds. The cloth grew in the 19th century, when Akwete women copied cloth traded by their Ijo patrons, and legend credits a weaver named Dada Nwakata',
    ],
    image: { src: img('detail-akwete-wide'), alt: 'Akwete cloth', ratio: '314 / 200' },
    after: "Today it remains a women's craft, guarded by a weavers' collective that protects quality and copyright.",
  },
  'festac-77-poster': {
    category: 'design',
    title: 'FESTAC ’77 poster',
    meta: ['Poster design', '1977'],
    body: [
      'A bold yellow poster for the 2nd World Black and African Festival of Arts and Culture, built around a black map of Africa and a sunburst of red and green rays. The festival badge anchors the base, and dancing figures frame the edges.',
    ],
    image: { src: img('detail-festac'), alt: 'The FESTAC ’77 festival poster', ratio: '306 / 280' },
    listLabel: 'Look closer:',
    list: ['Four colours: yellow, red, green and black', 'A black map of Africa at the centre', 'A ring of figures in the festival badge'],
  },
  'things-fall-apart': {
    category: 'design',
    title: 'Things Fall Apart',
    meta: ['Book design', 'First published 1958'],
    body: [
      'Chinua Achebe’s novel, first published in 1958, has worn many covers since. Each shows how artists pictured Igbo life and its meeting with colonial rule.',
    ],
    image: { src: img('detail-things-fall-apart'), alt: 'Covers of Things Fall Apart', ratio: '306 / 496' },
    listLabel: 'Look closer:',
    list: ['The title lettered into the artwork', 'A map of Africa taking shape', 'Faces and figures woven into the scene'],
  },
  'drum-magazine-cover': {
    category: 'design',
    title: 'Drum magazine cover',
    meta: ['Magazine design', 'February 1955'],
    body: [
      'Drum began in South Africa in 1951, and its Nigerian edition was arguably the most successful and profitable of all its editions. Its bold covers and photographs showed urban life in a new era.',
    ],
    image: { src: img('detail-drum'), alt: 'A Drum magazine cover from February 1955', ratio: '306 / 403' },
    listLabel: 'Look closer:',
    list: ['The tagline: Africa’s leading magazine', 'A cover price of 6d', 'Dancers caught in motion'],
  },
  'bournvita-tin': {
    category: 'design',
    title: 'Bournvita tin',
    meta: ['Packaging', '1970s'],
    body: ['A malted chocolate drink from Cadbury, sold in tins whose bold label made packaging part of everyday design.'],
    image: { src: img('detail-bournvita'), alt: 'A Cadbury Bournvita tin', ratio: '306 / 397' },
    listLabel: 'Look closer:',
    list: ['The Cadbury’s name in script', '“Make with milk” on the label', 'A red tin with a wide, bold label'],
  },
  'studio-portraits': {
    category: 'photography',
    title: 'Studio portraits',
    meta: ['Photography', 'Lagos, from the 1880s'],
    body: [
      'Vintage portraits of individuals, couples and families that reveal past generations’ fashion, self-expression, photographic poses and studio traditions.',
      'Professional studios were operating in Lagos from 1880, often run by Sierra Leoneans, Liberians or Brazilians living in Nigeria. For Lagosians, a portrait was a way to present themselves as they wished to be seen.',
    ],
    image: { src: img('detail-studio-portrait'), alt: 'A studio portrait of a woman in a tied head wrap', ratio: '254 / 384', framed: true },
    listLabel: 'Look closer:',
    list: ['The tied head wrap', 'The patterned fabric of the dress', 'A direct, steady gaze'],
  },
  'everyday-nigerian-life': {
    category: 'photography',
    title: 'Everyday Nigerian life',
    meta: ['Photography', 'Street scenes'],
    body: [
      'Street scenes, markets, public transport, schools and family gatherings. These images make social history personal and relatable.',
      'Photography as a profession boomed in the 1950s and 1960s, when photographers such as Jackie Philips, Billyrose and Sunmi Smart-Cole were prominent.',
    ],
    image: { src: img('detail-everyday-life'), alt: 'Four women walking down a Lagos street', ratio: '1 / 1' },
    listLabel: 'Look closer:',
    list: ['Four women walking side by side', 'A high-rise towering over the street', 'Clothes that show the style of the day'],
  },
  'people-behind-the-lens': {
    category: 'photography',
    title: 'The people behind the lens',
    meta: ['Photography', 'The photographers'],
    body: [
      'Documented work by photographers such as Jonathan Adagogo Green, Solomon Osagie Alonge and Sunmi Smart-Cole.',
      'Green (1873 to 1905) was one of Nigeria’s first professional photographers, working from a studio in Bonny. In the 1930s, Alonge became the first official photographer for the royal court of Benin City. Smart-Cole opened his gallery of photography in Yaba, Lagos, in 1990.',
    ],
    image: { src: img('detail-behind-the-lens'), alt: 'Two people looking at a camera', ratio: '1 / 1' },
    listLabel: 'Who they are:',
    list: ['J. A. Green: Bonny, 1873 to 1905', 'S. O. Alonge: Benin City court', 'Sunmi Smart-Cole: Lagos photojournalist'],
  },
}

// Everything that can be found with search.
export const searchIndex = [
  ...Object.entries(details).map(([slug, d]) => ({
    key: slug,
    title: d.title,
    category: d.category,
    subtitle: d.meta.filter(Boolean).join(' · '),
    text: [...d.body, d.after, ...(d.list || [])].filter(Boolean).join(' '),
    image: d.thumb || d.image.src,
    to: `/${d.category}/${slug}`,
  })),
  ...designColumns.flat().filter((d) => !d.slug).map((d) => ({
    key: d.title,
    title: d.title,
    category: 'design',
    subtitle: `${d.tag} · ${d.year}`,
    text: d.tag,
    image: d.image,
    to: '/#design',
  })),
  ...music.map((m) => ({
    key: m.title,
    title: m.title,
    category: 'music',
    subtitle: `${m.artist} · ${m.era}`,
    text: m.artist,
    image: m.cover,
    to: `/#music-${m.key}`,
  })),
]

export const infoPages = {
  mission: {
    title: 'Our Mission',
    lead: 'To keep Nigeria’s creative memory open, accurate and easy to explore.',
    sections: [
      ['Preserve', 'We gather photographs, recordings, cloth and printed design that tell the story of everyday creativity in Nigeria, and keep them in a form that will outlast the originals.'],
      ['Explain', 'Every piece comes with plain-language context: who made it, when, and what to look for, so that a first-time visitor and a researcher both leave knowing more.'],
      ['Share', 'The archive is free to browse. We credit makers and lenders, and we welcome corrections from the communities the work comes from.'],
    ],
  },
  about: {
    title: 'About the Archive',
    lead: 'A digital home for Nigerian creative heritage, organised in four collections.',
    sections: [
      ['Photography', 'Studio portraits, street scenes and the photographers who recorded them, from the 1880s to the present.'],
      ['Music', 'Records and artists across the decades, from 1950s highlife to 2000s pop.'],
      ['Fashion', 'Aṣọ òkè, adire and akwete: the woven and dyed cloths that dress ceremonies and daily life.'],
      ['Design', 'Posters, book covers, magazines and packaging that shaped how Nigeria looked and read.'],
    ],
  },
  contribute: {
    title: 'Contribute',
    lead: 'Have a photograph, record, cloth or printed piece with a story? Tell us about it.',
    form: 'contribute',
  },
  contact: {
    title: 'Contact Us',
    lead: 'Questions, corrections or partnership ideas. We read every message.',
    form: 'contact',
  },
}
