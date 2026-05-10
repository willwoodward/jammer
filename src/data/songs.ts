import type { Song } from '../types'

export const songs: Song[] = [
  {
    id: 'amazing-grace',
    title: 'Amazing Grace',
    artist: 'John Newton',
    key: 'G',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'Amazing grace, how sweet the sound', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 22 }] },
          { text: 'That saved a wretch like me', chords: [{ chord: 'G', position: 0 }] },
          { text: 'I once was lost, but now am found', chords: [{ chord: 'G', position: 0 }, { chord: 'Em', position: 21 }] },
          { text: 'Was blind but now I see', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 15 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: "'Twas grace that taught my heart to fear", chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 28 }] },
          { text: 'And grace my fears relieved', chords: [{ chord: 'G', position: 0 }] },
          { text: 'How precious did that grace appear', chords: [{ chord: 'G', position: 0 }, { chord: 'Em', position: 24 }] },
          { text: 'The hour I first believed', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 16 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'Through many dangers, toils, and snares', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 26 }] },
          { text: 'I have already come', chords: [{ chord: 'G', position: 0 }] },
          { text: "'Tis grace hath brought me safe thus far", chords: [{ chord: 'G', position: 0 }, { chord: 'Em', position: 26 }] },
          { text: 'And grace will lead me home', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 17 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 4',
        lines: [
          { text: 'When we\'ve been there ten thousand years', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 27 }] },
          { text: 'Bright shining as the sun', chords: [{ chord: 'G', position: 0 }] },
          { text: 'We\'ve no less days to sing God\'s praise', chords: [{ chord: 'G', position: 0 }, { chord: 'Em', position: 26 }] },
          { text: 'Than when we first begun', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 14 }] },
        ],
      },
    ],
  },
  {
    id: 'holy-holy-holy',
    title: 'Holy, Holy, Holy',
    artist: 'Reginald Heber',
    key: 'D',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'Holy, holy, holy, Lord God Almighty', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 20 }, { chord: 'D', position: 30 }] },
          { text: 'Early in the morning our song shall rise to Thee', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 22 }, { chord: 'D', position: 38 }] },
          { text: 'Holy, holy, holy, merciful and mighty', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 20 }, { chord: 'Bm', position: 34 }] },
          { text: 'God in three persons, blessed Trinity', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 18 }, { chord: 'A', position: 27 }, { chord: 'D', position: 35 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Holy, holy, holy, all the saints adore Thee', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 20 }, { chord: 'D', position: 34 }] },
          { text: 'Casting down their golden crowns around the glassy sea', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 28 }, { chord: 'D', position: 44 }] },
          { text: 'Cherubim and seraphim falling down before Thee', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 24 }, { chord: 'Bm', position: 40 }] },
          { text: 'Which wert and art and evermore shall be', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 18 }, { chord: 'A', position: 30 }, { chord: 'D', position: 38 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'Holy, holy, holy, though the darkness hide Thee', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 20 }, { chord: 'D', position: 36 }] },
          { text: 'Though the eye of sinful man Thy glory may not see', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 26 }, { chord: 'D', position: 46 }] },
          { text: 'Only Thou art holy, there is none beside Thee', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 22 }, { chord: 'Bm', position: 38 }] },
          { text: 'Perfect in power, in love and purity', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 16 }, { chord: 'A', position: 28 }, { chord: 'D', position: 38 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 4',
        lines: [
          { text: 'Holy, holy, holy, Lord God Almighty', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 20 }, { chord: 'D', position: 30 }] },
          { text: 'All Thy works shall praise Thy name in earth and sky and sea', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 30 }, { chord: 'D', position: 48 }] },
          { text: 'Holy, holy, holy, merciful and mighty', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 20 }, { chord: 'Bm', position: 34 }] },
          { text: 'God in three persons, blessed Trinity', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 18 }, { chord: 'A', position: 27 }, { chord: 'D', position: 35 }] },
        ],
      },
    ],
  },
  {
    id: 'be-thou-my-vision',
    title: 'Be Thou My Vision',
    artist: 'Dallan Forgaill',
    key: 'D',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'Be Thou my vision, O Lord of my heart', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 18 }, { chord: 'D', position: 28 }] },
          { text: 'Naught be all else to me, save that Thou art', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 22 }, { chord: 'A', position: 33 }] },
          { text: 'Thou my best thought, by day or by night', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }, { chord: 'D', position: 32 }] },
          { text: 'Waking or sleeping, Thy presence my light', chords: [{ chord: 'G', position: 0 }, { chord: 'A', position: 20 }, { chord: 'D', position: 34 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Be Thou my wisdom, and Thou my true Word', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }, { chord: 'D', position: 32 }] },
          { text: 'I ever with Thee and Thou with me, Lord', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 22 }, { chord: 'A', position: 34 }] },
          { text: 'Thou my great Father, I Thy true son', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 22 }, { chord: 'D', position: 32 }] },
          { text: 'Thou in me dwelling, and I with Thee one', chords: [{ chord: 'G', position: 0 }, { chord: 'A', position: 20 }, { chord: 'D', position: 34 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'Be Thou my battle shield, sword for the fight', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 22 }, { chord: 'D', position: 34 }] },
          { text: 'Be Thou my dignity, Thou my delight', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }, { chord: 'A', position: 30 }] },
          { text: 'Thou my soul\'s shelter, Thou my high tower', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 22 }, { chord: 'D', position: 36 }] },
          { text: 'Raise Thou me heavenward, O Power of my power', chords: [{ chord: 'G', position: 0 }, { chord: 'A', position: 22 }, { chord: 'D', position: 38 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 4',
        lines: [
          { text: 'High King of heaven, my victory won', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }, { chord: 'D', position: 30 }] },
          { text: 'May I reach heaven\'s joys, O bright heaven\'s Sun', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 24 }, { chord: 'A', position: 38 }] },
          { text: 'Heart of my own heart, whatever befall', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }, { chord: 'D', position: 32 }] },
          { text: 'Still be my vision, O Ruler of all', chords: [{ chord: 'G', position: 0 }, { chord: 'A', position: 20 }, { chord: 'D', position: 30 }] },
        ],
      },
    ],
  },
  {
    id: 'it-is-well',
    title: 'It Is Well With My Soul',
    artist: 'Horatio Spafford',
    key: 'C',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'When peace like a river attendeth my way', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 22 }, { chord: 'C', position: 34 }] },
          { text: 'When sorrows like sea billows roll', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 22 }] },
          { text: 'Whatever my lot, Thou hast taught me to say', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 18 }, { chord: 'C', position: 36 }] },
          { text: 'It is well, it is well with my soul', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 22 }] },
        ],
      },
      {
        type: 'chorus',
        label: 'Chorus',
        lines: [
          { text: 'It is well with my soul', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 14 }] },
          { text: 'It is well, it is well with my soul', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 11 }, { chord: 'C', position: 27 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Though Satan should buffet, though trials should come', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 26 }, { chord: 'C', position: 42 }] },
          { text: 'Let this blest assurance control', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 24 }] },
          { text: 'That Christ hath regarded my helpless estate', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 22 }, { chord: 'C', position: 38 }] },
          { text: 'And hath shed His own blood for my soul', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 26 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'My sin, oh the bliss of this glorious thought', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 24 }, { chord: 'C', position: 40 }] },
          { text: 'My sin, not in part, but the whole', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 24 }] },
          { text: 'Is nailed to the cross, and I bear it no more', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 22 }, { chord: 'C', position: 40 }] },
          { text: 'Praise the Lord, praise the Lord, O my soul', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 28 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 4',
        lines: [
          { text: 'And Lord haste the day when my faith shall be sight', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 28 }, { chord: 'C', position: 44 }] },
          { text: 'The clouds be rolled back as a scroll', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 26 }] },
          { text: 'The trump shall resound and the Lord shall descend', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 24 }, { chord: 'C', position: 44 }] },
          { text: 'Even so, it is well with my soul', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 22 }] },
        ],
      },
    ],
  },
  {
    id: 'doxology',
    title: 'Doxology',
    artist: 'Thomas Ken',
    key: 'G',
    sections: [
      {
        type: 'verse',
        label: '',
        lines: [
          { text: 'Praise God from whom all blessings flow', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 16 }, { chord: 'G', position: 30 }] },
          { text: 'Praise Him all creatures here below', chords: [{ chord: 'Em', position: 0 }, { chord: 'D', position: 16 }, { chord: 'G', position: 30 }] },
          { text: 'Praise Him above ye heavenly host', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }, { chord: 'G', position: 30 }] },
          { text: 'Praise Father, Son, and Holy Ghost', chords: [{ chord: 'C', position: 0 }, { chord: 'D', position: 16 }, { chord: 'G', position: 30 }] },
        ],
      },
      {
        type: 'tag',
        label: '',
        lines: [
          { text: 'Amen', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 3 }] },
        ],
      },
    ],
  },
  {
    id: 'how-great-thou-art',
    title: 'How Great Thou Art',
    artist: 'Carl Boberg',
    key: 'A',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'O Lord my God, when I in awesome wonder', chords: [{ chord: 'A', position: 0 }, { chord: 'D', position: 22 }] },
          { text: 'Consider all the worlds Thy hands have made', chords: [{ chord: 'A', position: 0 }, { chord: 'E', position: 28 }] },
          { text: 'I see the stars, I hear the rolling thunder', chords: [{ chord: 'A', position: 0 }, { chord: 'D', position: 22 }] },
          { text: 'Thy power throughout the universe displayed', chords: [{ chord: 'A', position: 0 }, { chord: 'E', position: 24 }, { chord: 'A', position: 38 }] },
        ],
      },
      {
        type: 'chorus',
        label: 'Chorus',
        lines: [
          { text: 'Then sings my soul, my Savior God, to Thee', chords: [{ chord: 'A', position: 0 }, { chord: 'D', position: 20 }, { chord: 'A', position: 34 }] },
          { text: 'How great Thou art, how great Thou art', chords: [{ chord: 'E', position: 0 }, { chord: 'A', position: 20 }] },
          { text: 'Then sings my soul, my Savior God, to Thee', chords: [{ chord: 'A', position: 0 }, { chord: 'D', position: 20 }, { chord: 'A', position: 34 }] },
          { text: 'How great Thou art, how great Thou art', chords: [{ chord: 'E', position: 0 }, { chord: 'A', position: 20 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'When through the woods and forest glades I wander', chords: [{ chord: 'A', position: 0 }, { chord: 'D', position: 30 }] },
          { text: 'And hear the birds sing sweetly in the trees', chords: [{ chord: 'A', position: 0 }, { chord: 'E', position: 28 }] },
          { text: 'When I look down from lofty mountain grandeur', chords: [{ chord: 'A', position: 0 }, { chord: 'D', position: 28 }] },
          { text: 'And hear the brook and feel the gentle breeze', chords: [{ chord: 'A', position: 0 }, { chord: 'E', position: 22 }, { chord: 'A', position: 38 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'And when I think that God, His Son not sparing', chords: [{ chord: 'A', position: 0 }, { chord: 'D', position: 26 }] },
          { text: 'Sent Him to die, I scarce can take it in', chords: [{ chord: 'A', position: 0 }, { chord: 'E', position: 26 }] },
          { text: 'That on the cross, my burden gladly bearing', chords: [{ chord: 'A', position: 0 }, { chord: 'D', position: 24 }] },
          { text: 'He bled and died to take away my sin', chords: [{ chord: 'A', position: 0 }, { chord: 'E', position: 22 }, { chord: 'A', position: 36 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 4',
        lines: [
          { text: 'When Christ shall come with shout of acclamation', chords: [{ chord: 'A', position: 0 }, { chord: 'D', position: 30 }] },
          { text: 'And take me home, what joy shall fill my heart', chords: [{ chord: 'A', position: 0 }, { chord: 'E', position: 28 }] },
          { text: 'Then I shall bow in humble adoration', chords: [{ chord: 'A', position: 0 }, { chord: 'D', position: 24 }] },
          { text: 'And there proclaim, my God, how great Thou art', chords: [{ chord: 'A', position: 0 }, { chord: 'E', position: 22 }, { chord: 'A', position: 38 }] },
        ],
      },
    ],
  },
]
