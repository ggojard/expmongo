// main.js
var update = document.getElementById('update');
var quote_name = document.getElementById('name');
var quote_text = document.getElementById('quote');
var quote_timestamp = document.getElementById('timestamp');
var date = new Date();
var dateISO = date.toISOString();
// var day = date.getDate();
// var monthIndex = date.getMonth();
// var year = date.getFullYear();

$(document).ready(function(){
    $("i.edit").click(function(){
        console.log("INFO : Edit quote: " + $(this).next().next().text() + " from: " + $(this).next().text() );
        // quote_name.value = $(this).next().text();
        $("input#name").val($(this).next().text());
        $("input#quote").val($(this).next().next().text());
        $("#parent_id").val($(this).attr("id"));
    });

    $("i.hide").click(function(){        
        console.log("INFO: Hiding quote: " + $(this).next().next().next().text() + " from: " + $(this).next().next().text() + " " + $(this).attr("id"));

        // Send PUT Request here
        fetch('quotes_status', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          '_id': $(this).attr("id"),
          'status': 'deleted'
          })
        })
        .then(res => {
          if (res.ok) return res.json();
          console.log( JSON.stringify(data));
        })
        .then(data => {
          window.location.reload(true)
          console.log( JSON.stringify(data));
        })
    });


    // set timestamp when the quote input field has been changed 
    $("input#quote").change(function() {
       $("#timestamp").val(dateISO);
    });
    $("input#quote").click(function() {
       $("#timestamp").val(dateISO);
    });

    // Update last yoda's quote
    $("#update").click(function() {
        fetch('quotes_replace', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': 'Darth Vader',
            'quote': 'I find your lack of faith disturbing.',
            'timestamp': dateISO,
            'status': 'active'
            })
          })
          .then(res => {
            if (res.ok) return res.json()
          })
          .then(data => {
            // console.log(data)
            window.location.reload(true)
            console.log( JSON.stringify(data));
          })
    });

});
