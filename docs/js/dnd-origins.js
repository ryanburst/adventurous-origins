'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TABLES;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(document).ready(function () {
  var character = new Character();
  character.generate().log();

  render();

  function render() {
    $('#class').html(character.class.toString());
    $('.c-class').html(character.class.toString().toLowerCase());
    $('#race').html(character.race.toString());
    $('#background').html(character.background.toString());
    $('.c-background').html(character.background.toString().toLowerCase());
    $('#charisma').html(character.charisma.toString());
    $('#age').html(character.age.toString());
    $('#class-decision').html(character.class.decision.toString());
    $('#background-decision').html(character.background.decision.toString());
    $('#birthplace').html(character.birthplace.toString());
    $('#family').html(character.family.toString());
    $('#family-lifestyle').html(character.family.lifestyle.toString());
    $('#childhood-home').html(character.family.childhoodHome.toString());
    $('#childhood-memory').html(character.family.childhoodMemory.toString());
    $('#life-events,#parents,#siblings').empty();
    $('#parents').append('<p>' + character.family.parents.toString() + '</p>');
    if (character.family.hasAbsentParent()) {
      character.family.parentalFate.forEach(function (fate) {
        return $('#parents').append('<p><em>Absent Parent Fate:</em> ' + fate.toString() + '</p>');
      });
    }
    $('#siblings').append('<p>Number of Siblings: ' + character.family.numSiblings.toString() + '</p>');
    if (character.family.hasSiblings()) {
      var $list = $('<ol></ol>');
      character.family.siblings.forEach(function (sibling) {
        var $listItem = $('<li></li>');
        $listItem.append('<p><em>Sibling</em></p>');
        $listItem.append('<p>Occupation: ' + sibling.occupation.toString() + '</p>');
        $listItem.append('<p>Alignment: ' + sibling.alignment.toString() + '</p>');
        $listItem.append('<p>Status: ' + sibling.status.toString() + '</p>');
        $listItem.append('<p>Relationship: ' + sibling.relationship.toString() + '</p>');
        $list.append($listItem);
      });
      $('#siblings').append($list);
    }
    character.events.forEach(function (event) {
      return $('#life-events').append('<p>' + event.toString() + '</p>');
    });
  }
});

