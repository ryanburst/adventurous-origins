class BirthOrder extends CharacterAttribute {
  constructor() {
    super('birth-order');
  }
  toString() {
    if( this.data.min === 2 ) {
      let numSiblings = this.family.numSiblings.toString();
      if( numSiblings >= 3 ) {
        let options = ['Twin','Triplet','Quadruplet'];
        return options[Math.floor(Math.random() * options.length)];
      } else if ( numSiblings >= 2 ) {
        let options = ['Twin','Triplet'];
      } else {
        let options = ['Twin'];
      }
      return options[Math.floor(Math.random() * options.length)];
    }
    return super.toString();
  }
}
