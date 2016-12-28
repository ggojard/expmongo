// ****************  main.js

var date = new Date();
var dateISO = date.toISOString();


$(document).ready(function(){

    Materialize.updateTextFields();

    $("i.edit").click(function(){
        console.log("INFO : Edit quote: " + $(this).next().next().text() + " from: " + $(this).next().text() );
       
        $("input#name").val($(this).next().text());
        $("input#quote").val($(this).next().next().text());
        $("input#timestamp").val($(this).next().next().next().text());
        $("#parent_id").val($(this).attr("id"));
    });

    // set timestamp when the quote input field has been changed 
    $("input#quote").change(function() {
       $("#timestamp").val(dateISO);
    });
    $("input#quote").click(function() {
       $("#timestamp").val(dateISO);
    });

    $("i.delete").click(function(){        
        console.log("INFO: Hiding quote: " + $(this).next().next().next().text() + " from: " + $(this).next().next().text() + " " + $(this).attr("id"));
        fetch('quotes_status', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'id': $(this).attr("id"),
          'name': $(this).next().next().text(),
          'status': 'archived'
          })
        })
        .then(res => {
          if (res.ok) return res.json();
        })
        .then(data => {
          // window.location.reload(true)
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
