import { WORDS } from './vocab'

export type ExerciseKind = 'hearAndPick' | 'pictureMatch' | 'trueFalse' | 'whoIsThis' | 'sayIt'

export type Exercise = {
  kind: ExerciseKind
  wordId: string          // the target word (what's being taught/tested)
  distractorIds?: string[] // pool to pick wrong answers from
}

export type Lesson = {
  id: string
  title: string
  exercises: Exercise[]
}

export type Unit = {
  id: string
  title: string           // short English label (for log/debug; Mila won't read it)
  emoji: string
  color: string           // tailwind color class for the unit bubble
  lessons: Lesson[]
  stickerEmoji: string    // sticker unlocked when unit is complete
  stickerWordId: string   // word spoken when she taps the sticker later
  bigMinigame?: 'fashion' | 'swimming' | 'jakarta' | 'kitchen'
}

// Helpers to keep unit definitions concise
const pick = (kind: ExerciseKind, wordId: string, distractorIds: string[]): Exercise =>
  ({ kind, wordId, distractorIds })
const whois = (wordId: string, distractorIds: string[]): Exercise =>
  ({ kind: 'whoIsThis', wordId, distractorIds })
const say = (wordId: string): Exercise => ({ kind: 'sayIt', wordId })

export const UNITS: Unit[] = [
  {
    id: 'keluarga', title: 'Family', emoji: '👨‍👩‍👧‍👦', color: 'bg-coral',
    stickerEmoji: '❤️', stickerWordId: 'mama',
    lessons: [
      { id: 'l1', title: 'Mama & Papa', exercises: [
        pick('hearAndPick', 'mama', ['papa','adik','oma']),
        pick('hearAndPick', 'papa', ['mama','yangti','yangkung']),
        whois('mama', ['papa','adik','oma']),
        whois('papa', ['mama','yangti','kakak']),
        say('mama'),
        pick('trueFalse', 'papa', ['mama']),
      ]},
      { id: 'l2', title: 'Brother & Sister', exercises: [
        pick('hearAndPick', 'adik', ['kakak','mama','oma']),
        pick('hearAndPick', 'kakak', ['adik','tante','yangti']),
        whois('adik', ['mama','papa','oma']),
        pick('pictureMatch', 'adik', ['kakak','mama','papa']),
        say('adik'),
      ]},
      { id: 'l3', title: 'Grandparents', exercises: [
        pick('hearAndPick', 'yangti', ['yangkung','oma','mama']),
        pick('hearAndPick', 'yangkung', ['yangti','oma','papa']),
        pick('hearAndPick', 'oma', ['yangti','mama','tante']),
        whois('yangti', ['yangkung','oma','mama']),
        whois('oma', ['yangti','yangkung','mama']),
        say('yangti'),
        say('oma'),
      ]},
    ]
  },
  {
    id: 'salam', title: 'Greetings', emoji: '👋', color: 'bg-sky',
    stickerEmoji: '🌞', stickerWordId: 'pagi',
    lessons: [
      { id: 'l1', title: 'Hello!', exercises: [
        pick('hearAndPick', 'halo', ['tksh','jumpa','pagi']),
        pick('hearAndPick', 'pagi', ['malam','halo','tksh']),
        pick('hearAndPick', 'malam', ['pagi','jumpa','halo']),
        say('halo'),
        say('pagi'),
      ]},
      { id: 'l2', title: 'Thank you', exercises: [
        pick('hearAndPick', 'tksh', ['halo','jumpa','malam']),
        pick('hearAndPick', 'jumpa', ['halo','pagi','malam']),
        pick('trueFalse', 'tksh', ['jumpa']),
        say('tksh'),
        say('jumpa'),
      ]},
    ]
  },
  {
    id: 'angka', title: 'Numbers', emoji: '🔢', color: 'bg-teal',
    stickerEmoji: '⭐', stickerWordId: 'lima',
    lessons: [
      { id: 'l1', title: '1 to 5', exercises: [
        pick('hearAndPick', 'satu', ['dua','tiga','empat']),
        pick('hearAndPick', 'dua',  ['satu','tiga','lima']),
        pick('hearAndPick', 'tiga', ['satu','empat','lima']),
        pick('hearAndPick', 'empat',['tiga','lima','dua']),
        pick('hearAndPick', 'lima', ['empat','tiga','satu']),
        say('satu'), say('lima'),
      ]},
      { id: 'l2', title: '6 to 10', exercises: [
        pick('hearAndPick', 'enam',    ['tujuh','delapan','lima']),
        pick('hearAndPick', 'tujuh',   ['enam','delapan','sembilan']),
        pick('hearAndPick', 'delapan', ['tujuh','sembilan','sepuluh']),
        pick('hearAndPick', 'sembilan',['delapan','sepuluh','tujuh']),
        pick('hearAndPick', 'sepuluh', ['sembilan','delapan','satu']),
        say('sepuluh'),
      ]},
    ]
  },
  {
    id: 'warna', title: 'Colors', emoji: '🎨', color: 'bg-plum',
    stickerEmoji: '🌈', stickerWordId: 'pink', bigMinigame: 'fashion',
    lessons: [
      { id: 'l1', title: 'Primary colors', exercises: [
        pick('hearAndPick', 'merah',  ['biru','kuning','hijau']),
        pick('hearAndPick', 'biru',   ['merah','kuning','hijau']),
        pick('hearAndPick', 'kuning', ['merah','biru','hijau']),
        pick('hearAndPick', 'hijau',  ['merah','biru','kuning']),
        pick('pictureMatch','merah',  ['biru','kuning','hijau']),
        say('merah'), say('biru'),
      ]},
      { id: 'l2', title: 'More colors', exercises: [
        pick('hearAndPick', 'pink',  ['ungu','putih','hitam']),
        pick('hearAndPick', 'ungu',  ['pink','putih','hitam']),
        pick('hearAndPick', 'hitam', ['putih','ungu','pink']),
        pick('hearAndPick', 'putih', ['hitam','ungu','pink']),
        say('pink'),
      ]},
    ]
  },
  {
    id: 'makanan', title: 'Food', emoji: '🍽️', color: 'bg-coral',
    stickerEmoji: '🍟', stickerWordId: 'pommes', bigMinigame: 'kitchen',
    lessons: [
      { id: 'l1', title: 'Mila\'s favorites', exercises: [
        pick('hearAndPick', 'pommes',  ['spageti','nasi','apel']),
        pick('hearAndPick', 'spageti', ['pommes','susu','pisang']),
        pick('hearAndPick', 'apel',    ['pisang','susu','nasi']),
        pick('hearAndPick', 'pisang',  ['apel','eskrim','nasi']),
        say('pommes'), say('spageti'),
      ]},
      { id: 'l2', title: 'More food', exercises: [
        pick('hearAndPick', 'nasi',  ['ayam','susu','air']),
        pick('hearAndPick', 'ayam',  ['nasi','apel','susu']),
        pick('hearAndPick', 'susu',  ['air','eskrim','nasi']),
        pick('hearAndPick', 'air',   ['susu','apel','nasi']),
        pick('hearAndPick', 'eskrim',['susu','apel','nasi']),
        say('eskrim'),
      ]},
    ]
  },
  {
    id: 'hewan', title: 'Animals', emoji: '🐾', color: 'bg-mint',
    stickerEmoji: '🦋', stickerWordId: 'kupukupu', bigMinigame: 'swimming',
    lessons: [
      { id: 'l1', title: 'Pets & friends', exercises: [
        pick('hearAndPick', 'anjing', ['kucing','ikan','burung']),
        pick('hearAndPick', 'kucing', ['anjing','ikan','monyet']),
        pick('hearAndPick', 'ikan',   ['burung','kucing','anjing']),
        pick('hearAndPick', 'burung', ['ikan','kupukupu','kucing']),
        say('kucing'),
      ]},
      { id: 'l2', title: 'Wild animals', exercises: [
        pick('hearAndPick', 'gajah',   ['monyet','anjing','kucing']),
        pick('hearAndPick', 'monyet',  ['gajah','burung','ikan']),
        pick('hearAndPick', 'kupukupu',['burung','ikan','monyet']),
        pick('pictureMatch','gajah',   ['monyet','anjing','kucing']),
        say('kupukupu'),
      ]},
    ]
  },
  {
    id: 'mainan', title: 'Toys', emoji: '🧸', color: 'bg-sunny',
    stickerEmoji: '🧱', stickerWordId: 'lego',
    lessons: [
      { id: 'l1', title: 'Toys to play', exercises: [
        pick('hearAndPick', 'lego',   ['magnet','boneka','bola']),
        pick('hearAndPick', 'magnet', ['lego','mobil','bola']),
        pick('hearAndPick', 'boneka', ['lego','magnet','mobil']),
        pick('hearAndPick', 'mobil',  ['bola','lego','sepeda']),
        say('lego'), say('mobil'),
      ]},
      { id: 'l2', title: 'Outside toys', exercises: [
        pick('hearAndPick', 'bola',   ['sepeda','lego','magnet']),
        pick('hearAndPick', 'sepeda', ['bola','mobil','boneka']),
        pick('pictureMatch','sepeda', ['bola','lego','magnet']),
        say('sepeda'),
      ]},
    ]
  },
  {
    id: 'badan', title: 'Body', emoji: '🧍', color: 'bg-sky',
    stickerEmoji: '👀', stickerWordId: 'mata',
    lessons: [
      { id: 'l1', title: 'Face', exercises: [
        pick('hearAndPick', 'kepala', ['rambut','mata','hidung']),
        pick('hearAndPick', 'mata',   ['hidung','mulut','rambut']),
        pick('hearAndPick', 'hidung', ['mata','mulut','kepala']),
        pick('hearAndPick', 'mulut',  ['hidung','mata','rambut']),
        say('mata'),
      ]},
      { id: 'l2', title: 'Hands & feet', exercises: [
        pick('hearAndPick', 'tangan', ['kaki','rambut','mulut']),
        pick('hearAndPick', 'kaki',   ['tangan','mata','hidung']),
        pick('hearAndPick', 'rambut', ['kepala','mata','tangan']),
        say('tangan'), say('kaki'),
      ]},
    ]
  },
  {
    id: 'kegiatan', title: 'Activities', emoji: '💃', color: 'bg-plum',
    stickerEmoji: '💃', stickerWordId: 'menari',
    lessons: [
      { id: 'l1', title: 'Mila loves doing', exercises: [
        pick('hearAndPick', 'menari',    ['berenang','main','makan']),
        pick('hearAndPick', 'berenang',  ['menari','naiksepeda','tidur']),
        pick('hearAndPick', 'naiksepeda',['menari','berenang','main']),
        say('menari'), say('berenang'),
      ]},
      { id: 'l2', title: 'Every day', exercises: [
        pick('hearAndPick', 'main',  ['makan','tidur','menari']),
        pick('hearAndPick', 'makan', ['tidur','main','berenang']),
        pick('hearAndPick', 'tidur', ['makan','main','menari']),
        say('main'),
      ]},
    ]
  },
  {
    id: 'tempat', title: 'Places', emoji: '🏠', color: 'bg-teal',
    stickerEmoji: '✈️', stickerWordId: 'jakarta', bigMinigame: 'jakarta',
    lessons: [
      { id: 'l1', title: 'Home & school', exercises: [
        pick('hearAndPick', 'rumah',   ['sekolah','kolam','jakarta']),
        pick('hearAndPick', 'sekolah', ['rumah','kolam','pesawat']),
        pick('hearAndPick', 'kolam',   ['rumah','sekolah','pesawat']),
        say('rumah'), say('sekolah'),
      ]},
      { id: 'l2', title: 'Far away', exercises: [
        pick('hearAndPick', 'jakarta',  ['nurnberg','pesawat','rumah']),
        pick('hearAndPick', 'nurnberg', ['jakarta','pesawat','sekolah']),
        pick('hearAndPick', 'pesawat',  ['jakarta','nurnberg','rumah']),
        say('jakarta'),
      ]},
    ]
  },
]

export function findUnit(unitId: string): Unit {
  const u = UNITS.find(u => u.id === unitId)
  if (!u) throw new Error(`Unknown unit: ${unitId}`)
  return u
}

export function findLesson(unitId: string, lessonId: string): Lesson {
  const lesson = findUnit(unitId).lessons.find(l => l.id === lessonId)
  if (!lesson) throw new Error(`Unknown lesson: ${unitId}:${lessonId}`)
  return lesson
}

// small side-note: vocab IDs referenced in distractors are validated at import time via WORDS
for (const u of UNITS) {
  for (const l of u.lessons) {
    for (const e of l.exercises) {
      if (!WORDS[e.wordId]) throw new Error(`Exercise uses missing wordId: ${e.wordId}`)
      for (const d of e.distractorIds ?? []) {
        if (!WORDS[d]) throw new Error(`Distractor missing: ${d}`)
      }
    }
  }
}
