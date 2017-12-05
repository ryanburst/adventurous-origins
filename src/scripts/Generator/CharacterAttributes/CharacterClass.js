class CharacterClass extends CharacterAttribute {
  constructor() {
    super('class');
    this.decision = new ClassDecision(this);
  }
}
