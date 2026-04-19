export type FamilyKey =
  | 'mila' | 'kian' | 'mama' | 'papa' | 'yangti' | 'yangkung' | 'oma'

export type Word = {
  id: string
  word: string
  en: string
  de: string
  emoji?: string
  family?: FamilyKey
}

export const WORDS: Record<string, Word> = {
  // Keluarga
  mama:      { id: 'mama',     word: 'mama',     en: 'mom',          de: 'Mama',       family: 'mama',     emoji: '👩' },
  papa:      { id: 'papa',     word: 'papa',     en: 'dad',          de: 'Papa',       family: 'papa',     emoji: '👨' },
  adik:      { id: 'adik',     word: 'adik',     en: 'little brother',de: 'kleiner Bruder', family: 'kian', emoji: '👦' },
  kakak:     { id: 'kakak',    word: 'kakak',    en: 'big sister',   de: 'große Schwester', family: 'mila',emoji: '👧' },
  yangti:    { id: 'yangti',   word: 'Yangti',   en: 'grandma (Jakarta)', de: 'Oma (Jakarta)', family: 'yangti', emoji: '👵' },
  yangkung:  { id: 'yangkung', word: 'Yangkung', en: 'grandpa (Jakarta)', de: 'Opa (Jakarta)', family: 'yangkung', emoji: '👴' },
  oma:       { id: 'oma',      word: 'Oma',      en: 'grandma (Nürnberg)', de: 'Oma (Nürnberg)', family: 'oma', emoji: '👵' },
  om:        { id: 'om',       word: 'om',       en: 'uncle',        de: 'Onkel',      emoji: '🧔' },
  tante:     { id: 'tante',    word: 'tante',    en: 'aunt',         de: 'Tante',      emoji: '👩‍🦰' },

  // Salam
  halo:      { id: 'halo',     word: 'halo',     en: 'hello',        de: 'hallo',      emoji: '👋' },
  pagi:      { id: 'pagi',     word: 'selamat pagi', en: 'good morning', de: 'guten Morgen', emoji: '🌅' },
  malam:     { id: 'malam',    word: 'selamat malam', en: 'good night', de: 'gute Nacht', emoji: '🌙' },
  tksh:      { id: 'tksh',     word: 'terima kasih', en: 'thank you',   de: 'danke',      emoji: '🙏' },
  jumpa:     { id: 'jumpa',    word: 'sampai jumpa', en: 'goodbye',     de: 'tschüss',    emoji: '🤚' },

  // Angka
  satu:      { id: 'satu',     word: 'satu',     en: 'one',          de: 'eins',       emoji: '1️⃣' },
  dua:       { id: 'dua',      word: 'dua',      en: 'two',          de: 'zwei',       emoji: '2️⃣' },
  tiga:      { id: 'tiga',     word: 'tiga',     en: 'three',        de: 'drei',       emoji: '3️⃣' },
  empat:     { id: 'empat',    word: 'empat',    en: 'four',         de: 'vier',       emoji: '4️⃣' },
  lima:      { id: 'lima',     word: 'lima',     en: 'five',         de: 'fünf',       emoji: '5️⃣' },
  enam:      { id: 'enam',     word: 'enam',     en: 'six',          de: 'sechs',      emoji: '6️⃣' },
  tujuh:     { id: 'tujuh',    word: 'tujuh',    en: 'seven',        de: 'sieben',     emoji: '7️⃣' },
  delapan:   { id: 'delapan',  word: 'delapan',  en: 'eight',        de: 'acht',       emoji: '8️⃣' },
  sembilan:  { id: 'sembilan', word: 'sembilan', en: 'nine',         de: 'neun',       emoji: '9️⃣' },
  sepuluh:   { id: 'sepuluh',  word: 'sepuluh',  en: 'ten',          de: 'zehn',       emoji: '🔟' },

  // Warna
  merah:     { id: 'merah',    word: 'merah',    en: 'red',          de: 'rot',        emoji: '🟥' },
  biru:      { id: 'biru',     word: 'biru',     en: 'blue',         de: 'blau',       emoji: '🟦' },
  kuning:    { id: 'kuning',   word: 'kuning',   en: 'yellow',       de: 'gelb',       emoji: '🟨' },
  hijau:     { id: 'hijau',    word: 'hijau',    en: 'green',        de: 'grün',       emoji: '🟩' },
  pink:      { id: 'pink',     word: 'merah muda', en: 'pink',       de: 'rosa',       emoji: '🌸' },
  ungu:      { id: 'ungu',     word: 'ungu',     en: 'purple',       de: 'lila',       emoji: '🟪' },
  hitam:     { id: 'hitam',    word: 'hitam',    en: 'black',        de: 'schwarz',    emoji: '⬛' },
  putih:     { id: 'putih',    word: 'putih',    en: 'white',        de: 'weiß',       emoji: '⬜' },

  // Makanan
  pommes:    { id: 'pommes',   word: 'kentang goreng', en: 'french fries (Mila\'s favorite!)', de: 'Pommes (Milas Lieblingsessen!)', emoji: '🍟' },
  spageti:   { id: 'spageti',  word: 'spageti bolognese', en: 'spaghetti (Mila\'s favorite!)', de: 'Spaghetti (Milas Lieblingsessen!)', emoji: '🍝' },
  nasi:      { id: 'nasi',     word: 'nasi',     en: 'rice',         de: 'Reis',       emoji: '🍚' },
  ayam:      { id: 'ayam',     word: 'ayam',     en: 'chicken',      de: 'Hühnchen',   emoji: '🍗' },
  susu:      { id: 'susu',     word: 'susu',     en: 'milk',         de: 'Milch',      emoji: '🥛' },
  apel:      { id: 'apel',     word: 'apel',     en: 'apple',        de: 'Apfel',      emoji: '🍎' },
  pisang:    { id: 'pisang',   word: 'pisang',   en: 'banana',       de: 'Banane',     emoji: '🍌' },
  air:       { id: 'air',      word: 'air',      en: 'water',        de: 'Wasser',     emoji: '💧' },
  eskrim:    { id: 'eskrim',   word: 'es krim',  en: 'ice cream',    de: 'Eis',        emoji: '🍦' },

  // Hewan
  anjing:    { id: 'anjing',   word: 'anjing',   en: 'dog',          de: 'Hund',       emoji: '🐶' },
  kucing:    { id: 'kucing',   word: 'kucing',   en: 'cat',          de: 'Katze',      emoji: '🐱' },
  gajah:     { id: 'gajah',    word: 'gajah',    en: 'elephant',     de: 'Elefant',    emoji: '🐘' },
  monyet:    { id: 'monyet',   word: 'monyet',   en: 'monkey',       de: 'Affe',       emoji: '🐵' },
  ikan:      { id: 'ikan',     word: 'ikan',     en: 'fish',         de: 'Fisch',      emoji: '🐠' },
  burung:    { id: 'burung',   word: 'burung',   en: 'bird',         de: 'Vogel',      emoji: '🐦' },
  kupukupu:  { id: 'kupukupu', word: 'kupu-kupu',en: 'butterfly',    de: 'Schmetterling', emoji: '🦋' },

  // Mainan
  lego:      { id: 'lego',     word: 'lego',     en: 'Lego',         de: 'Lego',       emoji: '🧱' },
  magnet:    { id: 'magnet',   word: 'magnet',   en: 'magnet',       de: 'Magnet',     emoji: '🧲' },
  boneka:    { id: 'boneka',   word: 'boneka',   en: 'doll',         de: 'Puppe',      emoji: '🪆' },
  mobil:     { id: 'mobil',    word: 'mobil',    en: 'car (Hot Wheels for Kian!)', de: 'Auto (Hot Wheels für Kian!)', emoji: '🚗' },
  bola:      { id: 'bola',     word: 'bola',     en: 'ball',         de: 'Ball',       emoji: '⚽' },
  sepeda:    { id: 'sepeda',   word: 'sepeda',   en: 'bicycle',      de: 'Fahrrad',    emoji: '🚲' },

  // Badan
  kepala:    { id: 'kepala',   word: 'kepala',   en: 'head',         de: 'Kopf',       emoji: '🗣️' },
  rambut:    { id: 'rambut',   word: 'rambut',   en: 'hair',         de: 'Haare',      emoji: '💇' },
  mata:      { id: 'mata',     word: 'mata',     en: 'eyes',         de: 'Augen',      emoji: '👀' },
  hidung:    { id: 'hidung',   word: 'hidung',   en: 'nose',         de: 'Nase',       emoji: '👃' },
  mulut:     { id: 'mulut',    word: 'mulut',    en: 'mouth',        de: 'Mund',       emoji: '👄' },
  tangan:    { id: 'tangan',   word: 'tangan',   en: 'hand',         de: 'Hand',       emoji: '✋' },
  kaki:      { id: 'kaki',     word: 'kaki',     en: 'foot',         de: 'Fuß',        emoji: '🦶' },

  // Kegiatan
  menari:    { id: 'menari',   word: 'menari',   en: 'dance',        de: 'tanzen',     emoji: '💃' },
  berenang:  { id: 'berenang', word: 'berenang', en: 'swim',         de: 'schwimmen',  emoji: '🏊' },
  naiksepeda:{ id: 'naiksepeda',word: 'naik sepeda', en: 'ride a bike', de: 'Fahrrad fahren', emoji: '🚴' },
  main:      { id: 'main',     word: 'main',     en: 'play',         de: 'spielen',    emoji: '🧸' },
  makan:     { id: 'makan',    word: 'makan',    en: 'eat',          de: 'essen',      emoji: '🍽️' },
  tidur:     { id: 'tidur',    word: 'tidur',    en: 'sleep',        de: 'schlafen',   emoji: '😴' },

  // Tempat
  rumah:     { id: 'rumah',    word: 'rumah',    en: 'house',        de: 'Haus',       emoji: '🏠' },
  sekolah:   { id: 'sekolah',  word: 'sekolah',  en: 'school (Bienenkorb!)', de: 'Schule (Bienenkorb!)', emoji: '🏫' },
  kolam:     { id: 'kolam',    word: 'kolam renang', en: 'swimming pool', de: 'Schwimmbad', emoji: '🏊‍♀️' },
  jakarta:   { id: 'jakarta',  word: 'Jakarta',  en: 'Jakarta (where Yangti lives!)', de: 'Jakarta (wo Yangti wohnt!)', emoji: '🌴' },
  nurnberg:  { id: 'nurnberg', word: 'Nürnberg', en: 'Nürnberg (where Oma lives!)', de: 'Nürnberg (wo Oma wohnt!)', emoji: '🏰' },
  pesawat:   { id: 'pesawat',  word: 'pesawat',  en: 'airplane',     de: 'Flugzeug',   emoji: '✈️' }
}

export function getWord(id: string): Word {
  const w = WORDS[id]
  if (!w) throw new Error(`Unknown word id: ${id}`)
  return w
}
