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
class BackgroundDecision extends CharacterAttribute {
  /**
   * Passes table name to super class. Uses the passed in
   * background class to determine the final class name.
   *
   * @constructs BackgroundDecision
   * @param {class} background Background
   */
  constructor(background) {
    super('background-decision-' + background.toString());
  }
}
