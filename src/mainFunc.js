$(document).ready(function() {
  const ID = '#svg-pentagon',
        NUM_LEVELS = 8,
        DEFAULT_TITLE = 'Click me to edit',
        DEFAULT_HASH = '0,0&0,0&0,0&0,0&0,0&' + DEFAULT_TITLE;

  //Sets the initial hash
  if(window.location.hash == ""){
    window.location.hash = DEFAULT_HASH;
  }

  let currHash = getHash(),
      currTitle = currHash.pop();

  let points = generatePentagon(425, 500, ID, NUM_LEVELS, 1.05, 0.85, currHash);

  // Sets width and height of frame point on points
  $("#J-svg-pentagon").attr({
    width: points[1][0], //points[1][0] is the right-most point
    height: points[2][1] //points[2][1] || points[3][1] is the bottom-most point
  });

  // Adds the level labels
  for(let i=0;i<4;i++){
      let el = makeSVG('text', {
        x:223.125,
        y:(53.125*i),
        class: 'level'
      })
      el.textContent = 4-i;
      $("#J-svg-pentagon").append(el);
  }

  /* POPUP FUNC. */
  // Sets the popup window with 'coaching questions' when clicked
  function onClick(e) {
    let $popup = document.getElementById('popup-' + e.target.classList[1]);
    $popup.classList.toggle('hide');
  }

  // Adds the functionality for closing the popup window
  $(".close-button").click(function(e) {
    document.getElementById(e.target.parentNode.id).classList.toggle('hide');
  });

  // Awareness
  $(".awareness").click(onClick);

  // Connecting
  $(".connecting").click(onClick);

  // Creative
  $(".creative").click(onClick);

  // Action
  $(".action").click(onClick);

  // Disciplined
  $(".disciplined").click(onClick);

  /* TITLE EDITING FUNC. */
  // Adds editing functionality to the title
  if($('#title-text').text() !== currTitle ){
    $('#title-text').text(currTitle);
  }

  $('#title-text').on('blur', function() {
    let text = $(this)[0].innerText;
    setTitle(text);
  });
  // Prevents new line from being usable when editing
  $('#title-text').keypress(function(e){return e.key != 'Enter'; });

})
