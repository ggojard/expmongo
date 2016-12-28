// ****************  main.js

var date = new Date();
var dateISO = date.toISOString();


$(document).ready(function(){


      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
      });

      $("button.edit").click(function(){
        console.log("INFO : Edit quote: " + $(this).next().next().text() + " from: " + $(this).next().text() );
       
        $("input#name").val($(this).next().text());
        $("input#quote").val($(this).next().next().text());
        $("#parent_id").val($(this).attr("id"));
    });

    // set timestamp when the quote input field has been changed 
    $("input#quote").change(function() {
       $("#timestamp").val(dateISO);
    });
    $("input#quote").click(function() {
       $("#timestamp").val(dateISO);
    });

    $("button.hide").click(function(){        
        console.log("INFO: Hiding quote: " + $(this).next().next().next().text() + " from: " + $(this).next().next().text() + " " + $(this).attr("id"));
        fetch('quotes_status', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          '_id': $(this).attr("id"),
          'name': $(this).next().next().text(),
          'status': 'deleted'
          })
        })
        .then(res => {
          if (res.ok) return res.json();
        })
        .then(data => {
          window.location.reload(true)
          console.log( data);
        })
    });

    // Update last yoda's quote
    // $("#update").click(function() {
    //     fetch('quotes_replace', {
    //       method: 'put',
    //       headers: {'Content-Type': 'application/json'},
    //       body: JSON.stringify({
    //         'name': 'Darth Vader',
    //         'quote': 'I find your lack of faith disturbing.',
    //         'timestamp': dateISO,
    //         'status': 'active'
    //         })
    //       })
    //       .then(res => {
    //         if (res.ok) return res.json()
    //       })
    //       .then(data => {
    //         window.location.reload(true)
    //         console.log( data);
    //       })
    // });

});
