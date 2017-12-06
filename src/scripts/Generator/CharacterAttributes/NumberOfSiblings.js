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
class NumberOfSiblings extends CharacterAttribute {
  /**
   * Passes table name to super class and sets the
   * actual number of siblings.
   *
   * @constructs NumberOfSiblings
   */
  constructor() {
    super('number-of-siblings');
    this.num = this.generateSiblingNum(this.data.outcome);
  }

  /**
   * This table returns a dice roll as a result, so
   * we need to convert that dice roll to an
   * actual number of siblings.
   *
   * @param  {string} siblingDice Dice to roll
   * @return {integer}
   */
  generateSiblingNum(siblingDice) {
    return siblingDice !== 'None'
      ? Dice.roll(siblingDice).get('total')
      : 0;
  }

  /**
   * Instead of returning the outcome from the table,
   * return the generated number of siblings.
   *
   * @return {integer}
   */
  toString() {
    return this.num;
  }
}
