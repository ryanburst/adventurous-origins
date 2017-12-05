class CurrentAge extends CharacterAttribute {
  constructor() {
    super('current-age');
  }

  getLifeEventDice() {
    return this.data.lifeEvents;
  }
}
