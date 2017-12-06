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
class ChildhoodHome extends CharacterAttribute {
  /**
   * Passes table name and roll modifier to super class.
   * The roll modifier is used to adjust the random
   * dice roll for a corresponding row.
   *
   * @constructs ChildhoodHome
   * @param {integer} lifestyleMod Roll modifier
   */
  constructor(lifestyleMod) {
    super({tableName: 'childhood-home', rollModifier: lifestyleMod});
  }
}
