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
class Family extends CharacterAttribute {
  /**
   * Passes table name to super class and generates
   * more family attributes. The charisma modifier
   * is used to generate a corresponding
   * childhood memory.
   *
   * @constructs Family
   * @param {integer} charisma Charisma modifier
   */
  constructor(charisma) {
    super('family');
    this.generateParents();
    this.generateSiblings();
    this.generateHomeLife(charisma);
  }

  /**
   * Generates parents (who raised them) and the
   * fate of any absent parents.
   *
   * @return {class}
   */
  generateParents() {
    this.parents = new Parents();

    // If one or more parents are "absent", determine
    // their fate (dead, alive, etc).
    if( this.hasAbsentParent() ) {
      this.parentalFate = new Set();
      for(let i=0; i<this.data.absentCount; i++) {
        this.parentalFate.add(new AbsentParent());
      }
    }

    return this;
  }

  /**
   * Generates siblings. Siblings have basic information,
   * like occupation, status and relationship.
   *
   * @return {class}
   */
  generateSiblings() {
    this.numSiblings = new NumberOfSiblings();

    if( this.hasSiblings() ) {
      this.siblings = new Set();
      for( let i=0; i<this.numSiblings.toString(); i++) {
        this.siblings.add(new Sibling);
      }
    }

    return this;
  }

  /**
   * Generates a few more home life, family related
   * character attributes.
   *
   * @param  {integer} charisma Charisma mod
   * @return {class}
   */
  generateHomeLife(charisma) {
    this.lifestyle = new FamilyLifestyle();
    this.childhoodHome = new ChildhoodHome(this.lifestyle.mod);
    this.childhoodMemory = new ChildhoodMemory(charisma.toString());

    return this;
  }

  /**
   * Checks to see if there are any absent parents.
   *
   * @return {Boolean}
   */
  hasAbsentParent() {
    return this.data.absentCount > 0;
  }

  /**
   * Checks to see if this character has any siblings.
   *
   * @return {Boolean}
   */
  hasSiblings() {
    return this.numSiblings.toString() > 0;
  }
}
