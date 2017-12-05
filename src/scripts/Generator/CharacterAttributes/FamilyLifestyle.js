class FamilyLifestyle extends CharacterAttribute {
  constructor() {
    super('family-lifestyle');
  }

  get mod() {
    return this.data.modifier;
  }
}