var TABLES = (_TABLES = {
  "parents": {
    "name": "Parents",
    "roll": "1d100",
    "outcomes": [{
      "min": 1,
      "max": 95,
      "outcome": "You know who your parents are or were."
    }, {
      "min": 96,
      "max": 100,
      "outcome": "You do not know who your parents were."
    }]
  },
  "half-elf-parents": {
    "name": "Half-Elf Parents",
    "roll": "1d8",
    "outcomes": [{
      "min": 1,
      "max": 5,
      "outcome": "One parent was a human and the other was a half-elf."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "One parent was an elf and the other was a half-elf."
    }, {
      "min": 7,
      "max": 7,
      "outcome": "One parent was a human and the other was a half-elf."
    }, {
      "min": 8,
      "max": 8,
      "outcome": "Both parents were half-elves."
    }]
  },
  "half-orc-parents": {
    "name": "Half-Orc Parents",
    "roll": "1d8",
    "outcomes": [{
      "min": 1,
      "max": 3,
      "outcome": "One parent was an orc and the other was a human."
    }, {
      "min": 4,
      "max": 5,
      "outcome": "One parent was an orc and the other was a human."
    }, {
      "min": 6,
      "max": 7,
      "outcome": "One parent was an orc and the other was a half-orc."
    }, {
      "min": 8,
      "max": 8,
      "outcome": "Both parents were half-orcs."
    }]
  },
  "tiefling-parents": {
    "name": "Tiefling Parents",
    "roll": "1d8",
    "outcomes": [{
      "min": 1,
      "max": 4,
      "outcome": "Both parents were humans, their infernal heritage dormant until you came along."
    }, {
      "min": 5,
      "max": 6,
      "outcome": "One parent was a tiefling and the other was a human."
    }, {
      "min": 7,
      "max": 7,
      "outcome": "One parent was a tiefling and the other was a devil."
    }, {
      "min": 8,
      "max": 8,
      "outcome": "One parent was a human and the other was a devil."
    }]
  },
  "charisma": {
    "name": "Charisma",
    "roll": "random",
    "outcomes": [{
      "outcome": -5
    }, {
      "outcome": -4
    }, {
      "outcome": -3
    }, {
      "outcome": -2
    }, {
      "outcome": -1
    }, {
      "outcome": 0
    }, {
      "outcome": 1
    }, {
      "outcome": 2
    }, {
      "outcome": 3
    }, {
      "outcome": 4
    }, {
      "outcome": 5
    }]
  },
  "birthplace": {
    "name": "Birthplace",
    "roll": "1d100",
    "outcomes": [{
      "min": 1,
      "max": 50,
      "outcome": "Home"
    }, {
      "min": 51,
      "max": 55,
      "outcome": "Home of a family friend"
    }, {
      "min": 56,
      "max": 63,
      "outcome": "Home of a healer or midwife"
    }, {
      "min": 64,
      "max": 65,
      "outcome": "Carriage, cart, or wagon"
    }, {
      "min": 66,
      "max": 68,
      "outcome": "Barn, shed, or other outbuilding"
    }, {
      "min": 69,
      "max": 70,
      "outcome": "Cave"
    }, {
      "min": 71,
      "max": 72,
      "outcome": "Field"
    }, {
      "min": 73,
      "max": 74,
      "outcome": "Forest"
    }, {
      "min": 75,
      "max": 77,
      "outcome": "Temple"
    }, {
      "min": 78,
      "max": 78,
      "outcome": "Battlefield"
    }, {
      "min": 79,
      "max": 80,
      "outcome": "Alley or street"
    }, {
      "min": 81,
      "max": 82,
      "outcome": "Brothel, tavern, or inn"
    }, {
      "min": 83,
      "max": 84,
      "outcome": "Castle, keep, tower, or palace"
    }, {
      "min": 85,
      "max": 85,
      "outcome": "Sewer or rubbish heap"
    }, {
      "min": 86,
      "max": 88,
      "outcome": "Among people of a different race"
    }, {
      "min": 89,
      "max": 91,
      "outcome": "On board a boat or a ship"
    }, {
      "min": 92,
      "max": 93,
      "outcome": "In a prison or in the headquarters of a secret organization"
    }, {
      "min": 94,
      "max": 95,
      "outcome": "In a sage’s laboratory"
    }, {
      "min": 96,
      "max": 96,
      "outcome": "In the Feywild"
    }, {
      "min": 97,
      "max": 97,
      "outcome": "In the Shadowfell"
    }, {
      "min": 98,
      "max": 98,
      "outcome": "On the Astral Plane or the Ethereal Plane"
    }, {
      "min": 99,
      "max": 99,
      "outcome": "On an Inner Plane of your choice"
    }, {
      "min": 100,
      "max": 100,
      "outcome": "On an Outer Plane of your choice"
    }]
  },
  "number-of-siblings": {
    "name": "Number of Siblings",
    "roll": "1d10",
    "outcomes": [{
      "min": 1,
      "max": 2,
      "outcome": "None"
    }, {
      "min": 3,
      "max": 4,
      "outcome": "1d3"
    }, {
      "min": 5,
      "max": 6,
      "outcome": "1d4+1"
    }, {
      "min": 7,
      "max": 8,
      "outcome": "1d6+2"
    }, {
      "min": 9,
      "max": 10,
      "outcome": "1d8+3"
    }]
  },
  "birth-order": {
    "name": "Birth Order",
    "roll": "2d6",
    "outcomes": [{
      "min": 2,
      "max": 2,
      "outcome": "Twin, triplet, or quadruplet"
    }, {
      "min": 3,
      "max": 7,
      "outcome": "Older"
    }, {
      "min": 8,
      "max": 12,
      "outcome": "Younger"
    }]
  },
  "family": {
    "name": "Family",
    "roll": "1d100",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "None",
      "absentCount": 2
    }, {
      "min": 2,
      "max": 2,
      "outcome": "Institution, such as an asylum",
      "absentCount": 2
    }, {
      "min": 3,
      "max": 3,
      "outcome": "Temple",
      "absentCount": 2
    }, {
      "min": 4,
      "max": 5,
      "outcome": "Orphanage",
      "absentCount": 2
    }, {
      "min": 6,
      "max": 7,
      "outcome": "Guardian",
      "absentCount": 2
    }, {
      "min": 8,
      "max": 15,
      "outcome": "Paternal or maternal aunt, uncle, or both; or extended family such as a tribe or clan",
      "absentCount": 2
    }, {
      "min": 16,
      "max": 25,
      "outcome": "Paternal or maternal grandparent(s)",
      "absentCount": 2
    }, {
      "min": 26,
      "max": 35,
      "outcome": "Adoptive family (same or different race)",
      "absentCount": 0
    }, {
      "min": 36,
      "max": 55,
      "outcome": "Single father or stepfather",
      "absentCount": 1
    }, {
      "min": 56,
      "max": 75,
      "outcome": "Single mother or stepmother",
      "absentCount": 1
    }, {
      "min": 76,
      "max": 100,
      "outcome": "Mother and father",
      "absentCount": 0
    }]
  },
  "absent-parent-fate": {
    "name": "Absent Parent Fate",
    "roll": "1d4",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "raw": "Your parent died (roll on the Cause of Death supplemental table).",
      "outcome": "Your parent died. Cause of death: {{cause-of-death}}."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "Your parent was imprisoned, enslaved, or otherwise taken away."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "Your parent abandoned you."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "Your parent disappeared to an unknown fate."
    }]
  },
  "family-lifestyle": {
    "name": "Parents",
    "roll": "3d6",
    "outcomes": [{
      "min": 3,
      "max": 3,
      "outcome": "Wretched",
      "modifier": -40
    }, {
      "min": 4,
      "max": 5,
      "outcome": "Squalid",
      "modifier": -20
    }, {
      "min": 6,
      "max": 8,
      "outcome": "Poor",
      "modifier": -10
    }, {
      "min": 9,
      "max": 12,
      "outcome": "Modest",
      "modifier": 0
    }, {
      "min": 13,
      "max": 15,
      "outcome": "Comfortable",
      "modifier": 10
    }, {
      "min": 16,
      "max": 17,
      "outcome": "Wealthy",
      "modifier": 20
    }, {
      "min": 18,
      "max": 18,
      "outcome": "Aristocratic",
      "modifier": 40
    }]
  },
  "childhood-home": {
    "name": "Childhood Home",
    "roll": "1d100+MOD",
    "outcomes": [{
      "min": -40,
      "max": 0,
      "outcome": "On the streets"
    }, {
      "min": 1,
      "max": 20,
      "outcome": "Rundown shack"
    }, {
      "min": 21,
      "max": 30,
      "outcome": "No permanent residence; you moved around a lot"
    }, {
      "min": 31,
      "max": 40,
      "outcome": "Encampment or village in the wilderness"
    }, {
      "min": 41,
      "max": 50,
      "outcome": "Apartment in a rundown neighborhood"
    }, {
      "min": 51,
      "max": 70,
      "outcome": "Small house"
    }, {
      "min": 71,
      "max": 90,
      "outcome": "Large house"
    }, {
      "min": 91,
      "max": 110,
      "outcome": "Mansion"
    }, {
      "min": 111,
      "max": 140,
      "outcome": "Palace or castle"
    }]
  },
  "childhood-memory": {
    "name": "Childhood Memory",
    "roll": "3d6+MOD",
    "outcomes": [{
      "min": -5,
      "max": 3,
      "outcome": "I am still haunted by my childhood, when I was treated badly by my peers."
    }, {
      "min": 4,
      "max": 5,
      "outcome": "I spent most of my childhood alone, with no close friends."
    }, {
      "min": 6,
      "max": 8,
      "outcome": "Others saw me as being different or strange, and so I had few companions."
    }, {
      "min": 9,
      "max": 12,
      "outcome": "I had a few close friends and lived an ordinary childhood."
    }, {
      "min": 13,
      "max": 15,
      "outcome": "I had several friends, and my childhood was generally a happy one."
    }, {
      "min": 16,
      "max": 17,
      "outcome": "I always found it easy to make friends, and I loved being around people."
    }, {
      "min": 18,
      "max": 25,
      "outcome": "Everyone knew who I was, and I had friends everywhere I went."
    }]
  },
  "background": {
    "name": "Background",
    "roll": "random",
    "outcomes": [{
      "outcome": "Acolyte"
    }, {
      "outcome": "Charlatan"
    }, {
      "outcome": "Criminal"
    }, {
      "outcome": "Entertainer"
    }, {
      "outcome": "Folk Hero"
    }, {
      "outcome": "Guild Artisan"
    }, {
      "outcome": "Hermit"
    }, {
      "outcome": "Noble"
    }, {
      "outcome": "Outlander"
    }, {
      "outcome": "Sage"
    }, {
      "outcome": "Sailor"
    }, {
      "outcome": "Soldier"
    }, {
      "outcome": "Urchin"
    }]
  },
  "background-decision-acolyte": {
    "name": "Acolyte",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "I ran away from home at an early age and found refuge in a temple."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "My family gave me to a temple, since they were unable or unwilling to care for me."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "I grew up in a household with strong religious convictions. Entering the service of one or more gods seemed natural."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "An impassioned sermon struck a chord deep in my soul and moved me to serve the faith."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "I followed a childhood friend, a respected acquaintance, or someone I loved into religious service."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "After encountering a true servant of the gods, I was so inspired that I immediately entered the service of a religious group."
    }]
  },
  "background-decision-charlatan": {
    "name": "Charlatan",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "I was left to my own devices, and my knack for manipulating others helped me survive."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "I learned early on that people are gullible and easy to exploit."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "I often got in trouble, but I managed to talk my way out of it every time."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "I took up with a confidence artist, from whom I learned my craft."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "After a charlatan fleeced my family, I decided to learn the trade so I would never be fooled by such deception again."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "I was poor or I feared becoming poor, so I learned the tricks I needed to keep myself out of poverty."
    }]
  },
  "background-decision-criminal": {
    "name": "Criminal",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "I resented authority in my younger days and saw a life of crime as the best way to fight against tyranny and oppression."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "Necessity forced me to take up the life, since it was the only way I could survive."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "I fell in with a gang of reprobates and ne’er-do-wells, and I learned my specialty from them."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "A parent or relative taught me my criminal specialty to prepare me for the family business."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "I left home and found a place in a thieves’ guild or some other criminal organization."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "I was always bored, so I turned to crime to pass the time and discovered I was quite good at it."
    }]
  },
  "background-decision-entertainer": {
    "name": "Entertainer",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "Members of my family made ends meet by performing, so it was fitting for me to follow their example."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "I always had a keen insight into other people, enough so that I could make them laugh or cry with my stories or songs."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "I ran away from home to follow a minstrel troupe."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "I saw a bard perform once, and I knew from that moment on what I was born to do."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "I earned coin by performing on street corners and eventually made a name for myself."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "A traveling entertainer took me in and taught me the trade."
    }]
  },
  "background-decision-folk-hero": {
    "name": "Folk Hero",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "I learned what was right and wrong from my family."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "I was always enamored by tales of heroes and wished I could be something more than ordinary."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "I hated my mundane life, so when it was time for someone to step up and do the right thing, I took my chance."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "A parent or one of my relatives was an adventurer, and I was inspired by that person’s courage."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "A mad old hermit spoke a prophecy when I was born, saying that I would accomplish great things."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "I have always stood up for those who are weaker than I am."
    }]
  },
  "background-decision-guild-artisan": {
    "name": "Guild Artisan",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "I was apprenticed to a master who taught me the guild’s business."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "I helped a guild artisan keep a secret or complete a task, and in return I was taken on as an apprentice."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "One of my family members who belonged to the guild made a place for me."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "I was always good with my hands, so I took the opportunity to learn a trade."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "I wanted to get away from my home situation and start a new life."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "I learned the essentials of my craft from a mentor but had to join the guild to finish my training."
    }]
  },
  "background-decision-hermit": {
    "name": "Hermit",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "My enemies ruined my reputation, and I fled to the wilds to avoid further disparagement."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "I am comfortable with being isolated, as I seek inner peace."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "I never liked the people I called my friends, so it was easy for me to strike out on my own."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "I felt compelled to forsake my past, but did so with great reluctance, and sometimes I regret making that decision."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "I lost everything — my home, my family, my friends. Going it alone was all I could do."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "Society’s decadence disgusted me, so I decided to leave it behind."
    }]
  },
  "background-decision-noble": {
    "name": "Noble",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "I come from an old and storied family, and it fell to me to preserve the family name."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "My family has been disgraced, and I intend to clear our name."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "My family recently came by its title, and that elevation thrust us into a new and strange world."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "My family has a title, but none of my ancestors have distinguished themselves since we gained it."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "My family is filled with remarkable people. I hope to live up to their example."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "I hope to increase my family’s power and influence."
    }]
  },
  "background-decision-outlander": {
    "name": "Outlander",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "I spent a lot of time in the wilderness as a youngster, and I came to love that way of life."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "From a young age, I couldn’t abide the stink of the cities and preferred to spend my time in nature."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "I came to understand the darkness that lurks in the wilds, and I vowed to combat it."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "My people lived on the edges of civilization, and I learned the methods of survival from my family."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "After a tragedy I retreated to the wilderness, leaving my old life behind."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "My family moved away from civilization, and I learned to adapt to my new environment."
    }]
  },
  "background-decision-sage": {
    "name": "Sage",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "I was naturally curious, so I packed up and went to a university to learn more about the world."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "My mentor’s teachings opened my mind to new possibilities in that field of study."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "I was always an avid reader, and I learned much about my favorite topic on my own."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "I discovered an old library and pored over the texts I found there. That experience awakened a hunger for more knowledge."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "I impressed a wizard who told me I was squandering my talents and should seek out an education to take advantage of my gifts."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "One of my parents or a relative gave me a basic education that whetted my appetite, and I left home to build on what I had learned."
    }]
  },
  "background-decision-sailor": {
    "name": "Sailor",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "I was press-ganged by pirates and forced to serve on their ship until I finally escaped."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "I wanted to see the world, so I signed on as a deckhand for a merchant ship."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "One of my relatives was a sailor who took me to sea."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "I needed to escape my community quickly, so I stowed away on a ship. When the crew found me, I was forced to work for my passage."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "Reavers attacked my community, so I found refuge on a ship until I could seek vengeance."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "I had few prospects where I was living, so I left to find my fortune elsewhere."
    }]
  },
  "background-decision-soldier": {
    "name": "Soldier",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "I joined the militia to help protect my community from monsters."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "A relative of mine was a soldier, and I wanted to carry on the family tradition."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "The local lord forced me to enlist in the army."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "War ravaged my homeland while I was growing up. Fighting was the only life I ever knew."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "I wanted fame and fortune, so I joined a mercenary company, selling my sword to the highest bidder."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "Invaders attacked my homeland. It was my duty to take up arms in defense of my people."
    }]
  },
  "background-decision-urchin": {
    "name": "Urchin",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "Wanderlust caused me to leave my family to see the world. I look after myself."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "I ran away from a bad situation at home and made my own way in the world."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "Monsters wiped out my village, and I was the sole survivor. I had to find a way to survive."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "A notorious thief looked after me and other orphans, and we spied and stole to earn our keep."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "One day I woke up on the streets, alone and hungry, with no memory of my early childhood."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "My parents died, leaving no one to look after me. I raised myself."
    }]
  },
  "class": {
    "name": "Class",
    "roll": "1d100",
    "outcomes": [{
      "min": 1,
      "max": 7,
      "outcome": "Barbarian"
    }, {
      "min": 8,
      "max": 14,
      "outcome": "Bard"
    }, {
      "min": 15,
      "max": 29,
      "outcome": "Cleric"
    }, {
      "min": 30,
      "max": 36,
      "outcome": "Druid"
    }, {
      "min": 37,
      "max": 52,
      "outcome": "Fighter"
    }, {
      "min": 53,
      "max": 58,
      "outcome": "Monk"
    }, {
      "min": 59,
      "max": 64,
      "outcome": "Paladin"
    }, {
      "min": 65,
      "max": 70,
      "outcome": "Ranger"
    }, {
      "min": 71,
      "max": 84,
      "outcome": "Rogue"
    }, {
      "min": 85,
      "max": 89,
      "outcome": "Sorcerer"
    }, {
      "min": 90,
      "max": 94,
      "outcome": "Warlock"
    }, {
      "min": 95,
      "max": 100,
      "outcome": "Wizard"
    }]
  },
  "class-decision-barbarian": {
    "name": "Barbarian",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "My devotion to my people lifted me in battle, making me powerful and dangerous."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "The spirits of my ancestors called on me to carry out a great task."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "I lost control in battle one day, and it was as if something else was manipulating my body, forcing it to kill every foe I could reach."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "I went on a spiritual journey to find myself and instead found a spirit animal to guide, protect, and inspire me."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "I was struck by lightning and lived. Afterward, I found a new strength within me that let me push beyond my limitations."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "My anger needed to be channeled into battle, or I risked becoming an indiscriminate killer."
    }]
  },
  "class-decision-bard": {
    "name": "Bard",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "I awakened my latent bardic abilities through trial and error."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "I was a gifted performer and attracted the attention of a master bard who schooled me in the old techniques."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "I joined a loose society of scholars and orators to learn new techniques of performance and magic."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "I felt a calling to recount the deeds of champions and heroes, to bring them alive in song and story."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "I joined one of the great colleges to learn old lore, the secrets of magic, and the art of performance."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "I picked up a musical instrument one day and instantly discovered that I could play it."
    }]
  },
  "class-decision-cleric": {
    "name": "Cleric",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "A supernatural being in service to the gods called me to become a divine agent in the world."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "I saw the injustice and horror in the world and felt moved to take a stand against them."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "My god gave me an unmistakable sign. I dropped everything to serve the divine."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "Although I was always devout, it wasn’t until I completed a pilgrimage that I knew my true calling."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "I used to serve in my religion’s bureaucracy but found I needed to work in the world, to bring the message of my faith to the darkest corners of the land."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "I realize that my god works through me, and I do as commanded, even though I don’t know why I was chosen to serve."
    }]
  },
  "class-decision-druid": {
    "name": "Druid",
    "roll": "1d6",
    "outcomes": [{
      "min": 1,
      "max": 1,
      "outcome": "I saw too much devastation in the wild places, too much of nature’s splendor ruined by the despoilers. I joined a circle of druids to fight back against the enemies of nature."
    }, {
      "min": 2,
      "max": 2,
      "outcome": "I found a place among a group of druids after I fled a catastrophe."
    }, {
      "min": 3,
      "max": 3,
      "outcome": "I have always had an affinity for animals, so I explored my talent to see how I could best use it."
    }, {
      "min": 4,
      "max": 4,
      "outcome": "I befriended a druid and was moved by druidic teachings. I decided to follow my friend’s guidance and give something back to the world."
    }, {
      "min": 5,
      "max": 5,
      "outcome": "While I was growing up, I saw spirits all around me — entities no one else could perceive. I sought out the druids to help me understand the visions and communicate with these beings."
    }, {
      "min": 6,
      "max": 6,
      "outcome": "I have always felt disgust for creatures of unnatural origin. For this reason, I immersed myself in the study of the druidic mysteries and became a champion of the natural order."
    }]
  }
}, _defineProperty(_TABLES, 'class-decision-druid', {
  "name": "Druid",
  "roll": "1d6",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "I saw too much devastation in the wild places, too much of nature’s splendor ruined by the despoilers. I joined a circle of druids to fight back against the enemies of nature."
  }, {
    "min": 2,
    "max": 2,
    "outcome": "I found a place among a group of druids after I fled a catastrophe."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "I have always had an affinity for animals, so I explored my talent to see how I could best use it."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "I befriended a druid and was moved by druidic teachings. I decided to follow my friend’s guidance and give something back to the world."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "While I was growing up, I saw spirits all around me — entities no one else could perceive. I sought out the druids to help me understand the visions and communicate with these beings."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "I have always felt disgust for creatures of unnatural origin. For this reason, I immersed myself in the study of the druidic mysteries and became a champion of the natural order."
  }]
}), _defineProperty(_TABLES, "class-decision-fighter", {
  "name": "Fighter",
  "roll": "1d6",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "I wanted to hone my combat skills, and so I joined a war college."
  }, {
    "min": 2,
    "max": 2,
    "outcome": "I squired for a knight who taught me how to fight, care for a steed, and conduct myself with honor. I decided to take up that path for myself."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "Horrible monsters descended on my community, killing someone I loved. I took up arms to destroy those creatures and others of a similar nature."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "I joined the army and learned how to fight as part of a group."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "I grew up fighting, and I refined my talents by defending myself against people who crossed me."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "I could always pick up just about any weapon and know how to use it effectively."
  }]
}), _defineProperty(_TABLES, "class-decision-monk", {
  "name": "Monk",
  "roll": "1d6",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "I was chosen to study at a secluded monastery. There, I was taught the fundamental techniques required to eventually master a tradition."
  }, {
    "min": 2,
    "max": 2,
    "outcome": "I sought instruction to gain a deeper understanding of existence and my place in the world."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "I stumbled into a portal to the Shadowfell and took refuge in a strange monastery, where I learned how to defend myself against the forces of darkness."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "I was overwhelmed with grief after losing someone close to me, and I sought the advice of philosophers to help me cope with my loss."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "I could feel that a special sort of power lay within me, so I sought out those who could help me call it forth and master it."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "I was wild and undisciplined as a youngster, but then I realized the error of my ways. I applied to a monastery and became a monk as a way to live a life of discipline."
  }]
}), _defineProperty(_TABLES, "class-decision-paladin", {
  "name": "Paladin",
  "roll": "1d6",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "A fantastical being appeared before me and called on me to undertake a holy quest."
  }, {
    "min": 2,
    "max": 2,
    "outcome": "One of my ancestors left a holy quest unfulfilled, so I intend to finish that work."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "The world is a dark and terrible place. I decided to serve as a beacon of light shining out against the gathering shadows."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "I served as a paladin’s squire, learning all I needed to swear my own sacred oath."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "Evil must be opposed on all fronts. I feel compelled to seek out wickedness and purge it from the world."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "Becoming a paladin was a natural consequence of my unwavering faith. In taking my vows, I became the holy sword of my religion."
  }]
}), _defineProperty(_TABLES, "class-decision-ranger", {
  "name": "Ranger",
  "roll": "1d6",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "I found purpose while I honed my hunting skills by bringing down dangerous animals at the edge of civilization."
  }, {
    "min": 2,
    "max": 2,
    "outcome": "I always had a way with animals, able to calm them with a soothing word and a touch."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "I suffer from terrible wanderlust, so being a ranger gave me a reason not to remain in one place for too long."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "I have seen what happens when the monsters come out from the dark. I took it upon myself to become the first line of defense against the evils that lie beyond civilization’s borders."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "I met a grizzled ranger who taught me woodcraft and the secrets of the wild lands."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "I served in an army, learning the precepts of my profession while blazing trails and scouting enemy encampments."
  }]
}), _defineProperty(_TABLES, "class-decision-rogue", {
  "name": "Rogue",
  "roll": "1d6",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "I’ve always been nimble and quick of wit, so I decided to use those talents to help me make my way in the world."
  }, {
    "min": 2,
    "max": 2,
    "outcome": "An assassin or a thief wronged me, so I focused my training on mastering the skills of my enemy to better combat foes of that sort."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "An experienced rogue saw something in me and taught me several useful tricks."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "I decided to turn my natural lucky streak into the basis of a career, though I still realize that improving my skills is essential."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "I took up with a group of ruffians who showed me how to get what I want through sneakiness rather than direct confrontation."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "I’m a sucker for a shiny bauble or a sack of coins, as long as I can get my hands on it without risking life and limb."
  }]
}), _defineProperty(_TABLES, "class-decision-sorcerer", {
  "name": "Sorcerer",
  "roll": "1d6",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "When I was born, all the water in the house froze solid, the milk spoiled, or all the iron turned to copper. My family is convinced that this event was a harbinger of stranger things to come for me."
  }, {
    "min": 2,
    "max": 2,
    "outcome": "I suffered a terrible emotional or physical strain, which brought forth my latent magical power. I have fought to control it ever since."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "My immediate family never spoke of my ancestors, and when I asked, they would change the subject. It wasn’t until I started displaying strange talents that the full truth of my heritage came out."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "When a monster threatened one of my friends, I became filled with anxiety. I lashed out instinctively and blasted the wretched thing with a force that came from within me."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "Sensing something special in me, a stranger taught me how to control my gift."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "After I escaped from a magical conflagration, I realized that though I was unharmed, I was not unchanged. I began to exhibit unusual abilities that I am just beginning to understand."
  }]
}), _defineProperty(_TABLES, "class-decision-warlock", {
  "name": "Warlock",
  "roll": "1d6",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "While wandering around in a forbidden place, I encountered an otherworldly being that offered to enter into a pact with me."
  }, {
    "min": 2,
    "max": 2,
    "outcome": "I was examining a strange tome I found in an abandoned library when the entity that would become my patron suddenly appeared before me."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "I stumbled into the clutches of my patron after I accidentally stepped through a magical doorway."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "When I was faced with a terrible crisis, I prayed to any being who would listen, and the creature that answered became my patron."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "My future patron visited me in my dreams and offered great power in exchange for my service."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "One of my ancestors had a pact with my patron, so that entity was determined to bind me to the same agreement."
  }]
}), _defineProperty(_TABLES, "class-decision-wizard", {
  "name": "Wizard",
  "roll": "1d6",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "An old wizard chose me from among several candidates to serve an apprenticeship."
  }, {
    "min": 2,
    "max": 2,
    "outcome": "When I became lost in a forest, a hedge wizard found me, took me in, and taught me the rudiments of magic."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "I grew up listening to tales of great wizards and knew I wanted to follow their path. I strove to be accepted at an academy of magic and succeeded."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "One of my relatives was an accomplished wizard who decided I was smart enough to learn the craft."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "While exploring an old tomb, library, or temple, I found a spellbook. I was immediately driven to learn all I could about becoming a wizard."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "I was a prodigy who demonstrated mastery of the arcane arts at an early age. When I became old enough to set out on my own, I did so to learn more magic and expand my power."
  }]
}), _defineProperty(_TABLES, "current-age", {
  "name": "Current Age",
  "roll": "1d100",
  "outcomes": [{
    "min": 1,
    "max": 20,
    "outcome": "20 years or younger",
    "lifeEvents": '1d1'
  }, {
    "min": 21,
    "max": 59,
    "outcome": "21–30 years",
    "lifeEvents": "1d4"
  }, {
    "min": 60,
    "max": 69,
    "outcome": "31–40 years",
    "lifeEvents": "1d6"
  }, {
    "min": 70,
    "max": 89,
    "outcome": "41–50 years",
    "lifeEvents": "1d8"
  }, {
    "min": 90,
    "max": 99,
    "outcome": "51–60 years",
    "lifeEvents": "1d10"
  }, {
    "min": 100,
    "max": 100,
    "outcome": "61 years or older",
    "lifeEvents": "1d12"
  }]
}), _defineProperty(_TABLES, "life-events", {
  "name": "Life Events",
  "roll": "1d100",
  "outcomes": [{
    "min": 1,
    "max": 10,
    "raw": "You suffered a tragedy. Roll on the Tragedies table.",
    "outcome": "You suffered a tragedy. {{tragedies}}"
  }, {
    "min": 11,
    "max": 20,
    "raw": "You gained a bit of good fortune. Roll on the Boons table.",
    "outcome": "You gained a bit of good fortune. {{boons}}"
  }, {
    "min": 21,
    "max": 30,
    "outcome": "You fell in love or got married. If you get this result more than once, you can choose to have a child instead. Work with your DM to determine the identity of your love interest."
  }, {
    "min": 31,
    "max": 40,
    "outcome": "You made an enemy of an adventurer. Roll a d6. An odd number indicates you are to blame for the rift, and an even number indicates you are blameless. Use the supplemental tables and work with your DM to determine this hostile character’s identity and the danger this enemy poses to you."
  }, {
    "min": 41,
    "max": 50,
    "outcome": "You made a friend of an adventurer. Use the supplemental tables and work with your DM to add more detail to this friendly character and establish how your friendship began."
  }, {
    "min": 51,
    "max": 70,
    "raw": "You spent time working in a job related to your background. Start the game with an extra 2d6 gp.",
    "outcome": "You spent time working in a job related to your background. Start the game with an extra {{2d6}}gp."
  }, {
    "min": 71,
    "max": 75,
    "outcome": "You met someone important. Use the supplemental tables to determine this character’s identity and how this individual feels about you. Work out additional details with your DM as needed to fit this character into your backstory."
  }, {
    "min": 76,
    "max": 80,
    "raw": "You went on an adventure. Roll on the Adventures table to see what happened to you. Work with your DM to determine the nature of the adventure and the creatures you encountered.",
    "outcome": "You went on an adventure. {{adventures}} Work with your DM to determine the nature of the adventure and the creatures you encountered."
  }, {
    "min": 81,
    "max": 86,
    "raw": "You had a supernatural experience. Roll on the Supernatural Events table to find out what it was.",
    "outcome": "You had a supernatural experience. {{supernatural-events}}"
  }, {
    "min": 86,
    "max": 90,
    "raw": "You fought in a battle. Roll on the War table to learn what happened to you. Work with your DM to come up with the reason for the battle and the factions involved. It might have been a small conflict between your community and a band of orcs, or it could have been a major battle in a larger war.",
    "outcome": "You fought in a battle. {{war}} Work with your DM to come up with the reason for the battle and the factions involved. It might have been a small conflict between your community and a band of orcs, or it could have been a major battle in a larger war."
  }, {
    "min": 91,
    "max": 95,
    "raw": "You committed a crime or were wrongly accused of doing so. Roll on the Crime table to determine the nature of the offense and on the Punishment table to see what became of you.",
    "outcome": "You committed a crime or were wrongly accused of doing so. You were charged with \"{{crimes}}\". {{punishments}}"
  }, {
    "min": 96,
    "max": 99,
    "raw": "You encountered something magical. Roll on the Arcane Matters table.",
    "outcome": "You encountered something magical. {{arcane-matters}}"
  }, {
    "min": 100,
    "max": 100,
    "raw": "Something truly strange happened to you. Roll on the Weird Stuff table.",
    "outcome": "Something truly strange happened to you. {{weird-stuff}}"
  }]
}), _defineProperty(_TABLES, "adventures", {
  "name": "Adventures",
  "roll": "1d100",
  "outcomes": [{
    "min": 1,
    "max": 10,
    "outcome": "You nearly died. You have nasty scars on your body, and you are missing an ear, 1d3 fingers, or 1d4 toes."
  }, {
    "min": 11,
    "max": 20,
    "outcome": "You suffered a grievous injury. Although the wound healed, it still pains you from time to time."
  }, {
    "min": 21,
    "max": 30,
    "outcome": "You were wounded, but in time you fully recovered."
  }, {
    "min": 31,
    "max": 40,
    "outcome": "You contracted a disease while exploring a filthy warren. You recovered from the disease, but you have a persistent cough, pockmarks on your skin, or prematurely gray hair."
  }, {
    "min": 41,
    "max": 50,
    "outcome": "You were poisoned by a trap or a monster. You recovered, but the next time you must make a saving throw against poison, you make the saving throw with disadvantage."
  }, {
    "min": 51,
    "max": 60,
    "outcome": "You lost something of sentimental value to you during your adventure. Remove one trinket from your possessions."
  }, {
    "min": 61,
    "max": 70,
    "outcome": "You were terribly frightened by something you encountered and ran away, abandoning your companions to their fate."
  }, {
    "min": 71,
    "max": 80,
    "outcome": "You learned a great deal during your adventure. The next time you make an ability check or a saving throw, you have advantage on the roll."
  }, {
    "min": 81,
    "max": 90,
    "outcome": "You found some treasure on your adventure. You have 2d6 gp left from your share of it."
  }, {
    "min": 91,
    "max": 99,
    "outcome": "You found a considerable amount of treasure on your adventure. You have 1d20 + 50 gp left from your share of it."
  }, {
    "min": 100,
    "max": 100,
    "outcome": "You came across a common magic item (of the DM’s choice)."
  }]
}), _defineProperty(_TABLES, "arcane-matters", {
  "name": "Arcane Matters",
  "roll": "1d10",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "You were charmed or frightened by a spell."
  }, {
    "min": 2,
    "max": 2,
    "outcome": "You were injured by the effect of a spell."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "You witnessed a powerful spell being cast by a cleric, a druid, a sorcerer, a warlock, or a wizard."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "You drank a potion (of the DM’s choice)."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "You found a spell scroll (of the DM’s choice) and succeeded in casting the spell it contained."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "You were affected by teleportation magic."
  }, {
    "min": 7,
    "max": 7,
    "outcome": "You turned invisible for a time."
  }, {
    "min": 8,
    "max": 8,
    "outcome": "You identified an illusion for what it was."
  }, {
    "min": 9,
    "max": 9,
    "outcome": "You saw a creature being conjured by magic."
  }, {
    "min": 10,
    "max": 10,
    "outcome": "Your fortune was read by a diviner. Roll twice on the Life Events table, but don’t apply the results. Instead, the DM picks one event as a portent of your future (which might or might not come true)."
  }]
}), _defineProperty(_TABLES, "boons", {
  "name": "Boons",
  "roll": "1d10",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "A friendly wizard gave you a spell scroll containing one cantrip (of the DM’s choice)."
  }, {
    "min": 2,
    "max": 2,
    "outcome": "You saved the life of a commoner, who now owes you a life debt. This individual accompanies you on your travels and performs mundane tasks for you, but will leave if neglected, abused, or imperiled. Determine details about this character by using the supplemental tables and working with your DM."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "You found a riding horse."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "You found some money. You have 1d20 gp in addition to your regular starting funds."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "A relative bequeathed you a simple weapon of your choice."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "You found something interesting. You gain one additional trinket."
  }, {
    "min": 7,
    "max": 7,
    "outcome": "You once performed a service for a local temple. The next time you visit the temple, you can receive healing up to your hit point maximum."
  }, {
    "min": 8,
    "max": 8,
    "outcome": "A friendly alchemist gifted you with a potion of healing or a flask of acid, as you choose."
  }, {
    "min": 9,
    "max": 9,
    "outcome": "You found a treasure map."
  }, {
    "min": 10,
    "max": 10,
    "outcome": "A distant relative left you a stipend that enables you to live at the comfortable lifestyle for 1d20 years. If you choose to live at a higher lifestyle, you reduce the price of the lifestyle by 2 gp during that time period."
  }]
}), _defineProperty(_TABLES, "crimes", {
  "name": "Crime",
  "roll": "1d8",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "Murder"
  }, {
    "min": 2,
    "max": 2,
    "outcome": "Theft"
  }, {
    "min": 3,
    "max": 3,
    "outcome": "Burglary"
  }, {
    "min": 4,
    "max": 4,
    "outcome": "Assault"
  }, {
    "min": 5,
    "max": 5,
    "outcome": "Smuggling"
  }, {
    "min": 6,
    "max": 6,
    "outcome": "Kidnapping"
  }, {
    "min": 7,
    "max": 7,
    "outcome": "Extortion"
  }, {
    "min": 8,
    "max": 8,
    "outcome": "Counterfeiting"
  }]
}), _defineProperty(_TABLES, "punishments", {
  "name": "Punishment",
  "roll": "1d12",
  "outcomes": [{
    "min": 1,
    "max": 3,
    "outcome": "You did not commit the crime and were exonerated after being accused"
  }, {
    "min": 4,
    "max": 6,
    "outcome": "You committed the crime or helped do so, but nonetheless the authorities found you not guilty."
  }, {
    "min": 7,
    "max": 8,
    "outcome": "You were nearly caught in the act. You had to flee and are wanted in the community where the crime occurred."
  }, {
    "min": 9,
    "max": 12,
    "outcome": "You were caught and convicted. You spent time in jail, chained to an oar, or performing hard labor. You served a sentence of 1d4 years or succeeded in escaping after that much time."
  }]
}), _defineProperty(_TABLES, "supernatural-events", {
  "name": "Supernatural Events",
  "roll": "1d100",
  "outcomes": [{
    "min": 1,
    "max": 5,
    "outcome": "You were ensorcelled by a fey and enslaved for 1d6 years before you escaped."
  }, {
    "min": 6,
    "max": 10,
    "outcome": "You saw a demon and ran away before it could do anything to you."
  }, {
    "min": 11,
    "max": 15,
    "outcome": "A devil tempted you. Make a DC 10 Wisdom saving throw. On a failed save, your alignment shifts one step toward evil (if it’s not evil already), and you start the game with an additional 1d20 + 50 gp."
  }, {
    "min": 16,
    "max": 20,
    "outcome": "You woke up one morning miles from your home, with no idea how you got there."
  }, {
    "min": 21,
    "max": 30,
    "outcome": "You visited a holy site and felt the presence of the divine there."
  }, {
    "min": 31,
    "max": 40,
    "outcome": "You witnessed a falling red star, a face appearing in the frost, or some other bizarre happening. You are certain that it was an omen of some sort."
  }, {
    "min": 41,
    "max": 50,
    "outcome": "You escaped certain death and believe it was the intervention of a god that saved you."
  }, {
    "min": 51,
    "max": 60,
    "outcome": "You witnessed a minor miracle."
  }, {
    "min": 61,
    "max": 70,
    "outcome": "You explored an empty house and found it to be haunted."
  }, {
    "min": 71,
    "max": 75,
    "outcome": "You were briefly possessed. Roll a d6 to determine what type of creature possessed you: 1, celestial; 2, devil; 3, demon; 4, fey; 5, elemental; 6, undead."
  }, {
    "min": 76,
    "max": 80,
    "outcome": "You saw a ghost."
  }, {
    "min": 81,
    "max": 85,
    "outcome": "You saw a ghoul feeding on a corpse."
  }, {
    "min": 86,
    "max": 90,
    "outcome": "A celestial or a fiend visited you in your dreams to give a warning of dangers to come."
  }, {
    "min": 91,
    "max": 95,
    "outcome": "You briefly visited the Feywild or the Shadowfell."
  }, {
    "min": 96,
    "max": 100,
    "outcome": "You saw a portal that you believe leads to another plane of existence."
  }]
}), _defineProperty(_TABLES, "tragedies", {
  "name": "Tragedies",
  "roll": "1d12",
  "outcomes": [{
    "min": 1,
    "max": 2,
    "raw": "A family member or a close friend died. Roll on the Cause of Death supplemental table to find out how.",
    "outcome": "A family member or a close friend died. Cause of death: {{cause-of-death}}."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "A friendship ended bitterly, and the other person is now hostile to you. The cause might have been a misunderstanding or something you or the former friend did."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "You lost all your possessions in a disaster, and you had to rebuild your life."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "You were imprisoned for a crime you didn’t commit and spent 1d6 years at hard labor, in jail, or shackled to an oar in a slave galley."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "War ravaged your home community, reducing everything to rubble and ruin. In the aftermath, you either helped your town rebuild or moved somewhere else."
  }, {
    "min": 7,
    "max": 7,
    "outcome": "A lover disappeared without a trace. You have been looking for that person ever since."
  }, {
    "min": 8,
    "max": 8,
    "outcome": "A terrible blight in your home community caused crops to fail, and many starved. You lost a sibling or some other family member."
  }, {
    "min": 9,
    "max": 9,
    "outcome": "You did something that brought terrible shame to you in the eyes of your family. You might have been involved in a scandal, dabbled in dark magic, or offended someone important. The attitude of your family members toward you becomes indifferent at best, though they might eventually forgive you."
  }, {
    "min": 10,
    "max": 10,
    "outcome": "For a reason you were never told, you were exiled from your community. You then either wandered in the wilderness for a time or promptly found a new place to live."
  }, {
    "min": 11,
    "max": 11,
    "outcome": "A romantic relationship ended. Roll a d6. An odd number means it ended with bad feelings, while an even number means it ended amicably."
  }, {
    "min": 12,
    "max": 12,
    "raw": "A current or prospective romantic partner of yours died. Roll on the Cause of Death supplemental table to find out how. If the result is murder, roll a d12. On a 1, you were responsible, whether directly or indirectly.",
    "outcome": "A current or prospective romantic partner of yours died. Cause of death: {{cause-of-death}}. If the result is murder, roll a d12. On a 1, you were responsible, whether directly or indirectly."
  }]
}), _defineProperty(_TABLES, "war", {
  "name": "War",
  "roll": "1d12",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "You were knocked out and left for dead. You woke up hours later with no recollection of the battle."
  }, {
    "min": 2,
    "max": 3,
    "outcome": "You were badly injured in the fight, and you still bear the awful scars of those wounds."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "You ran away from the battle to save your life, but you still feel shame for your cowardice."
  }, {
    "min": 5,
    "max": 7,
    "outcome": "You suffered only minor injuries, and the wounds all healed without leaving scars."
  }, {
    "min": 8,
    "max": 9,
    "outcome": "You survived the battle, but you suffer from terrible nightmares in which you relive the experience."
  }, {
    "min": 10,
    "max": 11,
    "outcome": "You escaped the battle unscathed, though many of your friends were injured or lost."
  }, {
    "min": 12,
    "max": 12,
    "outcome": "You acquitted yourself well in battle and are remembered as a hero. You might have received a medal for your bravery."
  }]
}), _defineProperty(_TABLES, "weird-stuff", {
  "name": "Weird Stuff",
  "roll": "1d12",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "You were turned into a toad and remained in that form for 1d4 weeks."
  }, {
    "min": 2,
    "max": 2,
    "outcome": "You were petrified and remained a stone statue for a time until someone freed you."
  }, {
    "min": 3,
    "max": 3,
    "outcome": "You were enslaved by a hag, a satyr, or some other being and lived in that creature’s thrall for 1d6 years."
  }, {
    "min": 4,
    "max": 4,
    "outcome": "A dragon held you as a prisoner for 1d4 months until adventurers killed it."
  }, {
    "min": 5,
    "max": 5,
    "outcome": "You were taken captive by a race of evil humanoids such as drow, kuo-toa, or quaggoths. You lived as a slave in the Underdark until you escaped."
  }, {
    "min": 6,
    "max": 6,
    "outcome": "You served a powerful adventurer as a hireling. You have only recently left that service. Use the supplemental tables and work with your DM to determine the basic details about your former employer."
  }, {
    "min": 7,
    "max": 7,
    "outcome": "You went insane for 1d6 years and recently regained your sanity. A tic or some other bit of odd behavior might linger."
  }, {
    "min": 8,
    "max": 8,
    "outcome": "A lover of yours was secretly a silver dragon."
  }, {
    "min": 9,
    "max": 9,
    "outcome": "You were captured by a cult and nearly sacrificed on an altar to the foul being the cultists served. You escaped, but you fear they will find you."
  }, {
    "min": 10,
    "max": 10,
    "outcome": "You met a demigod, an archdevil, an archfey, a demon lord, or a titan, and you lived to tell the tale."
  }, {
    "min": 11,
    "max": 11,
    "outcome": "You were swallowed by a giant fish and spent a month in its gullet before you escaped."
  }, {
    "min": 12,
    "max": 12,
    "outcome": "A powerful being granted you a wish, but you squandered it on something frivolous."
  }]
}), _defineProperty(_TABLES, "alignment", {
  "name": "Alignment",
  "roll": "3d6",
  "outcomes": [{
    "min": 3,
    "max": 3,
    "outcome": "Chaotic evil (50%) or chaotic neutral (50%)"
  }, {
    "min": 4,
    "max": 5,
    "outcome": "Lawful evil"
  }, {
    "min": 6,
    "max": 8,
    "outcome": "Neutral evil"
  }, {
    "min": 9,
    "max": 12,
    "outcome": "Neutral"
  }, {
    "min": 13,
    "max": 15,
    "outcome": "Neutral good"
  }, {
    "min": 16,
    "max": 17,
    "outcome": "Lawful good (50%) or lawful neutral (50%)"
  }, {
    "min": 18,
    "max": 18,
    "outcome": "Chaotic good (50%) or chaotic neutral (50%)"
  }]
}), _defineProperty(_TABLES, "cause-of-death", {
  "name": "Cause of Death",
  "roll": "1d12",
  "outcomes": [{
    "min": 1,
    "max": 1,
    "outcome": "Unknown"
  }, {
    "min": 2,
    "max": 2,
    "outcome": "Murdered"
  }, {
    "min": 3,
    "max": 3,
    "outcome": "Killed in battle"
  }, {
    "min": 4,
    "max": 4,
    "outcome": "Accident related to class or occupation"
  }, {
    "min": 5,
    "max": 5,
    "outcome": "Accident unrelated to class or occupation"
  }, {
    "min": 6,
    "max": 7,
    "outcome": "Natural causes, such as disease or old age"
  }, {
    "min": 8,
    "max": 8,
    "outcome": "Apparent suicide"
  }, {
    "min": 9,
    "max": 9,
    "outcome": "Torn apart by an animal or a natural disaster"
  }, {
    "min": 10,
    "max": 10,
    "outcome": "Consumed by a monster"
  }, {
    "min": 11,
    "max": 11,
    "outcome": "Executed for a crime or tortured to death"
  }, {
    "min": 12,
    "max": 12,
    "outcome": "Bizarre event, such as being hit by a meteorite, struck down by an angry god, or killed by a hatching slaad egg"
  }]
}), _defineProperty(_TABLES, "occupation", {
  "name": "Occupation",
  "roll": "1d100",
  "outcomes": [{
    "min": 1,
    "max": 5,
    "outcome": "Academic"
  }, {
    "min": 6,
    "max": 10,
    "outcome": "Adventurer (choose from class table)"
  }, {
    "min": 11,
    "max": 11,
    "outcome": "Aristocrat"
  }, {
    "min": 12,
    "max": 26,
    "outcome": "Artisan or guild member"
  }, {
    "min": 27,
    "max": 31,
    "outcome": "Criminal"
  }, {
    "min": 32,
    "max": 36,
    "outcome": "Entertainer"
  }, {
    "min": 37,
    "max": 38,
    "outcome": "Exile, hermit, or refugee"
  }, {
    "min": 39,
    "max": 43,
    "outcome": "Explorer or wanderer"
  }, {
    "min": 44,
    "max": 55,
    "outcome": "Farmer or herder"
  }, {
    "min": 56,
    "max": 60,
    "outcome": "Hunter or trapper"
  }, {
    "min": 61,
    "max": 75,
    "outcome": "Laborer"
  }, {
    "min": 76,
    "max": 80,
    "outcome": "Merchant"
  }, {
    "min": 81,
    "max": 85,
    "outcome": "Politician or bureaucrat"
  }, {
    "min": 86,
    "max": 90,
    "outcome": "Priest"
  }, {
    "min": 91,
    "max": 95,
    "outcome": "Sailor"
  }, {
    "min": 96,
    "max": 100,
    "outcome": "Soldier"
  }]
}), _defineProperty(_TABLES, "race", {
  "name": "Race",
  "roll": "1d100",
  "outcomes": [{
    "min": 1,
    "max": 40,
    "outcome": "Human"
  }, {
    "min": 41,
    "max": 50,
    "outcome": "Dwarf"
  }, {
    "min": 51,
    "max": 60,
    "outcome": "Elf"
  }, {
    "min": 61,
    "max": 70,
    "outcome": "Hafling"
  }, {
    "min": 71,
    "max": 75,
    "outcome": "Dragonborn"
  }, {
    "min": 76,
    "max": 80,
    "outcome": "Gnome"
  }, {
    "min": 81,
    "max": 85,
    "outcome": "Half-elf"
  }, {
    "min": 86,
    "max": 90,
    "outcome": "Half-orc"
  }, {
    "min": 91,
    "max": 95,
    "outcome": "Tiefling"
  }, {
    "min": 96,
    "max": 100,
    "outcome": "DM's choice"
  }]
}), _defineProperty(_TABLES, "race-full", {
  "name": "Race",
  "roll": "random",
  "outcomes": [{
    "outcome": "Aarakockra"
  }, {
    "outcome": "Aasimar (Fallen)"
  }, {
    "outcome": "Aasimar (Protector)"
  }, {
    "outcome": "Aasimar (Scourge)"
  }, {
    "outcome": "Aasimar (Vairiant)"
  }, {
    "outcome": "Bugbear"
  }, {
    "outcome": "Dragonborn"
  }, {
    "outcome": "Dwarf (Duergar)"
  }, {
    "outcome": "Dwarf (Hill)"
  }, {
    "outcome": "Dwarf (Mountain)"
  }, {
    "outcome": "Elf (Drow)"
  }, {
    "outcome": "Elf (Eladrin)"
  }, {
    "outcome": "Elf (High)"
  }, {
    "outcome": "Elf (Wood)"
  }, {
    "outcome": "Firbolg"
  }, {
    "outcome": "Genasi (Air)"
  }, {
    "outcome": "Genasi (Earth)"
  }, {
    "outcome": "Genasi (Fire)"
  }, {
    "outcome": "Genasi (Water)"
  }, {
    "outcome": "Gnome (Deep)"
  }, {
    "outcome": "Gnome (Forest)"
  }, {
    "outcome": "Gnome (Rock)"
  }, {
    "outcome": "Goblin"
  }, {
    "outcome": "Goliath"
  }, {
    "outcome": "Half-Elf"
  }, {
    "outcome": "Half-Elf (Aquatic)"
  }, {
    "outcome": "Half-Elf (Drow)"
  }, {
    "outcome": "Half-Elf (High)"
  }, {
    "outcome": "Half-Elf (Wood)"
  }, {
    "outcome": "Halfling (Ghostwise)"
  }, {
    "outcome": "Halfling (Lightfoot)"
  }, {
    "outcome": "Halfling (Stout)"
  }, {
    "outcome": "Half-Orc"
  }, {
    "outcome": "Hobgoblin"
  }, {
    "outcome": "Human"
  }, {
    "outcome": "Human (Variant)"
  }, {
    "outcome": "Kenku"
  }, {
    "outcome": "Kobold"
  }, {
    "outcome": "Lizardfolk"
  }, {
    "outcome": "Orc"
  }, {
    "outcome": "Tabaxi"
  }, {
    "outcome": "Tiefling"
  }, {
    "outcome": "Teifling (Variant)"
  }, {
    "outcome": "Tiefling (Feral Variant)"
  }, {
    "outcome": "Tiefling (Feral)"
  }, {
    "outcome": "Tortle"
  }, {
    "outcome": "Triton"
  }, {
    "outcome": "Yuan-ti Pureblood"
  }]
}), _defineProperty(_TABLES, "relationship", {
  "name": "Relationship",
  "roll": "3d4",
  "outcomes": [{
    "min": 3,
    "max": 4,
    "outcome": "Hostile"
  }, {
    "min": 5,
    "max": 10,
    "outcome": "Friendly"
  }, {
    "min": 11,
    "max": 12,
    "outcome": "Indifferent"
  }]
}), _defineProperty(_TABLES, "status", {
  "name": "Status",
  "roll": "3d6",
  "outcomes": [{
    "min": 3,
    "max": 3,
    "raw": "Dead (roll on the Cause of Death table)",
    "outcome": "Dead, {{cause-of-death}}"
  }, {
    "min": 4,
    "max": 5,
    "outcome": "Missing or unknown"
  }, {
    "min": 6,
    "max": 8,
    "outcome": "Alive, but doing poorly due to injury, financial trouble, or relationship difficulties"
  }, {
    "min": 9,
    "max": 12,
    "outcome": "Alive and well"
  }, {
    "min": 13,
    "max": 15,
    "outcome": "Alive and quite successful"
  }, {
    "min": 16,
    "max": 17,
    "outcome": "Alive and infamous"
  }, {
    "min": 18,
    "max": 18,
    "outcome": "Alive and famous"
  }]
}), _TABLES);

