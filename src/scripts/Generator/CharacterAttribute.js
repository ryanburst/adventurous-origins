/**
 * Represents a character attribute. This class will
 * automatically pull a random value from a
 * corresponding data table.
 *
 * @class
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */
class CharacterAttribute {
  /**
   * Takes in a configuration object and then
   * generates the random associated value.
   *
   * @constructs CharacterAttribute
   * @param config
   */
  constructor(config) {
    this.setConfig(config);

    this.generate();
  }

  /**
   * Setter for the config property. Goes through
   * the config object and sets a property for
   * each key and value pair.
   *
   * @param  {object} config Configuration object
   */
  set config(config) {
    this._config = config;
    Object.keys(config).forEach( (prop) => this[prop] = config[prop] );
  }

  /**
   * Getter for internal config property.
   *
   * @return {object}
   */
  get config() {
    return this._config;
  }

  /**
   * Sets the internal property for table name, making
   * sure to convert it to a key format. Also sets the
   * proper table from the data set.
   *
   * @param  {string} tableName Name of table
   */
  set tableName(tableName) {
    this._tableName = CharacterAttribute.toKey(tableName)
    this.table = TABLES[this.tableName];
  }

  /**
   * Getter for internal table name property.
   *
   * @return {string}
   */
  get tableName() {
    return this._tableName;
  }

  /**
   * Sets the table data to the data property. If an
   * outcome needs to be "translated", runs the
   * translation method on the string.
   *
   * @param  {object} data Table data
   */
  set data(data) {
    this._data = data;
    if( ! data.raw ) {
      data.raw = data.outcome;
    } else {
      data.outcome = this.translateOutcome(data.outcome);
    }
  }

  /**
   * Getter for internal data property.
   *
   * @return {object}
   */
  get data() {
    return this._data;
  }

  /**
   * Sets the configuration object for this class.
   * If the passed in value is a string, assume
   * table name and set up an object. Otherwise
   * just set the object as normal.
   *
   * @param  {mixed} config Table name string or object
   * @return {class}
   */
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

  /**
   * Pulls in data from the corresponding table.
   * Depending on the table, it can either be
   * random or rolled for.
   *
   * @return {class}
   */
  generate() {
    if( this.table.roll === 'random' ) {
      this.data = this.randomRow();
    } else {
      this.data = this.rollForRow();
    }

    return this;
  }

  /**
   * Grabs a random result from the table.
   *
   * @return {object}
   */
  randomRow() {
    this.rollResult = Math.floor(Math.random() * this.table.outcomes.length);
    return this.table.outcomes[this.rollResult];
  }

  /**
   * Makes a roll for determining which value to return
   * from the data table. The number must be between
   * the min and max value in the data table.
   * @return {object}
   */
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

  /**
   * Rolls the dice associated with this data table.
   *
   * @param  {string} dice Dice to roll for result
   * @return {object}
   */
  roll(dice) {
    // If a roll modifier has been set, replace the "MOD"
    // key word with the value of the modifier before
    // we roll for a result. (1d4+MOD => 1d4+5)
    if( typeof this.rollModifier !== 'undefined' ) {
      dice = dice.replace("MOD",this.rollModifier);
    }

    return Dice.roll(dice);
  }

  /**
   * Translates an outcome string. This occurs when
   * an outcome string asks the player to roll
   * additional information in another table.
   *
   * @param  {string} outcome Outcome to translate
   * @return {string}
   */
  translateOutcome(outcome) {
    // Match any {{keyword}} string
    let matches = outcome.match(/({{(.*?)}})+/g);

    for(let x in matches) {
      // Remove the brackets so we have just the keyword
      let match = matches[x].replace(/[{{}}]/g,'');

      // If the keyword is a table, we need to grab a
      // random value from it just as we're doing
      // with this character attribute.
      let replacement = null;
      if( TABLES[match] ) {
        let table   = new CharacterAttribute(match);
        replacement = table.toString();
      // Otherwise try a dice roll
      } else {
        replacement = Dice.roll(match).get('total');
      }

      outcome = outcome.replace(/{{(.*?)}}/,replacement);
    }

    return outcome;
  }

  /**
   * Return the outcome value from the table data.
   *
   * @return {string}
   */
  toString() {
    return this.data.outcome;
  }

  /**
   * Converts a string to key format by replacing all
   * spaces with dashes and lowercasing everything.
   *
   * @param  {string} str String to convert to key format
   * @return {string}
   */
  static toKey(str) {
    return str.replace(/\s/g,'-').toLowerCase();
  }
}
