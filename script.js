function func() {
	console.log("dsdfgd");
	// document.getElementById("frame").style.transform = "rotate(90deg)";
	var opt = {
		margin: 0,
	  filename: 'Speisekarte.pdf',
	  // html2canvas:  { scale: 2 },
	  jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
	};
	var element = document.getElementById('frame');
	html2pdf().set(opt).from(element).save();
}

//self executing function here
(function() {
	// your page initialization code here
	// the DOM will be available here
	console.log("пsdfsdf45");

	fetch('https://api.airtable.com/v0/appnTVLyPM29dB1vj/speisenkarte', {
    headers: {
       'Authorization': 'Bearer patFUFr7uNl41NiL0.93a8c0fca63abf0e43781b5347276ca4d9d7ab060030e64f7349176bdd619809'
    }
  })
  .then(response => response.json())
  .then(data => {
  	// console.log(data.records);
  	let menu = data.records.find(el => el.fields.id === "1")?.fields;
  	let recordId = data.records.find(el => el.fields.id === "1")?.id;

  	for ( field in menu ) {
  		if ( field === "id" ) continue;
  		$(`[field=${field}]`).html(menu[field].replaceAll("\n", "<br>")).attr('rid',recordId);
  		// console.log(field);
  	}
  	// console.log(menu);
  })
  .catch(error => console.error(error));


  // on webpage loaded function
  window.onload = function() {
  	// on contenteditable element change
  	$("[contenteditable=true]").on("input", function() {
  		// console.log($(this).attr("field"));
			// console.log($(this).html());
			let field = $(this).attr("field");
			let id = $(this).attr("rid");
			let value = $(this).html().replaceAll("<br>", "\n");
			let body = {
			  'fields': {}
			};
			body.fields[field] = value;
			console.log(field, value);
			fetch(`https://api.airtable.com/v0/appnTVLyPM29dB1vj/speisenkarte/${id}`, {
			  method: 'PATCH',
			  headers: {
			    'Authorization': 'Bearer patFUFr7uNl41NiL0.93a8c0fca63abf0e43781b5347276ca4d9d7ab060030e64f7349176bdd619809',
			    'Content-Type': 'application/json'
			  },
			  body: JSON.stringify(body)
			})
			.then(response => response.json())
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.error(error);
			})
  	});
  }


   return;
	 fetch('https://script.google.com/macros/s/AKfycbzr0KfRrQWjieSuEIHbNTx7KRTJZP9bjYgAzOwKLC2D9ga84R32H4AqmzFS4XgLaNM9/exec', {
		  method: 'POST',
		  body: JSON.stringify({name: "John", email: "john@example.com", message: "Hello!"}),
		  headers: {
		    // 'Content-Type': 'application/json'
		    "Content-Type": "text/plain"
		  }
		})
		.then(response => {
			console.log("ok");
			// console.log(response);
			return response.json();
		})
		.then(data => {
			console.log("result");
			console.log(data)
		})
		.catch(error => console.error('Error!', error.message));
})();