/**
 * Base character generation class. Generates all of the
 * attributes of a character needed by instantiating
 * character attribute classes.
 *
 * @class
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */

var Character = function () {
  function Character() {
    _classCallCheck(this, Character);
  }

  _createClass(Character, [{
    key: 'generate',

    /**
     * Sets all character properties by instantiating other classes.
     * These classes will randomly pull from data tables.
     *
     * @return {class}
     */
    value: function generate() {
      this.class = new CharacterClass();
      this.race = new Race();
      this.background = new Background();
      this.charisma = new CharismaScore();
      this.age = new CurrentAge();
      this.birthplace = new Birthplace();
      this.family = new Family(this.charisma);
      this.events = new Set();

      return this.adventure();
    }

    /**
     * Sends the character on an adventure to gain life events.
     *
     * @return {class}
     */

  }, {
    key: 'adventure',
    value: function adventure() {
      var numEvents = Dice.roll(this.age.getLifeEventDice()).get('total');

      // Generate a new life event
      for (var x = 0; x < numEvents; x++) {
        this.events.add(new LifeEvent());
      }

      return this;
    }

    /**
     * Debug function that will output the results to the console.
     *
     * @return {class}
     */

  }, {
    key: 'log',
    value: function log() {
      console.log('Class:', this.class.toString());
      console.log('I became one because:', this.class.decision.toString());
      console.log('Race:', this.race.toString());
      console.log('Background:', this.background.toString());
      console.log('Charisma:', this.charisma.toString());
      console.log('Age:', this.age.toString());
      console.log('I am one because:', this.background.decision.toString());
      console.log('Birthplace: ', this.birthplace.toString());
      console.log('Family: ', this.family.toString());
      console.log('Parents: ', this.family.parents.toString());
      if (this.family.hasAbsentParent()) {
        this.family.parentalFate.forEach(function (fate) {
          return console.log('Parental Fate:', fate.toString());
        });
      }
      console.log('Number of Siblings: ', this.family.numSiblings.toString());
      if (this.family.hasSiblings()) {
        this.family.siblings.forEach(function (sibling) {

          console.log('Sibling:', 'Occupation - ', sibling.occupation.toString(), '| Alignment - ', sibling.alignment.toString(), '| Status - ', sibling.status.toString(), '| Relationship - ', sibling.relationship.toString());
        });
      }
      console.log('Family Lifestyle: ', this.family.lifestyle.toString());
      console.log('Childhood Home: ', this.family.childhoodHome.toString());
      console.log('Childhood Memory: ', this.family.childhoodMemory.toString());
      this.events.forEach(function (event) {
        return console.log('Life Event: ', event.toString());
      });

      return this;
    }
  }]);

  return Character;
}();

