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
class ClassDecision extends CharacterAttribute {
  /**
   * Passes table name to super class. Uses the passed in
   * background class to determine the final class name.
   *
   * @constructs ClassDecision
   * @param {class} characterClass Character class
   */
  constructor(characterClass) {
    super('class-decision-' + characterClass.toString());
  }
}
