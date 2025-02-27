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
	


  // on webpage loaded function
  window.onload = function() {



  	console.log("Loading");
  	// get menu id from the url string
  	let url = new URL(window.location.href);
  	let menuId = url.searchParams.get("id");

  	// console.log(url);
  	console.log(menuId);

  	if ( !menuId || !["1","2"].includes(menuId) ) return;


  	// fetch data from airtable
		fetch('https://api.airtable.com/v0/appnTVLyPM29dB1vj/speisenkarte', {
  	  headers: {
  	     'Authorization': 'Bearer  patFUFr7uNl41NiL0.4ebd70968a90fedc11bcfa0c67d96f29f6b56ee4f8ca991462122ef6138cf9fb'
  	  }
  	})
  	.then(response => response.json())
  	.then(data => {
  		console.log(data.records);
  		let menu = data.records.find(el => el.fields.id === menuId)?.fields;
  		let recordId = data.records.find(el => el.fields.id === menuId)?.id;

			$('[contenteditable=true]').attr('rid',recordId);

  		for ( field in menu ) {
  			if ( field === "id" ) continue;
  			$(`[field=${field}]`).html(menu[field].replaceAll("\n", "<br>")).attr('rid',recordId);
  			// console.log(field);
  		}

  		$(".loading").fadeOut()
  		// console.log(menu);
  	})
  	.catch(error => console.error(error));
  	


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
  };
})();
