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
class BirthOrder extends CharacterAttribute {
  /**
   * Passes table name to super class
   *
   * @constructs BirthOrder
   * @param {class} family Family class
   */
  constructor(family) {
    super('birth-order');
    this.family = family;
  }

  /**
   * Overrides the parent toString method under
   * certain circumstances to determine the
   * correct string.
   *
   * @return {string}
   */
  toString() {
    // If this is the row that says "Twin, triplet, or Quadruplet",
    // use the family class to find out how many siblings this
    // character has to determine which of that string is
    // actually possible (1 sibling cannot be triplet).
    if( this.data.min === 2 ) {
      let numSiblings = this.family.numSiblings.toString();
      let options = ['Twin'];
      // 3 or more siblings can be any one of the options
      if( numSiblings >= 3 ) {
        options = ['Twin','Triplet','Quadruplet'];
      // 2 siblings can be either twin or triplet
      } else if ( numSiblings >= 2 ) {
        options = ['Twin','Triplet'];
      }
      return options[Math.floor(Math.random() * options.length)];
    }

    return super.toString();
  }
}
