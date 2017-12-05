class Dice {
  static roll(input) {
    let parsed = Dice.addDice(Dice.parse(input));

    if( parsed.get('modifier') ) {
      parsed = Dice.applyModifier(parsed);
    }

    return parsed;
  }

  static addDice(parsed) {
    let numDice = parsed.get('num');
    let sides   = parsed.get('dice');

    for(let x=0; x<numDice; x++) {
      let roll = Math.floor(Math.random() * sides) + 1;
      parsed.get('results').add(roll);
      parsed.set('total',parsed.get('total') + roll);
    }
    return parsed;
  }

  static applyModifier(parsed) {
    let total     = parsed.get('total');
    let modifier  = parsed.get('modifier');
    let operators = {
      '+': (a, b) => a + b,
      '<': (a, b) => a < b,
      '/': (a, b) => a / b,
      '*': (a, b) => a * b,
    };

    return parsed.set('total',operators[modifier.get('type')](total,modifier.get('mod')));
  }

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
}
