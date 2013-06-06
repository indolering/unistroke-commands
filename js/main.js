$(function() {

  var input = $('#gesture-input');
  $('#gesture-input').gesture(onGesture);
  var tts = new oggTTS();


  function onGesture(result) {
    console.log(result.Name, result.Score);

    tts.play(result.Name);
    var sourceCanvas = document.getElementById("gesture-input");
    var destinationCanvas = document.getElementById("gesture-output");
    var destinationCanvasCtx = destinationCanvas.getContext('2d');

    /*
     *1 Clear <canvas id="gesture-output">
     */
    destinationCanvasCtx.clearRect( 0 , 0 , 100 , 100 );

    /*
     * 2 Copy end figure from <canvas id="gesture-input"> to <canvas id="gesture-output">
     */

    destinationCanvasCtx.drawImage(sourceCanvas, 0, 0, 100, 100);
    /*
     * 3 Clear <canvas id=gesture-input">
     */
    sourceCanvas.getContext('2d').clearRect( 0 , 0 , 400 , 400 );


    /*
     * 4 Display template match in <img id="matching-template">
     */

    var filename = String(result.Name).replace(/ /g,"-");

    $("#matching-template").attr("src", "images/templates/" + filename + ".png");

      /*
       * 5 Display score in <div id="match">
       */
    $('#match').html("<p> Detected: " + result.Name + " <br /> Confidence: " + Math.round(result.Score*100) + "% </p>");
  }
});