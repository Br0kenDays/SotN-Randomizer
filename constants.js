(function(self) {

  const devBaseUrl = 'https://dev.sotn.io/'
  const defaultOptions = 'P:safe'

  const optionsUrls = {
    'P:safe': 'https://sotn.io/',
    'P:adventure': 'https://a.sotn.io/',
    'P:casual': 'https://c.sotn.io/',
    'P:speedrun': 'https://s.sotn.io/',
  }

  const TYPE = {
    HEART: 0,
    GOLD: 1,
    SUBWEAPON: 2,
    POWERUP: 3,
    WEAPON1: 4,
    WEAPON2: 5,
    SHIELD: 6,
    HELMET: 7,
    ARMOR: 8,
    CLOAK: 9,
    ACCESSORY: 10,
    USABLE: 11,
  }

  // List of type names for logging.
  const typeNames = [
    'HEART',
    'GOLD',
    'SUBWEAPON',
    'POWERUP',
    'WEAPON1',
    'WEAPON2',
    'SHIELD',
    'HELMET',
    'ARMOR',
    'CLOAK',
    'ACCESSORY',
    'USABLE',
  ]

  const ZONE = {
    ST0:  0,  // Final Stage: Bloodlines
    ARE:  1,  // Colosseum
    CAT:  2,  // Catacombs
    CEN:  3,  // Center Cube
    CHI:  4,  // Abandoned Mine
    DAI:  5,  // Royal Chapel
    LIB:  6,  // Long Library
    NO0:  7,  // Marble Gallery
    NO1:  8,  // Outer Wall
    NO2:  9,  // Olrox's Quarters
    NO3:  10, // Castle Entrance
    NP3:  11, // Castle Entrance (after visiting Alchemy Laboratory)
    NO4:  12, // Underground Caverns
    NZ0:  13, // Alchemy Laboratory
    NZ1:  14, // Clock Tower
    TOP:  15, // Castle Keep
    RARE: 16, // Reverse Colosseum
    RCAT: 17, // Floating Catacombs
    RCHI: 18, // Cave
    RDAI: 19, // Anti-Chapel
    RLIB: 20, // Forbidden Library
    RNO0: 21, // Black Marble Gallery
    RNO1: 22, // Reverse Outer Wall
    RNO2: 23, // Death Wing's Lair
    RNO3: 24, // Reverse Entrance
    RNO4: 25, // Reverse Caverns
    RNZ0: 26, // Necromancy Laboratory
    RNZ1: 27, // Reverse Clock Tower
    RTOP: 28, // Reverse Castle Keep
    BO0:  29, // Olrox
    BO1:  30, // Legion
    BO2:  31, // Werewolf & Minotaur
    BO3:  32, // Scylla
    BO4:  33, // Doppleganger10
    BO5:  34, // Hippogryph
    BO6:  35, // Richter
    BO7:  36, // Cerberus
    RBO0: 37, // Trio
    RBO1: 38, // Beezlebub
    RBO2: 39, // Death
    RBO3: 40, // Medusa
    RBO4: 41, // Creature
    RBO5: 42, // Doppleganger40
    RBO6: 43, // Shaft/Dracula
    RBO7: 44, // Akmodan II
    RBO8: 45, // Galamoth
  }

  // List of zone strings for logging.
  const zoneNames = [
    'ST0',
    'ARE',
    'CAT',
    'CEN',
    'CHI',
    'DAI',
    'LIB',
    'NO0',
    'NO1',
    'NO2',
    'NO3',
    'NP3',
    'NO4',
    'NZ0',
    'NZ1',
    'TOP',
    'RARE',
    'RCAT',
    'RCHI',
    'RDAI',
    'RLIB',
    'RNO0',
    'RNO1',
    'RNO2',
    'RNO3',
    'RNO4',
    'RNZ0',
    'RNZ1',
    'RTOP',
    'BO0',
    'BO1',
    'BO2',
    'BO3',
    'BO4',
    'BO5',
    'BO6',
    'BO7',
    'RBO0',
    'RBO1',
    'RBO2',
    'RBO3',
    'RBO4',
    'RBO5',
    'RBO6',
    'RBO7',
    'RBO8',
  ]

  // Offsets in the bin of each zone file.
  const zones = [{
    id: ZONE.ST0,
    pos: 0x0533efc8,
    len: 271812,
    items: 0x0a60,
  }, {
    id: ZONE.ARE,
    pos: 0x043c2018,
    len: 352636,
    items: 0x0fe8,
  }, {
    id: ZONE.CAT,
    pos: 0x0448f938,
    len: 361920,
    items: 0x174c,
  }, {
    id: ZONE.CEN,
    pos: 0x0455bff8,
    len: 119916,
  }, {
    id: ZONE.CHI,
    pos: 0x045e8ae8,
    len: 193576,
    items: 0x09e4,
  }, {
    id: ZONE.DAI,
    pos: 0x04675f08,
    len: 373764,
    items: 0x0ec0,
  }, {
    id: ZONE.LIB,
    pos: 0x047a1ae8,
    len: 348876,
    items: 0x1a90,
  }, {
    id: ZONE.NO0,
    pos: 0x048f9a38,
    len: 390540,
    items: 0x1100,
  }, {
    id: ZONE.NO1,
    pos: 0x049d18b8,
    len: 356452,
    items: 0x1a2c,
  }, {
    id: ZONE.NO2,
    pos: 0x04aa0438,
    len: 327100,
    items: 0x0fec,
  }, {
    id: ZONE.NO3,
    pos: 0x04b665e8,
    len: 359960,
    items: 0x1c8c,
  }, {
    id: ZONE.NP3,
    pos: 0x053f4708,
    len: 341044,
    items: 0x1618,
  }, {
    id: ZONE.NO4,
    pos: 0x04c307e8,
    len: 391260,
    items: 0x1928,
  }, {
    id: ZONE.NZ0,
    pos: 0x054b0c88,
    len: 309120,
    items: 0x13b0,
  }, {
    id: ZONE.NZ1,
    pos: 0x055724b8,
    len: 271168,
    items: 0x111c,
  }, {
    id: ZONE.TOP,
    pos: 0x0560e7b8,
    len: 247132,
    items: 0x0d10,
  }, {
    id: ZONE.RARE,
    pos: 0x057509e8,
    len: 234384,
    items: 0x0a3c,
  }, {
    id: ZONE.RCAT,
    pos: 0x04cfa0b8,
    len: 278188,
    items: 0x13c8,
  }, {
    id: ZONE.RCHI,
    pos: 0x04da4968,
    len: 174880,
    items: 0x07cc,
  }, {
    id: ZONE.RDAI,
    pos: 0x04e31458,
    len: 295736,
    items: 0x0d2c,
  }, {
    id: ZONE.RLIB,
    pos: 0x04ee2218,
    len: 201776,
    items: 0x0bc8,
  }, {
    id: ZONE.RNO0,
    pos: 0x04f84a28,
    len: 347020,
    items: 0x0f8c,
  }, {
    id: ZONE.RNO1,
    pos: 0x0504f558,
    len: 357020,
    items: 0x0ae4,
  }, {
    id: ZONE.RNO2,
    pos: 0x050f7948,
    len: 313816,
    items: 0x0d40,
  }, {
    id: ZONE.RNO3,
    pos: 0x051ac758,
    len: 304428,
    items: 0x0f10,
  }, {
    id: ZONE.RNO4,
    pos: 0x0526a868,
    len: 384020,
    items: 0x1620,
  }, {
    id: ZONE.RNZ0,
    pos: 0x05902278,
    len: 281512,
    items: 0x0cc8,
  }, {
    id: ZONE.RNZ1,
    pos: 0x059bb0d8,
    len: 260960,
    items: 0x0ec8,
    rewards: 0x2570,
  }, {
    id: ZONE.RTOP,
    pos: 0x057df998,
    len: 200988,
    items: 0x07c8,
  }, {
    id: ZONE.BO0,
    pos: 0x05fa9dc8,
    len: 320948,
    rewards: 0x24d4,
  }, {
    id: ZONE.BO1,
    pos: 0x0606dab8,
    len: 205756,
    rewards: 0x1b98,
  }, {
    id: ZONE.BO2,
    pos: 0x060fca68,
    len: 223540,
    rewards: 0x181c,
  }, {
    id: ZONE.BO3,
    pos: 0x061a60b8,
    len: 210224,
    rewards: 0x1c60,
    items: 0x108c,
  }, {
    id: ZONE.BO4,
    pos: 0x06246d38,
    len: 347704,
    rewards: 0x42b0,
  }, {
    id: ZONE.BO5,
    pos: 0x06304e48,
    len: 218672,
    rewards: 0x18b8,
  }, {
    id: ZONE.BO6,
    pos: 0x063aa448,
    len: 333544,
    rewards: 0x2f90,
  }, {
    id: ZONE.BO7,
    pos: 0x066b32f8,
    len: 144480,
    rewards: 0x1440,
  }, {
    id: ZONE.RBO0,
    pos: 0x064705f8,
    len: 160988,
    rewards: 0x1988,
  }, {
    id: ZONE.RBO1,
    pos: 0x06590a18,
    len: 139104,
    rewards: 0x1550,
  }, {
    id: ZONE.RBO2,
    pos: 0x06620c28,
    len: 190792,
    rewards: 0x1788,
  }, {
    id: ZONE.RBO3,
    pos: 0x067422a8,
    len: 132656,
    rewards: 0x12a8,
  }, {
    id: ZONE.RBO4,
    pos: 0x067cfff8,
    len: 154660,
    rewards: 0x13b4,
  }, {
    id: ZONE.RBO5,
    pos: 0x06861468,
    len: 345096,
    rewards: 0x4348,
  }, {
    id: ZONE.RBO6,
    pos: 0x0692b668,
    len: 213060,
  }, {
    id: ZONE.RBO7,
    pos: 0x069d1598,
    len: 142572,
    rewards: 0x1300,
  }, {
    id: ZONE.RBO8,
    pos: 0x06a5f2e8,
    len: 161212,
    rewards: 0x2334,
  }]

  const exe = { pos: 0x0abb28, len: 703272 }
  const enemyListOff = 0xe90
  const enemyListLen = 292
  const enemyDataOff = 0x8900
  const enemyDataLen = 0x28

  const RELIC = {
    SOUL_OF_BAT: 'B',
    FIRE_OF_BAT: 'f',
    ECHO_OF_BAT: 'E',
    FORCE_OF_ECHO: 'e',
    SOUL_OF_WOLF: 'W',
    POWER_OF_WOLF: 'p',
    SKILL_OF_WOLF: 's',
    FORM_OF_MIST: 'M',
    POWER_OF_MIST: 'P',
    GAS_CLOUD: 'c',
    CUBE_OF_ZOE: 'z',
    SPIRIT_ORB: 'o',
    GRAVITY_BOOTS: 'V',
    LEAP_STONE: 'L',
    HOLY_SYMBOL: 'y',
    FAERIE_SCROLL: 'l',
    JEWEL_OF_OPEN: 'J',
    MERMAN_STATUE: 'U',
    BAT_CARD: 'b',
    GHOST_CARD: 'g',
    FAERIE_CARD: 'a',
    DEMON_CARD: 'd',
    SWORD_CARD: 'w',
    SPRITE_CARD: 't',
    NOSEDEVIL_CARD: 'n',
    HEART_OF_VLAD: 'A',
    TOOTH_OF_VLAD: 'T',
    RIB_OF_VLAD: 'R',
    RING_OF_VLAD: 'N',
    EYE_OF_VLAD: 'I',
    GOLD_RING: 'G',
    SILVER_RING: 'S',
    SPIKE_BREAKER: 'K',
    HOLY_GLASSES: 'H',
  }

  const tileIdOffset = 0x80

  // This is applied to helmet, armor, cloak, and other ids that are sold in
  // the librarian's shop menu or are in an equipment slot.
  const equipIdOffset = -0xa9

  // This is applied to equipment ids to get the inventory slot it occupies.
  const equipmentInvIdOffset = 0x798a

  const SLOT = {
    RIGHT_HAND: 'r',
    LEFT_HAND: 'l',
    HEAD: 'h',
    BODY: 'b',
    CLOAK: 'c',
    OTHER: 'o',
    OTHER2: 'o2',
    AXEARMOR: 'a',
    LUCK_MODE: 'x',
  }

  const slots = {
    'r':  0x097c00,
    'l':  0x097c04,
    'h':  0x097c08,
    'b':  0x097c0c,
    'c':  0x097c10,
    'o':  0x097c14,
    'o2': 0x097c18,
  }

  const EXTENSION = {
    GUARDED:   'guarded',
    EQUIPMENT: 'equipment',
  }

  const defaultExtension = EXTENSION.GUARDED

  const LOCATION = {
    CRYSTAL_CLOAK:               'Crystal Cloak',
    MORMEGIL:                    'Mormegil',
    DARK_BLADE:                  'Dark Blade',
    RING_OF_ARCANA:              'Ring of Arcana',
    HOLY_MAIL:                   'Holy Mail',
    JEWEL_SWORD:                 'Jewel Sword',
    BASILARD:                    'Basilard',
    SUNGLASSES:                  'Sunglasses',
    CLOTH_CAPE:                  'Cloth Cape',
    MYSTIC_PENDANT:              'Mystic Pendant',
    ANKH_OF_LIFE:                'Ankh of Life',
    MORNING_STAR:                'Morning Star',
    GOGGLES:                     'Goggles',
    SILVER_PLATE:                'Silver Plate',
    CUTLASS:                     'Cutlass',
    PLATINUM_MAIL:               'Platinum Mail',
    FALCHION:                    'Falchion',
    GOLD_PLATE:                  'Gold Plate',
    BEKATOWA:                    'Bekatowa',
    GLADIUS:                     'Gladius',
    JEWEL_KNUCKLES:              'Jewel Knuckles',
    HOLY_ROD:                    'Holy Rod',
    LIBRARY_ONYX:                'Library Onyx',
    BRONZE_CUIRASS:              'Bronze Cuirass',
    ALUCART_SWORD:               'Alucart Sword',
    BROADSWORD:                  'Broadsword',
    ESTOC:                       'Estoc',
    OLROX_GARNET:                'Olrox Garnet',
    BLOOD_CLOAK:                 'Blood Cloak',
    SHIELD_ROD:                  'Shield Rod',
    KNIGHT_SHIELD:               'Knight Shield',
    HOLY_SWORD:                  'Holy Sword',
    BANDANA:                     'Bandana',
    SECRET_BOOTS:                'Secret Boots',
    NUNCHAKU:                    'Nunchaku',
    KNUCKLE_DUSTER:              'Knuckle Duster',
    CAVERNS_ONYX:                'Caverns Onyx',
    COMBAT_KNIFE:                'Combat Knife',
    RING_OF_ARES:                'Ring of Ares',
    BLOODSTONE:                  'Bloodstone',
    ICEBRAND:                    'Icebrand',
    WALK_ARMOR:                  'Walk Armor',
    BERYL_CIRCLET:               'Beryl Circlet',
    TALISMAN:                    'Talisman',
    KATANA:                      'Katana',
    GODDESS_SHIELD:              'Goddess Shield',
    TWILIGHT_CLOAK:              'Twilight Cloak',
    TALWAR:                      'Talwar',
    SWORD_OF_DAWN:               'Sword of Dawn',
    BASTARD_SWORD:               'Bastard Sword',
    ROYAL_CLOAK:                 'Royal Cloak',
    LIGHTNING_MAIL:              'Lightning Mail',
    MOON_ROD:                    'Moon Rod',
    SUNSTONE:                    'Sunstone',
    LUMINUS:                     'Luminus',
    DRAGON_HELM:                 'Dragon Helm',
    SHOTEL:                      'Shotel',
    STAUROLITE:                  'Staurolite',
    BADELAIRE:                   'Badelaire',
    FORBIDDEN_LIBRARY_OPAL:      'Forbidden Library Opal',
    REVERSE_CAVERNS_DIAMOND:     'Reverse Caverns Diamond',
    REVERSE_CAVERNS_OPAL:        'Reverse Caverns Opal',
    REVERSE_CAVERNS_GARNET:      'Reverse Caverns Garnet',
    OSAFUNE_KATANA:              'Osafune Katana',
    ALUCARD_SHIELD:              'Alucard Shield',
    ALUCARD_SWORD:               'Alucard Sword',
    NECKLACE_OF_J:               'Necklace of J',
    FLOATING_CATACOMBS_DIAMOND:  'Floating Catacombs Diamond',
    SWORD_OF_HADOR:              'Sword of Hador',
    ALUCARD_MAIL:                'Alucard Mail',
    GRAM:                        'Gram',
    FURY_PLATE:                  'Fury Plate',
  }

  const GLOBAL_DROP = 'Global'
  const globalDropsCount = 32

  const WORKER_ACTION = {
    RELICS:    1,
    ITEMS:     2,
    FINALIZE:  3,
  }

  const exports = {
    devBaseUrl: devBaseUrl,
    defaultOptions: defaultOptions,
    optionsUrls: optionsUrls,
    TYPE: TYPE,
    typeNames: typeNames,
    ZONE: ZONE,
    zoneNames: zoneNames,
    zones: zones,
    exe: exe,
    enemyListOff: enemyListOff,
    enemyListLen: enemyListLen,
    enemyDataOff: enemyDataOff,
    enemyDataLen: enemyDataLen,
    RELIC: RELIC,
    tileIdOffset: tileIdOffset,
    equipIdOffset: equipIdOffset,
    equipmentInvIdOffset: equipmentInvIdOffset,
    SLOT: SLOT,
    slots: slots,
    EXTENSION: EXTENSION,
    defaultExtension: defaultExtension,
    LOCATION: LOCATION,
    GLOBAL_DROP: GLOBAL_DROP,
    globalDropsCount: globalDropsCount,
    WORKER_ACTION: WORKER_ACTION,
  }
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      constants: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
