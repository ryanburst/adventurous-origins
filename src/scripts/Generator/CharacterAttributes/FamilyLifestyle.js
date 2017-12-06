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
class FamilyLifestyle extends CharacterAttribute {
  /**
   * Passes table name to super class
   *
   * @constructs FamilyLifestyle
   */
  constructor() {
    super('family-lifestyle');
  }

  /**
   * Getter for retrieving extra data from the table.
   * Grabs the modifier number the rolled lifestyle
   * will grant the character.
   *
   * @return {integer}
   */
  get mod() {
    return this.data.modifier;
  }
}