/**
 * Represents a character attribute. This class will
 * automatically pull a random value from a
 * corresponding data table.
 *
 * @class
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var CharacterAttribute = function () {
  /**
   * Takes in a configuration object and then
   * generates the random associated value.
   *
   * @constructs CharacterAttribute
   * @param config
   */
  function CharacterAttribute(config) {
    _classCallCheck(this, CharacterAttribute);

    this.setConfig(config);

    this.generate();
  }

  /**
   * Setter for the config property. Goes through
   * the config object and sets a property for
   * each key and value pair.
   *
   * @param  {object} config Configuration object
   */


  _createClass(CharacterAttribute, [{
    key: 'setConfig',


    /**
     * Sets the configuration object for this class.
     * If the passed in value is a string, assume
     * table name and set up an object. Otherwise
     * just set the object as normal.
     *
     * @param  {mixed} config Table name string or object
     * @return {class}
     */
    value: function setConfig(config) {
      if (typeof config === 'string') {
        this.config = {
          tableName: config
        };
      } else {
        this.config = config;
      }

      return this;
    }

    /**
     * Pulls in data from the corresponding table.
     * Depending on the table, it can either be
     * random or rolled for.
     *
     * @return {class}
     */

  }, {
    key: 'generate',
    value: function generate() {
      if (this.table.roll === 'random') {
        this.data = this.randomRow();
      } else {
        this.data = this.rollForRow();
      }

      return this;
    }

    /**
     * Grabs a random result from the table.
     *
     * @return {object}
     */

  }, {
    key: 'randomRow',
    value: function randomRow() {
      this.rollResult = Math.floor(Math.random() * this.table.outcomes.length);
      return this.table.outcomes[this.rollResult];
    }

    /**
     * Makes a roll for determining which value to return
     * from the data table. The number must be between
     * the min and max value in the data table.
     * @return {object}
     */

  }, {
    key: 'rollForRow',
    value: function rollForRow() {
      var _this = this;

      var result = false;

      this.rollResult = this.roll(this.table.roll);
      this.table.outcomes.forEach(function (outcome) {
        if (_this.rollResult.get('total') >= outcome.min && _this.rollResult.get('total') <= outcome.max) {
          return result = outcome;
        }
      });

      return result;
    }

    /**
     * Rolls the dice associated with this data table.
     *
     * @param  {string} dice Dice to roll for result
     * @return {object}
     */

  }, {
    key: 'roll',
    value: function roll(dice) {
      // If a roll modifier has been set, replace the "MOD"
      // key word with the value of the modifier before
      // we roll for a result. (1d4+MOD => 1d4+5)
      if (typeof this.rollModifier !== 'undefined') {
        dice = dice.replace("MOD", this.rollModifier);
      }

      return Dice.roll(dice);
    }

    /**
     * Translates an outcome string. This occurs when
     * an outcome string asks the player to roll
     * additional information in another table.
     *
     * @param  {string} outcome Outcome to translate
     * @return {string}
     */

  }, {
    key: 'translateOutcome',
    value: function translateOutcome(outcome) {
      // Match any {{keyword}} string
      var matches = outcome.match(/({{(.*?)}})+/g);

      for (var x in matches) {
        // Remove the brackets so we have just the keyword
        var match = matches[x].replace(/[{{}}]/g, '');

        // If the keyword is a table, we need to grab a
        // random value from it just as we're doing
        // with this character attribute.
        var replacement = null;
        if (TABLES[match]) {
          var table = new CharacterAttribute(match);
          replacement = table.toString();
          // Otherwise try a dice roll
        } else {
          replacement = Dice.roll(match).get('total');
        }

        outcome = outcome.replace(/{{(.*?)}}/, replacement);
      }

      return outcome;
    }

    /**
     * Return the outcome value from the table data.
     *
     * @return {string}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return this.data.outcome;
    }

    /**
     * Converts a string to key format by replacing all
     * spaces with dashes and lowercasing everything.
     *
     * @param  {string} str String to convert to key format
     * @return {string}
     */

  }, {
    key: 'config',
    set: function set(config) {
      var _this2 = this;

      this._config = config;
      Object.keys(config).forEach(function (prop) {
        return _this2[prop] = config[prop];
      });
    }

    /**
     * Getter for internal config property.
     *
     * @return {object}
     */
    ,
    get: function get() {
      return this._config;
    }

    /**
     * Sets the internal property for table name, making
     * sure to convert it to a key format. Also sets the
     * proper table from the data set.
     *
     * @param  {string} tableName Name of table
     */

  }, {
    key: 'tableName',
    set: function set(tableName) {
      this._tableName = CharacterAttribute.toKey(tableName);
      this.table = TABLES[this.tableName];
    }

    /**
     * Getter for internal table name property.
     *
     * @return {string}
     */
    ,
    get: function get() {
      return this._tableName;
    }

    /**
     * Sets the table data to the data property. If an
     * outcome needs to be "translated", runs the
     * translation method on the string.
     *
     * @param  {object} data Table data
     */

  }, {
    key: 'data',
    set: function set(data) {
      this._data = data;
      if (!data.raw) {
        data.raw = data.outcome;
      } else {
        data.outcome = this.translateOutcome(data.outcome);
      }
    }

    /**
     * Getter for internal data property.
     *
     * @return {object}
     */
    ,
    get: function get() {
      return this._data;
    }
  }], [{
    key: 'toKey',
    value: function toKey(str) {
      return str.replace(/\s/g, '-').toLowerCase();
    }
  }]);

  return CharacterAttribute;
}();

