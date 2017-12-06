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
class ChildhoodMemory extends CharacterAttribute {
  /**
   * Passes table name and roll modifier to super class.
   * The roll modifier is used to adjust the random
   * dice roll for a corresponding row.
   *
   * @constructs ChildhoodMemory
   * @param {integer} charismaMod Roll modifier
   */
  constructor(charismaMod) {
    super({tableName: 'childhood-memory', rollModifier: charismaMod});
  }
}
