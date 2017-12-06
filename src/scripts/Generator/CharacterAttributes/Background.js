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
class Background extends CharacterAttribute {
  /**
   * Passes table name to super class. Also
   * creates a sub background property.
   *
   * @constructs Background
   */
  constructor(options) {
    super({tableName: 'background', fetch: options.fetch});
    this.decision = new BackgroundDecision(this);
  }
}
