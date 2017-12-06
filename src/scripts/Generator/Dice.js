/**
 * Basic dice rolling class that turns a string
 * into an actual roll. Accepts strings like
 * "2d20" or "4d6+5".
 *
 * @class
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */
class Dice {
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
  static roll(input) {
    let parsed = Dice.addDice(Dice.parse(input));

    if( parsed.get('modifier') ) {
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
  static parse(input) {
    let reg     = new RegExp("([1-9]\\d*)?d([1-9]\\d*)([/\*+-].+)?");
    let matches = reg.exec(input.replace(/\s/g, ''));
    let parsed  = new Map([
      ['input', matches[0]],
      ['num', typeof matches[1] === 'undefined' ? 1 : matches[1]],
      ['dice', matches[2]],
      ['results', new Set()],
      ['total', 0],
    ]);

    // fourth match is the modifier (+5|-2|+CHA)
    if( typeof matches[3] !== 'undefined' ) {
      parsed.set('modifier',new Map([
        ['type',matches[3].slice(0,1)],
        ['mod',Number(matches[3].slice(1))]
      ]));
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
  static addDice(parsed) {
    let numDice = parsed.get('num');
    let sides   = parsed.get('dice');

    for(let i=0; i<numDice; i++) {
      let roll = Math.floor(Math.random() * sides) + 1;
      parsed.get('results').add(roll);
      parsed.set('total',parsed.get('total') + roll);
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
  static applyModifier(parsed) {
    let total     = parsed.get('total');
    let type      = parsed.get('modifier').get('type');
    let modifier  = parsed.get('modifier').get('mod');
    let operators = {
      '+': (a, b) => a + b,
      '<': (a, b) => a < b,
      '/': (a, b) => a / b,
      '*': (a, b) => a * b,
    };

    // Only update the total if the modifier is a number.
    // It could be a string representing an abstract
    // number that will be applied in other ways.
    if( Number.isInteger(modifier) ) {
      parsed.set('total',operators[type](total,modifier))
    }

    return parsed;
  }
}
