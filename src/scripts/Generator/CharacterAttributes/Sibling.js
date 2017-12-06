/**
 * Sibling for a character
 *
 * @class
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */
class Sibling {
  /**
   * Generates some random information about a sibling.
   *
   * @constructs Sibling
   */
  constructor() {
    this.occupation = new Occupation('occupation');
    this.alignment = new Alignment('alignment');
    this.status = new Status('status');
    this.relationship = new Relationship('relationship');
  }
}
