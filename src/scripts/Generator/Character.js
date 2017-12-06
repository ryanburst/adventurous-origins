/**
 * Base character generation class. Generates all of the
 * attributes of a character needed by instantiating
 * character attribute classes.
 *
 * @class
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.1.0
 */
class Character {
  /**
   * Sets all character properties by instantiating other classes.
   * These classes will randomly pull from data tables.
   *
   * @return {class}
   */
  generate(options) {
    options = options || {};

    this.class      = new CharacterClass({fetch: options.class});
    this.race       = new Race({fetch: options.race});
    this.background = new Background({fetch: options.background});
    this.charisma   = new CharismaScore({fetch: options.charisma});
    this.age        = new CurrentAge();
    this.birthplace = new Birthplace();
    this.family     = new Family(this.charisma);
    this.events     = new Set();

    return this.adventure();
  }

  /**
   * Sends the character on an adventure to gain life events.
   *
   * @return {class}
   */
  adventure() {
    let numEvents = Dice.roll(this.age.getLifeEventDice()).get('total');

    // Generate a new life event
    for(let x=0; x<numEvents; x++) {
      this.events.add(new LifeEvent());
    }

    return this;
  }

  /**
   * Debug function that will output the results to the console.
   *
   * @return {class}
   */
  log() {
    console.log('Class:',this.class.toString());
    console.log('I became one because:',this.class.decision.toString());
    console.log('Race:',this.race.toString());
    console.log('Background:',this.background.toString());
    console.log('Charisma:',this.charisma.toString());
    console.log('Age:',this.age.toString());
    console.log('I am one because:',this.background.decision.toString());
    console.log('Birthplace: ',this.birthplace.toString());
    console.log('Family: ',this.family.toString());
    console.log('Parents: ',this.family.parents.toString());
    if( this.family.hasAbsentParent() ) {
      this.family.parentalFate.forEach( (fate) => console.log('Parental Fate:',fate.toString()) );
    }
    console.log('Number of Siblings: ',this.family.numSiblings.toString());
    if( this.family.hasSiblings() ) {
      this.family.siblings.forEach( (sibling) => {

        console.log('Sibling:','Occupation - ',sibling.occupation.toString(),'| Alignment - ',sibling.alignment.toString(),'| Status - ',sibling.status.toString(),'| Relationship - ',sibling.relationship.toString());
      });
    }
    console.log('Family Lifestyle: ',this.family.lifestyle.toString());
    console.log('Childhood Home: ',this.family.childhoodHome.toString());
    console.log('Childhood Memory: ',this.family.childhoodMemory.toString());
    this.events.forEach( (event) => console.log('Life Event: ',event.toString()) );

    return this;
  }
}
