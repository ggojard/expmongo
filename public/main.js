// main.js
var update = document.getElementById('update');

update.addEventListener('click', function () {
  // Send PUT Request here
  fetch('quotes', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': 'Darth Vader',
    'quote': 'I find your lack of faith disturbing.'
  	})
  })
  .then(res => {
  	if (res.ok) return res.json()
  })
  .then(data => {
  	console.log(data)
  	window.location.reload(true)
  })
})


var quote_text = document.getElementById('quote');
var quote_timestamp = document.getElementById('timestamp');

var date = new Date();
// var day = date.getDate();
// var monthIndex = date.getMonth();
// var year = date.getFullYear();
quote_text.addEventListener('click', function () {
	console.log(date.toISOString());

	quote_timestamp.value = date.toISOString();
})
