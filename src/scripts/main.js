$(document).ready(function() {
  let character = new Character();

  hydrateSelect('#select-class',CharacterClass.options('class'));
  hydrateSelect('#select-race',CharacterClass.options('race'));
  hydrateSelect('#select-background',CharacterClass.options('background'));
  hydrateSelect('#select-charisma',CharacterClass.options('charisma'));

  $('.button--generate').on('click',generate);
  $('.controls__menu').on('click',toggleMenu);

  generate();

  function generate() {
    $('body').removeClass('menu-open');
    character.generate({
      class: $('#select-class').val(),
      race: $('#select-race').val(),
      background: $('#select-background').val(),
      charisma: $('#select-charisma').val(),
    }).log();

    render();

    ga('send', 'event', 'Character', 'generate', 'Launch');
  }

  function toggleMenu() {
    $('body').toggleClass('menu-open');
  }

  function render() {
    $('#class').html(character.class.toString());
    $('.c-class').html(character.class.toString().toLowerCase());
    $('#race').html(character.race.toString());
    $('#background').html(character.background.toString());
    $('.c-background').html(character.background.toString().toLowerCase());
    $('#charisma').html(character.charisma.toString());
    $('#age').html(character.age.toString());
    $('#class-decision').html(character.class.decision.toString());
    $('#background-decision').html(character.background.decision.toString());
    $('#birthplace').html(character.birthplace.toString());
    $('#family').html(character.family.toString());
    $('#family-lifestyle').html(character.family.lifestyle.toString());
    $('#childhood-home').html(character.family.childhoodHome.toString());
    $('#childhood-memory').html(character.family.childhoodMemory.toString());
    $('#life-events,#parents,#siblings').empty();
    $('#parents').append('<p>' + character.family.parents.toString() + '</p>')
    if( character.family.hasAbsentParent() ) {
      character.family.parentalFate.forEach( (fate) => $('#parents').append('<p><em>Absent Parent Fate:</em> ' + fate.toString() + '</p>') );
    }
    $('#siblings').append('<p>Number of Siblings: ' + character.family.numSiblings.toString() + '</p>');
    if( character.family.hasSiblings() ) {
      let $list = $('<ol></ol>');
      character.family.siblings.forEach( (sibling) => {
        let $listItem = $('<li></li>');
        $listItem.append('<p><em>Sibling</em></p>');
        $listItem.append('<p>Occupation: ' + sibling.occupation.toString() + '</p>');
        $listItem.append('<p>Alignment: ' + sibling.alignment.toString() + '</p>');
        $listItem.append('<p>Status: ' + sibling.status.toString() + '</p>');
        $listItem.append('<p>Relationship: ' + sibling.relationship.toString() + '</p>');
        $list.append($listItem);
      });
      $('#siblings').append($list);
    }
    character.events.forEach( (event) => $('#life-events').append('<p>' + event.toString() + '</p>') );
  }

  function hydrateSelect(selector,optionSet) {
    let $select = $(selector);

    $select.empty().append('<option value="random">Random</option');

    optionSet.forEach( (option) => $select.append('<option>' + option + '</option') );
  }
});