/**
 * Basic dice rolling class that turns a string
 * into an actual roll. Accepts strings like
 * "2d20" or "4d6+5".
 *
 * @class
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var Dice = function () {
  function Dice() {
    _classCallCheck(this, Dice);
  }

  _createClass(Dice, null, [{
    key: 'roll',

    /**
     * Main method of this class. Takes a dice string,
     * turns it into actual numbers, and returns a
     * result as a broken up object.
     *
     * {
     *   input: <original string>,
     *   num: <number of rolls>,
     *   dice: <what kind of dice to roll>,
     *   results: <array of results for each roll>,
     *   modifier: <object with mod type and value>,
     *   total: <total value>
     * }
     *
     * @param  {string} input Dice string (2d4+5)
     * @return {object}
     */
    value: function roll(input) {
      var parsed = Dice.addDice(Dice.parse(input));

      if (parsed.get('modifier')) {
        parsed = Dice.applyModifier(parsed);
      }

      return parsed;
    }

    /**
     * Parses an input string and breaks it out into an
     * object. This object has the number of rolls,
     * the dice to roll, and any modifiers that
     * need to be applied after the roll.
     *
     * @param  {string} input String to parse
     * @return {object}
     */

  }, {
    key: 'parse',
    value: function parse(input) {
      var reg = new RegExp("([1-9]\\d*)?d([1-9]\\d*)([/\*+-].+)?");
      var matches = reg.exec(input.replace(/\s/g, ''));
      var parsed = new Map([['input', matches[0]], ['num', typeof matches[1] === 'undefined' ? 1 : matches[1]], ['dice', matches[2]], ['results', new Set()], ['total', 0]]);

      // fourth match is the modifier (+5|-2|+CHA)
      if (typeof matches[3] !== 'undefined') {
        parsed.set('modifier', new Map([['type', matches[3].slice(0, 1)], ['mod', Number(matches[3].slice(1))]]));
      }

      return parsed;
    }

    /**
     * Loops through the all of the dice rolls and
     * adds them all together to get a total
     * Records results in result array.
     * The results get added to the
     * passed in parsed object.
     *
     * @param  {object} parsed Parsed input
     * @return {object}
     */

  }, {
    key: 'addDice',
    value: function addDice(parsed) {
      var numDice = parsed.get('num');
      var sides = parsed.get('dice');

      for (var i = 0; i < numDice; i++) {
        var roll = Math.floor(Math.random() * sides) + 1;
        parsed.get('results').add(roll);
        parsed.set('total', parsed.get('total') + roll);
      }

      return parsed;
    }

    /**
     * Applies the modifier to the total. The parsed
     * modifier is broken out into the type of
     * modifier (+-/*) and the actual mod.
     *
     * @param  {object} parsed Parsed input
     * @return {object}
     */

  }, {
    key: 'applyModifier',
    value: function applyModifier(parsed) {
      var total = parsed.get('total');
      var type = parsed.get('modifier').get('type');
      var modifier = parsed.get('modifier').get('mod');
      var operators = {
        '+': function _(a, b) {
          return a + b;
        },
        '<': function _(a, b) {
          return a < b;
        },
        '/': function _(a, b) {
          return a / b;
        },
        '*': function _(a, b) {
          return a * b;
        }
      };

      // Only update the total if the modifier is a number.
      // It could be a string representing an abstract
      // number that will be applied in other ways.
      if (Number.isInteger(modifier)) {
        parsed.set('total', operators[type](total, modifier));
      }

      return parsed;
    }
  }]);

  return Dice;
}();

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var AbsentParent = function (_CharacterAttribute) {
  _inherits(AbsentParent, _CharacterAttribute);

  /**
   * Passes table name to super class
   *
   * @constructs AbsentParent
   */
  function AbsentParent() {
    _classCallCheck(this, AbsentParent);

    return _possibleConstructorReturn(this, (AbsentParent.__proto__ || Object.getPrototypeOf(AbsentParent)).call(this, 'absent-parent-fate'));
  }

  return AbsentParent;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var Alignment = function (_CharacterAttribute2) {
  _inherits(Alignment, _CharacterAttribute2);

  /**
   * Passes table name to super class
   *
   * @constructs Alignment
   */
  function Alignment() {
    _classCallCheck(this, Alignment);

    return _possibleConstructorReturn(this, (Alignment.__proto__ || Object.getPrototypeOf(Alignment)).call(this, 'alignment'));
  }

  return Alignment;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var Background = function (_CharacterAttribute3) {
  _inherits(Background, _CharacterAttribute3);

  /**
   * Passes table name to super class. Also
   * creates a sub background property.
   *
   * @constructs Background
   */
  function Background() {
    _classCallCheck(this, Background);

    var _this5 = _possibleConstructorReturn(this, (Background.__proto__ || Object.getPrototypeOf(Background)).call(this, 'background'));

    _this5.decision = new BackgroundDecision(_this5);
    return _this5;
  }

  return Background;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var BackgroundDecision = function (_CharacterAttribute4) {
  _inherits(BackgroundDecision, _CharacterAttribute4);

  /**
   * Passes table name to super class. Uses the passed in
   * background class to determine the final class name.
   *
   * @constructs BackgroundDecision
   * @param {class} background Background
   */
  function BackgroundDecision(background) {
    _classCallCheck(this, BackgroundDecision);

    return _possibleConstructorReturn(this, (BackgroundDecision.__proto__ || Object.getPrototypeOf(BackgroundDecision)).call(this, 'background-decision-' + background.toString()));
  }

  return BackgroundDecision;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var BirthOrder = function (_CharacterAttribute5) {
  _inherits(BirthOrder, _CharacterAttribute5);

  /**
   * Passes table name to super class
   *
   * @constructs BirthOrder
   * @param {class} family Family class
   */
  function BirthOrder(family) {
    _classCallCheck(this, BirthOrder);

    var _this7 = _possibleConstructorReturn(this, (BirthOrder.__proto__ || Object.getPrototypeOf(BirthOrder)).call(this, 'birth-order'));

    _this7.family = family;
    return _this7;
  }

  /**
   * Overrides the parent toString method under
   * certain circumstances to determine the
   * correct string.
   *
   * @return {string}
   */


  _createClass(BirthOrder, [{
    key: 'toString',
    value: function toString() {
      // If this is the row that says "Twin, triplet, or Quadruplet",
      // use the family class to find out how many siblings this
      // character has to determine which of that string is
      // actually possible (1 sibling cannot be triplet).
      if (this.data.min === 2) {
        var numSiblings = this.family.numSiblings.toString();
        var options = ['Twin'];
        // 3 or more siblings can be any one of the options
        if (numSiblings >= 3) {
          options = ['Twin', 'Triplet', 'Quadruplet'];
          // 2 siblings can be either twin or triplet
        } else if (numSiblings >= 2) {
          options = ['Twin', 'Triplet'];
        }
        return options[Math.floor(Math.random() * options.length)];
      }

      return _get(BirthOrder.prototype.__proto__ || Object.getPrototypeOf(BirthOrder.prototype), 'toString', this).call(this);
    }
  }]);

  return BirthOrder;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var Birthplace = function (_CharacterAttribute6) {
  _inherits(Birthplace, _CharacterAttribute6);

  /**
   * Passes table name to super class
   *
   * @constructs Birthplace
   */
  function Birthplace() {
    _classCallCheck(this, Birthplace);

    return _possibleConstructorReturn(this, (Birthplace.__proto__ || Object.getPrototypeOf(Birthplace)).call(this, 'birthplace'));
  }

  return Birthplace;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var CharacterClass = function (_CharacterAttribute7) {
  _inherits(CharacterClass, _CharacterAttribute7);

  /**
   * Passes table name to super class. Also creates
   * a sub character class property.
   *
   * @constructs CharacterClass
   */
  function CharacterClass() {
    _classCallCheck(this, CharacterClass);

    var _this9 = _possibleConstructorReturn(this, (CharacterClass.__proto__ || Object.getPrototypeOf(CharacterClass)).call(this, 'class'));

    _this9.decision = new ClassDecision(_this9);
    return _this9;
  }

  return CharacterClass;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var CharismaScore = function (_CharacterAttribute8) {
  _inherits(CharismaScore, _CharacterAttribute8);

  /**
   * Passes table name to super class
   *
   * @constructs CharismaScore
   */
  function CharismaScore() {
    _classCallCheck(this, CharismaScore);

    return _possibleConstructorReturn(this, (CharismaScore.__proto__ || Object.getPrototypeOf(CharismaScore)).call(this, 'charisma'));
  }

  return CharismaScore;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var ChildhoodHome = function (_CharacterAttribute9) {
  _inherits(ChildhoodHome, _CharacterAttribute9);

  /**
   * Passes table name and roll modifier to super class.
   * The roll modifier is used to adjust the random
   * dice roll for a corresponding row.
   *
   * @constructs ChildhoodHome
   * @param {integer} lifestyleMod Roll modifier
   */
  function ChildhoodHome(lifestyleMod) {
    _classCallCheck(this, ChildhoodHome);

    return _possibleConstructorReturn(this, (ChildhoodHome.__proto__ || Object.getPrototypeOf(ChildhoodHome)).call(this, { tableName: 'childhood-home', rollModifier: lifestyleMod }));
  }

  return ChildhoodHome;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var ChildhoodMemory = function (_CharacterAttribute10) {
  _inherits(ChildhoodMemory, _CharacterAttribute10);

  /**
   * Passes table name and roll modifier to super class.
   * The roll modifier is used to adjust the random
   * dice roll for a corresponding row.
   *
   * @constructs ChildhoodMemory
   * @param {integer} charismaMod Roll modifier
   */
  function ChildhoodMemory(charismaMod) {
    _classCallCheck(this, ChildhoodMemory);

    return _possibleConstructorReturn(this, (ChildhoodMemory.__proto__ || Object.getPrototypeOf(ChildhoodMemory)).call(this, { tableName: 'childhood-memory', rollModifier: charismaMod }));
  }

  return ChildhoodMemory;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var ClassDecision = function (_CharacterAttribute11) {
  _inherits(ClassDecision, _CharacterAttribute11);

  /**
   * Passes table name to super class. Uses the passed in
   * background class to determine the final class name.
   *
   * @constructs ClassDecision
   * @param {class} characterClass Character class
   */
  function ClassDecision(characterClass) {
    _classCallCheck(this, ClassDecision);

    return _possibleConstructorReturn(this, (ClassDecision.__proto__ || Object.getPrototypeOf(ClassDecision)).call(this, 'class-decision-' + characterClass.toString()));
  }

  return ClassDecision;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var CurrentAge = function (_CharacterAttribute12) {
  _inherits(CurrentAge, _CharacterAttribute12);

  /**
   * Passes table name to super class
   *
   * @constructs CurrentAge
   */
  function CurrentAge() {
    _classCallCheck(this, CurrentAge);

    return _possibleConstructorReturn(this, (CurrentAge.__proto__ || Object.getPrototypeOf(CurrentAge)).call(this, 'current-age'));
  }

  /**
   * Helper method to retrieve extra data from the
   * table. Grabs the number of life events that
   * correspond with this age group.
   *
   * @return {integer}
   */


  _createClass(CurrentAge, [{
    key: 'getLifeEventDice',
    value: function getLifeEventDice() {
      return this.data.lifeEvents;
    }
  }]);

  return CurrentAge;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var Family = function (_CharacterAttribute13) {
  _inherits(Family, _CharacterAttribute13);

  /**
   * Passes table name to super class and generates
   * more family attributes. The charisma modifier
   * is used to generate a corresponding
   * childhood memory.
   *
   * @constructs Family
   * @param {integer} charisma Charisma modifier
   */
  function Family(charisma) {
    _classCallCheck(this, Family);

    var _this15 = _possibleConstructorReturn(this, (Family.__proto__ || Object.getPrototypeOf(Family)).call(this, 'family'));

    _this15.generateParents();
    _this15.generateSiblings();
    _this15.generateHomeLife(charisma);
    return _this15;
  }

  /**
   * Generates parents (who raised them) and the
   * fate of any absent parents.
   *
   * @return {class}
   */


  _createClass(Family, [{
    key: 'generateParents',
    value: function generateParents() {
      this.parents = new Parents();

      // If one or more parents are "absent", determine
      // their fate (dead, alive, etc).
      if (this.hasAbsentParent()) {
        this.parentalFate = new Set();
        for (var i = 0; i < this.data.absentCount; i++) {
          this.parentalFate.add(new AbsentParent());
        }
      }

      return this;
    }

    /**
     * Generates siblings. Siblings have basic information,
     * like occupation, status and relationship.
     *
     * @return {class}
     */

  }, {
    key: 'generateSiblings',
    value: function generateSiblings() {
      this.numSiblings = new NumberOfSiblings();

      if (this.hasSiblings()) {
        this.siblings = new Set();
        for (var i = 0; i < this.numSiblings.toString(); i++) {
          this.siblings.add(new Sibling());
        }
      }

      return this;
    }

    /**
     * Generates a few more home life, family related
     * character attributes.
     *
     * @param  {integer} charisma Charisma mod
     * @return {class}
     */

  }, {
    key: 'generateHomeLife',
    value: function generateHomeLife(charisma) {
      this.lifestyle = new FamilyLifestyle();
      this.childhoodHome = new ChildhoodHome(this.lifestyle.mod);
      this.childhoodMemory = new ChildhoodMemory(charisma.toString());

      return this;
    }

    /**
     * Checks to see if there are any absent parents.
     *
     * @return {Boolean}
     */

  }, {
    key: 'hasAbsentParent',
    value: function hasAbsentParent() {
      return this.data.absentCount > 0;
    }

    /**
     * Checks to see if this character has any siblings.
     *
     * @return {Boolean}
     */

  }, {
    key: 'hasSiblings',
    value: function hasSiblings() {
      return this.numSiblings.toString() > 0;
    }
  }]);

  return Family;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var FamilyLifestyle = function (_CharacterAttribute14) {
  _inherits(FamilyLifestyle, _CharacterAttribute14);

  /**
   * Passes table name to super class
   *
   * @constructs FamilyLifestyle
   */
  function FamilyLifestyle() {
    _classCallCheck(this, FamilyLifestyle);

    return _possibleConstructorReturn(this, (FamilyLifestyle.__proto__ || Object.getPrototypeOf(FamilyLifestyle)).call(this, 'family-lifestyle'));
  }

  /**
   * Getter for retrieving extra data from the table.
   * Grabs the modifier number the rolled lifestyle
   * will grant the character.
   *
   * @return {integer}
   */


  _createClass(FamilyLifestyle, [{
    key: 'mod',
    get: function get() {
      return this.data.modifier;
    }
  }]);

  return FamilyLifestyle;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var LifeEvent = function (_CharacterAttribute15) {
  _inherits(LifeEvent, _CharacterAttribute15);

  /**
   * Passes table name to super class
   *
   * @constructs LifeEvent
   */
  function LifeEvent() {
    _classCallCheck(this, LifeEvent);

    return _possibleConstructorReturn(this, (LifeEvent.__proto__ || Object.getPrototypeOf(LifeEvent)).call(this, 'life-events'));
  }

  return LifeEvent;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var NumberOfSiblings = function (_CharacterAttribute16) {
  _inherits(NumberOfSiblings, _CharacterAttribute16);

  /**
   * Passes table name to super class and sets the
   * actual number of siblings.
   *
   * @constructs NumberOfSiblings
   */
  function NumberOfSiblings() {
    _classCallCheck(this, NumberOfSiblings);

    var _this18 = _possibleConstructorReturn(this, (NumberOfSiblings.__proto__ || Object.getPrototypeOf(NumberOfSiblings)).call(this, 'number-of-siblings'));

    _this18.num = _this18.generateSiblingNum(_this18.data.outcome);
    return _this18;
  }

  /**
   * This table returns a dice roll as a result, so
   * we need to convert that dice roll to an
   * actual number of siblings.
   *
   * @param  {string} siblingDice Dice to roll
   * @return {integer}
   */


  _createClass(NumberOfSiblings, [{
    key: 'generateSiblingNum',
    value: function generateSiblingNum(siblingDice) {
      return siblingDice !== 'None' ? Dice.roll(siblingDice).get('total') : 0;
    }

    /**
     * Instead of returning the outcome from the table,
     * return the generated number of siblings.
     *
     * @return {integer}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return this.num;
    }
  }]);

  return NumberOfSiblings;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var Occupation = function (_CharacterAttribute17) {
  _inherits(Occupation, _CharacterAttribute17);

  /**
   * Passes table name to super class
   *
   * @constructs Occupation
   */
  function Occupation() {
    _classCallCheck(this, Occupation);

    return _possibleConstructorReturn(this, (Occupation.__proto__ || Object.getPrototypeOf(Occupation)).call(this, 'occupation'));
  }

  return Occupation;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var Parents = function (_CharacterAttribute18) {
  _inherits(Parents, _CharacterAttribute18);

  /**
   * Passes table name to super class
   *
   * @constructs Parents
   */
  function Parents() {
    _classCallCheck(this, Parents);

    return _possibleConstructorReturn(this, (Parents.__proto__ || Object.getPrototypeOf(Parents)).call(this, 'parents'));
  }

  return Parents;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var Race = function (_CharacterAttribute19) {
  _inherits(Race, _CharacterAttribute19);

  /**
   * Passes table name to super class
   *
   * @constructs Race
   */
  function Race() {
    _classCallCheck(this, Race);

    return _possibleConstructorReturn(this, (Race.__proto__ || Object.getPrototypeOf(Race)).call(this, 'race'));
  }

  return Race;
}(CharacterAttribute);

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var Relationship = function (_CharacterAttribute20) {
  _inherits(Relationship, _CharacterAttribute20);

  /**
   * Passes table name to super class
   *
   * @constructs Relationship
   */
  function Relationship() {
    _classCallCheck(this, Relationship);

    return _possibleConstructorReturn(this, (Relationship.__proto__ || Object.getPrototypeOf(Relationship)).call(this, 'relationship'));
  }

  return Relationship;
}(CharacterAttribute);

/**
 * Sibling for a character
 *
 * @class
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var Sibling =
/**
 * Generates some random information about a sibling.
 *
 * @constructs Sibling
 */
function Sibling() {
  _classCallCheck(this, Sibling);

  this.occupation = new Occupation('occupation');
  this.alignment = new Alignment('alignment');
  this.status = new Status('status');
  this.relationship = new Relationship('relationship');
};

/**
 * Simple character attribute class representation.
 * Sends in the corresponding table name to its
 * parent class so it pulls the correct data.
 *
 * @class
 * @extends CharacterAttribute
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */


var Status = function (_CharacterAttribute21) {
  _inherits(Status, _CharacterAttribute21);

  /**
   * Passes table name to super class
   *
   * @constructs Status
   */
  function Status() {
    _classCallCheck(this, Status);

    return _possibleConstructorReturn(this, (Status.__proto__ || Object.getPrototypeOf(Status)).call(this, 'status'));
  }

  return Status;
}(CharacterAttribute);