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
        quote_name.value = $(this).next().text();
        // $("input#name").attr("value") = $(this).next().text();
        quote_text.value = $(this).next().next().text();
        $("#id").val($(this).attr("id"));
        // $("input#quote").attr("value") = $(this).next().next().text();
    });

    $("i.hide").click(function(){        
        console.log("INFO: Hiding quote: " + $(this).next().next().next().text() + " from: " + $(this).next().next().text());
        // $(this).parent().hide();

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
          if (res.ok) return res.json()
        })
        .then(data => {
          window.location.reload(true)
          console.log( JSON.stringify(data));
        })


    });
});

// Update last yoda's quote
update.addEventListener('click', function () {
  // Send PUT Request here
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
})

// set timestamp when the quote input field has been changed 
quote_text.addEventListener('change', function () {
	// console.log(dateISO);
	quote_timestamp.value = dateISO;
})
