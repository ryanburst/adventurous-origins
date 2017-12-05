class Family extends CharacterAttribute {
  constructor(charisma) {
    super('family');
    this.generateParents();
    this.generateSiblings();
    this.generateHomeLife(charisma);
  }

  generateParents() {
    this.parents = new Parents();
    if( this.hasAbsentParent() ) {
      this.parentalFate = new Set();
      for(let i=0; i<this.data.absentCount; i++) {
        this.parentalFate.add(new AbsentParent());
      }
    }
    return this;
  }

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

  generateHomeLife(charisma) {
    this.lifestyle = new FamilyLifestyle();
    this.childhoodHome = new ChildhoodHome(this.lifestyle.mod);
    this.childhoodMemory = new ChildhoodMemory(charisma.toString());
    return this;
  }

  hasAbsentParent() {
    return this.data.absentCount > 0;
  }

  hasSiblings() {
    return this.numSiblings.toString() > 0;
  }
}
