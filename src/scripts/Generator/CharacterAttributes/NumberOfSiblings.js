class NumberOfSiblings extends CharacterAttribute {
  constructor() {
    super('number-of-siblings');
    this.num = this.generateSiblingNum(this.data.outcome);
  }

  generateSiblingNum(siblingDice) {
    return siblingDice !== 'None'
      ? Dice.roll(siblingDice).get('total')
      : 0;
  }

  toString() {
    return this.num;
  }
}
