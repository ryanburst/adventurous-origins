class Background extends CharacterAttribute {
  constructor() {
    super('background');
    this.decision = new BackgroundDecision(this);
  }
}
