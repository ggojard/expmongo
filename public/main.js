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


var quote_text = document.getElementById('text');
var quote_timestamp = document.getElementById('timestamp');
var now = Date();

update.addEventListener('change', function () {
	quote_timestamp.value = now;
})
