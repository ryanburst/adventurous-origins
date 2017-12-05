class CharacterAttribute {
  constructor(config) {
    this.setConfig(config);

    this.generate();
  }

  set config(config) {
    this._config = config;
    Object.keys(config).forEach( (prop) => this[prop] = config[prop] );
  }

  get config() {
    return this._config;
  }

  set tableName(tableName) {
    this._tableName = CharacterAttribute.toKey(tableName)
    this.table = TABLES[this.tableName];
  }

  get tableName() {
    return this._tableName;
  }

  set data(data) {
    this._data = data;
    if( ! data.raw ) {
      data.raw = data.outcome;
    } else {
      data.outcome = this.translateOutcome(data.outcome);
    }

  }

  get data() {
    return this._data;
  }

  setConfig(config) {
    if( typeof config === 'string' ) {
      this.config = {
        tableName: config
      };
    } else {
      this.config = config;
    }
    return this;
  }

  generate() {
    if( this.table.roll === 'random' ) {
      return this.data = this.randomRow();
    }

    return this.data = this.rollForRow();
  }

  randomRow() {
    this.rollResult = Math.floor(Math.random() * this.table.outcomes.length);
    return this.table.outcomes[this.rollResult];
  }

  rollForRow() {
    let result = false;

    this.rollResult = this.roll(this.table.roll);
    this.table.outcomes.forEach( (outcome) => {
      if( this.rollResult.get('total') >= outcome.min && this.rollResult.get('total') <= outcome.max ) {
        return result = outcome;
      }
    });

    return result;
  }

  roll(dice) {
    if( typeof this.rollModifier !== 'undefined' ) {
      dice = dice.replace("MOD",this.rollModifier);
    }

    return Dice.roll(dice);
  }

  translateOutcome(outcome) {
    let matches = outcome.match(/({{(.*?)}})+/g);
    for(var x in matches) {
      var match = matches[x].replace(/[{{}}]/g,'');
      if( TABLES[match] ) {
        let table = new CharacterAttribute(match);
        outcome = outcome.replace(/{{(.*?)}}/,table.toString());
      } else {
        outcome = outcome.replace(/{{(.*?)}}/,Dice.roll(match).get('total'));
      }
    }
    return outcome;
  }

  toString() {
    return this.data.outcome;
  }

  static toKey(str) {
    return str.replace(/\s/g,'-').toLowerCase();
  }
}
