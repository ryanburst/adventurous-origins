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
class CurrentAge extends CharacterAttribute {
  /**
   * Passes table name to super class
   *
   * @constructs CurrentAge
   */
  constructor() {
    super('current-age');
  }

  /**
   * Helper method to retrieve extra data from the
   * table. Grabs the number of life events that
   * correspond with this age group.
   *
   * @return {integer}
   */
  getLifeEventDice() {
    return this.data.lifeEvents;
  }
}
