class ChildhoodMemory extends CharacterAttribute {
  constructor(charismaMod) {
    super({tableName: 'childhood-memory', rollModifier: charismaMod});
  }
}
