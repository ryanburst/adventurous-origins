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
class Alignment extends CharacterAttribute {
  /**
   * Passes table name to super class
   *
   * @constructs Alignment
   */
  constructor() {
    super('alignment');
  }
}
