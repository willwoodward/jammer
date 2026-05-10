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
  {
    id: 'come-thou-fount',
    title: 'Come Thou Fount of Every Blessing',
    artist: 'Robert Robinson',
    key: 'D',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'Come Thou fount of every blessing', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }] },
          { text: 'Tune my heart to sing Thy grace', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 22 }] },
          { text: 'Streams of mercy never ceasing', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }] },
          { text: 'Call for songs of loudest praise', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 18 }, { chord: 'D', position: 28 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Teach me some melodious sonnet', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }] },
          { text: 'Sung by flaming tongues above', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 18 }] },
          { text: "Praise the mount I'm fixed upon it", chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }] },
          { text: 'Mount of Thy redeeming love', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 14 }, { chord: 'D', position: 24 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'Here I raise mine Ebenezer', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 18 }] },
          { text: "Hither by Thy help I've come", chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 18 }] },
          { text: 'And I hope by Thy good pleasure', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 18 }] },
          { text: 'Safely to arrive at home', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 14 }, { chord: 'D', position: 24 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 4',
        lines: [
          { text: 'O to grace how great a debtor', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 18 }] },
          { text: 'Daily I\'m constrained to be', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 18 }] },
          { text: 'Let Thy goodness like a fetter', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }] },
          { text: 'Bind my wandering heart to Thee', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 16 }, { chord: 'D', position: 28 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 5',
        lines: [
          { text: 'Prone to wander Lord I feel it', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }] },
          { text: 'Prone to leave the God I love', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 18 }] },
          { text: "Here's my heart O take and seal it", chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }] },
          { text: 'Seal it for Thy courts above', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 14 }, { chord: 'D', position: 24 }] },
        ],
      },
    ],
  },
  {
    id: 'great-is-thy-faithfulness',
    title: 'Great Is Thy Faithfulness',
    artist: 'Thomas Chisholm',
    key: 'D',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'Great is Thy faithfulness, O God my Father', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 24 }] },
          { text: 'There is no shadow of turning with Thee', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 24 }] },
          { text: 'Thou changest not, Thy compassions they fail not', chords: [{ chord: 'D', position: 0 }, { chord: 'Em', position: 20 }, { chord: 'A', position: 36 }] },
          { text: 'As Thou hast been Thou forever wilt be', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 18 }, { chord: 'D', position: 32 }] },
        ],
      },
      {
        type: 'chorus',
        label: 'Chorus',
        lines: [
          { text: 'Great is Thy faithfulness, great is Thy faithfulness', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 26 }] },
          { text: 'Morning by morning new mercies I see', chords: [{ chord: 'Em', position: 0 }, { chord: 'A', position: 22 }] },
          { text: 'All I have needed Thy hand hath provided', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }, { chord: 'D', position: 36 }] },
          { text: 'Great is Thy faithfulness, Lord unto me', chords: [{ chord: 'G', position: 0 }, { chord: 'A', position: 24 }, { chord: 'D', position: 34 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Summer and winter and springtime and harvest', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 26 }] },
          { text: 'Sun moon and stars in their courses above', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 24 }] },
          { text: 'Join with all nature in manifold witness', chords: [{ chord: 'D', position: 0 }, { chord: 'Em', position: 22 }, { chord: 'A', position: 36 }] },
          { text: 'To Thy great faithfulness mercy and love', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 22 }, { chord: 'D', position: 34 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'Pardon for sin and a peace that endureth', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 24 }] },
          { text: 'Thine own dear presence to cheer and to guide', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 28 }] },
          { text: 'Strength for today and bright hope for tomorrow', chords: [{ chord: 'D', position: 0 }, { chord: 'Em', position: 22 }, { chord: 'A', position: 40 }] },
          { text: 'Blessings all mine with ten thousand beside', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 24 }, { chord: 'D', position: 38 }] },
        ],
      },
    ],
  },
  {
    id: 'blessed-assurance',
    title: 'Blessed Assurance',
    artist: 'Fanny Crosby',
    key: 'D',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'Blessed assurance Jesus is mine', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }] },
          { text: 'O what a foretaste of glory divine', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 22 }] },
          { text: 'Heir of salvation purchase of God', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 22 }] },
          { text: 'Born of His Spirit washed in His blood', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 18 }, { chord: 'D', position: 30 }] },
        ],
      },
      {
        type: 'chorus',
        label: 'Chorus',
        lines: [
          { text: 'This is my story this is my song', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 18 }] },
          { text: 'Praising my Savior all the day long', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 20 }] },
          { text: 'This is my story this is my song', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 18 }] },
          { text: 'Praising my Savior all the day long', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 18 }, { chord: 'D', position: 30 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Perfect submission perfect delight', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 22 }] },
          { text: 'Visions of rapture now burst on my sight', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 28 }] },
          { text: 'Angels descending bring from above', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 22 }] },
          { text: 'Echoes of mercy whispers of love', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 18 }, { chord: 'D', position: 28 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'Perfect submission all is at rest', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 22 }] },
          { text: 'I in my Savior am happy and blest', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 22 }] },
          { text: 'Watching and waiting looking above', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 22 }] },
          { text: 'Filled with His goodness lost in His love', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 22 }, { chord: 'D', position: 34 }] },
        ],
      },
    ],
  },
  {
    id: 'what-a-friend',
    title: 'What a Friend We Have in Jesus',
    artist: 'Joseph Scriven',
    key: 'G',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'What a friend we have in Jesus', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }] },
          { text: 'All our sins and griefs to bear', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 22 }] },
          { text: 'What a privilege to carry', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }] },
          { text: 'Everything to God in prayer', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 16 }, { chord: 'G', position: 24 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 1 (cont.)',
        lines: [
          { text: 'O what peace we often forfeit', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }] },
          { text: 'O what needless pain we bear', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 18 }] },
          { text: 'All because we do not carry', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }] },
          { text: 'Everything to God in prayer', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 16 }, { chord: 'G', position: 24 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Have we trials and temptations', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }] },
          { text: 'Is there trouble anywhere', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 18 }] },
          { text: 'We should never be discouraged', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }] },
          { text: 'Take it to the Lord in prayer', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 16 }, { chord: 'G', position: 26 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2 (cont.)',
        lines: [
          { text: 'Can we find a friend so faithful', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 20 }] },
          { text: 'Who will all our sorrows share', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 18 }] },
          { text: 'Jesus knows our every weakness', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }] },
          { text: 'Take it to the Lord in prayer', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 16 }, { chord: 'G', position: 26 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'Are we weak and heavy laden', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }] },
          { text: 'Cumbered with a load of care', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 18 }] },
          { text: 'Precious Savior still our refuge', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }] },
          { text: 'Take it to the Lord in prayer', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 16 }, { chord: 'G', position: 26 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3 (cont.)',
        lines: [
          { text: 'Do thy friends despise forsake thee', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 22 }] },
          { text: 'Take it to the Lord in prayer', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 16 }] },
          { text: 'In His arms He\'ll take and shield thee', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 22 }] },
          { text: 'Thou wilt find a solace there', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 16 }, { chord: 'G', position: 26 }] },
        ],
      },
    ],
  },
  {
    id: 'rock-of-ages',
    title: 'Rock of Ages',
    artist: 'Augustus Toplady',
    key: 'C',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'Rock of ages cleft for me', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 16 }] },
          { text: 'Let me hide myself in Thee', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 16 }, { chord: 'C', position: 24 }] },
          { text: 'Let the water and the blood', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 18 }] },
          { text: 'From Thy wounded side which flowed', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 20 }] },
          { text: 'Be of sin the double cure', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 16 }] },
          { text: 'Save from wrath and make me pure', chords: [{ chord: 'F', position: 0 }, { chord: 'G', position: 16 }, { chord: 'C', position: 24 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Could my tears forever flow', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 16 }] },
          { text: 'Could my zeal no languor know', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 16 }, { chord: 'C', position: 24 }] },
          { text: 'These for sin could not atone', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 18 }] },
          { text: 'Thou must save and Thou alone', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 18 }] },
          { text: 'In my hand no price I bring', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 16 }] },
          { text: 'Simply to Thy cross I cling', chords: [{ chord: 'F', position: 0 }, { chord: 'G', position: 14 }, { chord: 'C', position: 22 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'Nothing in my hand I bring', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 16 }] },
          { text: 'Simply to Thy cross I cling', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 16 }, { chord: 'C', position: 24 }] },
          { text: 'Naked come to Thee for dress', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 18 }] },
          { text: 'Helpless look to Thee for grace', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 20 }] },
          { text: 'Foul I to the fountain fly', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 16 }] },
          { text: 'Wash me Savior or I die', chords: [{ chord: 'F', position: 0 }, { chord: 'G', position: 14 }, { chord: 'C', position: 22 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 4',
        lines: [
          { text: 'While I draw this fleeting breath', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 18 }] },
          { text: 'When mine eyes shall close in death', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 18 }, { chord: 'C', position: 26 }] },
          { text: 'When I rise to worlds unknown', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 16 }] },
          { text: 'And behold Thee on Thy throne', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 18 }] },
          { text: 'Rock of ages cleft for me', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 16 }] },
          { text: 'Let me hide myself in Thee', chords: [{ chord: 'F', position: 0 }, { chord: 'G', position: 14 }, { chord: 'C', position: 24 }] },
        ],
      },
    ],
  },
  {
    id: 'a-mighty-fortress',
    title: 'A Mighty Fortress Is Our God',
    artist: 'Martin Luther',
    key: 'C',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'A mighty fortress is our God', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 14 }, { chord: 'C', position: 22 }] },
          { text: 'A bulwark never failing', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 14 }, { chord: 'C', position: 20 }] },
          { text: 'Our helper He amid the flood', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 16 }, { chord: 'C', position: 24 }] },
          { text: 'Of mortal ills prevailing', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 14 }, { chord: 'C', position: 20 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 1 (cont.)',
        lines: [
          { text: 'For still our ancient foe', chords: [{ chord: 'Am', position: 0 }, { chord: 'Em', position: 14 }] },
          { text: 'Doth seek to work us woe', chords: [{ chord: 'Am', position: 0 }, { chord: 'E', position: 14 }] },
          { text: 'His craft and power are great', chords: [{ chord: 'Am', position: 0 }, { chord: 'Dm', position: 16 }] },
          { text: 'And armed with cruel hate', chords: [{ chord: 'Am', position: 0 }, { chord: 'E', position: 14 }] },
          { text: 'On earth is not his equal', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 12 }, { chord: 'C', position: 20 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Did we in our own strength confide', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 18 }, { chord: 'C', position: 28 }] },
          { text: 'Our striving would be losing', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 14 }, { chord: 'C', position: 22 }] },
          { text: 'Were not the right man on our side', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 18 }, { chord: 'C', position: 28 }] },
          { text: 'The man of God\'s own choosing', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 14 }, { chord: 'C', position: 24 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2 (cont.)',
        lines: [
          { text: 'Dost ask who that may be', chords: [{ chord: 'Am', position: 0 }, { chord: 'Em', position: 14 }] },
          { text: 'Christ Jesus it is He', chords: [{ chord: 'Am', position: 0 }, { chord: 'E', position: 14 }] },
          { text: 'Lord Sabaoth His name', chords: [{ chord: 'Am', position: 0 }, { chord: 'Dm', position: 14 }] },
          { text: 'From age to age the same', chords: [{ chord: 'Am', position: 0 }, { chord: 'E', position: 14 }] },
          { text: 'And He must win the battle', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 14 }, { chord: 'C', position: 22 }] },
        ],
      },
    ],
  },
  {
    id: 'all-creatures',
    title: 'All Creatures of Our God and King',
    artist: 'Francis of Assisi',
    key: 'D',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'All creatures of our God and King', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 20 }] },
          { text: 'Lift up your voice and with us sing', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 20 }] },
          { text: 'Alleluia alleluia', chords: [{ chord: 'Bm', position: 0 }, { chord: 'G', position: 10 }] },
          { text: 'Thou burning sun with golden beam', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 20 }] },
          { text: 'Thou silver moon with softer gleam', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 22 }] },
        ],
      },
      {
        type: 'chorus',
        label: '',
        lines: [
          { text: 'O praise Him O praise Him', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 12 }] },
          { text: 'Alleluia alleluia alleluia', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 10 }, { chord: 'D', position: 20 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Thou rushing wind that art so strong', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 22 }] },
          { text: 'Ye clouds that sail in heaven along', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 24 }] },
          { text: 'O praise Him alleluia', chords: [{ chord: 'Bm', position: 0 }, { chord: 'G', position: 12 }] },
          { text: 'Thou rising morn in praise rejoice', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 22 }] },
          { text: 'Ye lights of evening find a voice', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 24 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'Let all things their Creator bless', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 24 }] },
          { text: 'And worship Him in humbleness', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 20 }] },
          { text: 'O praise Him alleluia', chords: [{ chord: 'Bm', position: 0 }, { chord: 'G', position: 12 }] },
          { text: 'Praise praise the Father praise the Son', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 24 }] },
          { text: 'And praise the Spirit three in one', chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 24 }] },
        ],
      },
    ],
  },
  {
    id: 'abide-with-me',
    title: 'Abide With Me',
    artist: 'Henry Lyte',
    key: 'C',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'Abide with me fast falls the eventide', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 14 }, { chord: 'C', position: 28 }] },
          { text: 'The darkness deepens Lord with me abide', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 22 }, { chord: 'C', position: 34 }] },
          { text: 'When other helpers fail and comforts flee', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 22 }, { chord: 'C', position: 36 }] },
          { text: 'Help of the helpless O abide with me', chords: [{ chord: 'F', position: 0 }, { chord: 'G', position: 20 }, { chord: 'C', position: 30 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Swift to its close ebbs out life\'s little day', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 22 }, { chord: 'C', position: 36 }] },
          { text: 'Earth\'s joys grow dim its glories pass away', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 22 }, { chord: 'C', position: 36 }] },
          { text: 'Change and decay in all around I see', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 22 }, { chord: 'C', position: 34 }] },
          { text: 'O Thou who changest not abide with me', chords: [{ chord: 'F', position: 0 }, { chord: 'G', position: 22 }, { chord: 'C', position: 32 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'I need Thy presence every passing hour', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 22 }, { chord: 'C', position: 36 }] },
          { text: 'What but Thy grace can foil the tempter\'s power', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 26 }, { chord: 'C', position: 40 }] },
          { text: 'Who like Thyself my guide and stay can be', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 22 }, { chord: 'C', position: 36 }] },
          { text: 'Through cloud and sunshine Lord abide with me', chords: [{ chord: 'F', position: 0 }, { chord: 'G', position: 24 }, { chord: 'C', position: 34 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 4',
        lines: [
          { text: 'Hold Thou Thy cross before my closing eyes', chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 22 }, { chord: 'C', position: 36 }] },
          { text: 'Shine through the gloom and point me to the skies', chords: [{ chord: 'Am', position: 0 }, { chord: 'G', position: 28 }, { chord: 'C', position: 42 }] },
          { text: "Heaven's morning breaks and earth's vain shadows flee", chords: [{ chord: 'C', position: 0 }, { chord: 'F', position: 26 }, { chord: 'C', position: 40 }] },
          { text: 'In life in death O Lord abide with me', chords: [{ chord: 'F', position: 0 }, { chord: 'G', position: 18 }, { chord: 'C', position: 30 }] },
        ],
      },
    ],
  },
  {
    id: 'jesus-loves-me',
    title: 'Jesus Loves Me',
    artist: 'Anna Warner',
    key: 'G',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'Jesus loves me this I know', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 16 }] },
          { text: 'For the Bible tells me so', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 16 }] },
          { text: 'Little ones to Him belong', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 16 }] },
          { text: 'They are weak but He is strong', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 18 }, { chord: 'G', position: 26 }] },
        ],
      },
      {
        type: 'chorus',
        label: 'Chorus',
        lines: [
          { text: 'Yes Jesus loves me', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 10 }] },
          { text: 'Yes Jesus loves me', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 10 }] },
          { text: 'Yes Jesus loves me', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 10 }] },
          { text: 'The Bible tells me so', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 10 }, { chord: 'G', position: 18 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Jesus loves me He who died', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }] },
          { text: "Heaven's gate to open wide", chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 18 }] },
          { text: 'He will wash away my sin', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }] },
          { text: 'Let His little child come in', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 18 }, { chord: 'G', position: 26 }] },
        ],
      },
    ],
  },
  {
    id: 'nearer-my-god',
    title: 'Nearer My God to Thee',
    artist: 'Sarah Adams',
    key: 'G',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'Nearer my God to Thee', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 12 }] },
          { text: 'Nearer to Thee', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 8 }] },
          { text: "E'en though it be a cross", chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 14 }] },
          { text: 'That raiseth me', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 8 }] },
          { text: 'Still all my song shall be', chords: [{ chord: 'Em', position: 0 }, { chord: 'C', position: 14 }] },
          { text: 'Nearer my God to Thee', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 12 }] },
          { text: 'Nearer my God to Thee nearer to Thee', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 22 }, { chord: 'G', position: 30 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Though like the wanderer', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 14 }] },
          { text: 'The sun gone down', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 8 }] },
          { text: 'Darkness be over me', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 14 }] },
          { text: 'My rest a stone', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 8 }] },
          { text: 'Yet in my dreams I\'d be', chords: [{ chord: 'Em', position: 0 }, { chord: 'C', position: 14 }] },
          { text: 'Nearer my God to Thee', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 12 }] },
          { text: 'Nearer my God to Thee nearer to Thee', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 22 }, { chord: 'G', position: 30 }] },
        ],
      },
    ],
  },
  {
    id: 'old-rugged-cross',
    title: 'The Old Rugged Cross',
    artist: 'George Bennard',
    key: 'G',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'On a hill far away stood an old rugged cross', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 24 }] },
          { text: 'The emblem of suffering and shame', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 22 }] },
          { text: 'And I love that old cross where the dearest and best', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 28 }] },
          { text: 'For a world of lost sinners was slain', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 20 }, { chord: 'G', position: 30 }] },
        ],
      },
      {
        type: 'chorus',
        label: 'Chorus',
        lines: [
          { text: 'So I\'ll cherish the old rugged cross', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 22 }] },
          { text: 'Till my trophies at last I lay down', chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 24 }] },
          { text: 'I will cling to the old rugged cross', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 22 }] },
          { text: 'And exchange it some day for a crown', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 22 }, { chord: 'G', position: 34 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'O that old rugged cross so despised by the world', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 28 }] },
          { text: 'Has a wondrous attraction for me', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 22 }] },
          { text: 'For the dear Lamb of God left His glory above', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 28 }] },
          { text: 'To bear it to dark Calvary', chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 14 }, { chord: 'G', position: 24 }] },
        ],
      },
    ],
  },
  {
    id: 'fairest-lord-jesus',
    title: 'Fairest Lord Jesus',
    artist: 'Munster Gesangbuch',
    key: 'G',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'Fairest Lord Jesus ruler of all nature', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }, { chord: 'G', position: 28 }] },
          { text: 'O Thou of God and man the Son', chords: [{ chord: 'Em', position: 0 }, { chord: 'D', position: 18 }] },
          { text: 'Thee will I cherish Thee will I honor', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 20 }, { chord: 'G', position: 30 }] },
          { text: 'Thou my soul\'s glory joy and crown', chords: [{ chord: 'C', position: 0 }, { chord: 'D', position: 18 }, { chord: 'G', position: 26 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'Fair are the meadows fairer still the woodlands', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 20 }, { chord: 'G', position: 36 }] },
          { text: 'Robed in the blooming garb of spring', chords: [{ chord: 'Em', position: 0 }, { chord: 'D', position: 22 }] },
          { text: 'Jesus is fairer Jesus is purer', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }, { chord: 'G', position: 28 }] },
          { text: 'Who makes the woeful heart to sing', chords: [{ chord: 'C', position: 0 }, { chord: 'D', position: 18 }, { chord: 'G', position: 28 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 3',
        lines: [
          { text: 'Fair is the sunshine fairer still the moonlight', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 20 }, { chord: 'G', position: 36 }] },
          { text: 'And all the twinkling starry host', chords: [{ chord: 'Em', position: 0 }, { chord: 'D', position: 22 }] },
          { text: 'Jesus shines brighter Jesus shines purer', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 22 }, { chord: 'G', position: 36 }] },
          { text: 'Than all the angels heaven can boast', chords: [{ chord: 'C', position: 0 }, { chord: 'D', position: 22 }, { chord: 'G', position: 34 }] },
        ],
      },
    ],
  },
  {
    id: 'joyful-joyful',
    title: 'Joyful Joyful We Adore Thee',
    artist: 'Henry van Dyke',
    key: 'G',
    sections: [
      {
        type: 'verse',
        label: 'Verse 1',
        lines: [
          { text: 'Joyful joyful we adore Thee', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 16 }, { chord: 'G', position: 24 }] },
          { text: 'God of glory Lord of love', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 14 }, { chord: 'D', position: 22 }] },
          { text: 'Hearts unfold like flowers before Thee', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 20 }, { chord: 'G', position: 30 }] },
          { text: 'Opening to the sun above', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 14 }, { chord: 'D', position: 20 }, { chord: 'G', position: 24 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 1 (cont.)',
        lines: [
          { text: 'Melt the clouds of sin and sadness', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }, { chord: 'G', position: 28 }] },
          { text: 'Drive the dark of doubt away', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 16 }, { chord: 'D', position: 24 }] },
          { text: 'Giver of immortal gladness', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }, { chord: 'G', position: 28 }] },
          { text: 'Fill us with the light of day', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 14 }, { chord: 'D', position: 22 }, { chord: 'G', position: 28 }] },
        ],
      },
      {
        type: 'verse',
        label: 'Verse 2',
        lines: [
          { text: 'All Thy works with joy surround Thee', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 20 }, { chord: 'G', position: 30 }] },
          { text: 'Earth and heaven reflect Thy rays', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 18 }, { chord: 'D', position: 26 }] },
          { text: 'Stars and angels sing around Thee', chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 18 }, { chord: 'G', position: 28 }] },
          { text: 'Center of unbroken praise', chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 14 }, { chord: 'D', position: 22 }, { chord: 'G', position: 28 }] },
        ],
      },
    ],
  },
]
