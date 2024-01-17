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
	 console.log("dsfgsdfgsdgfsdgf");
})();