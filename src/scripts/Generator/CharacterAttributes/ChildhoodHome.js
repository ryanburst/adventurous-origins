class ChildhoodHome extends CharacterAttribute {
  constructor(lifestyleMod) {
    super({tableName: 'childhood-home', rollModifier: lifestyleMod});
  }
}
