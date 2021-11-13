let imgSrc = null

const $ = _ => document.querySelector(_)

const $c = _ => document.createElement(_)

const open = e => {
	if(e.target.files.length){
		const url = window.URL || window.webkitURL
		imgSrc = url.createObjectURL(e.target.files[0])
		OCR()
	}
}

// const draw = img => {
// 	$('#preview').style.backgroundImage = `url(${imgSrc})`
// 	$('#preview').style.backgroundRepeat = 'no-repeat'
// 	$('#preview').style.backgroundSize = 'contain'
// 	OCR()
// }

const OCR = () => {
	const progress = $c('progress') 
	progress.value = 0
	progress.style.display = 'block'
	progress.style.margin = '25% auto'
	$('#recognizedText').innerHTML = ""
	$('#recognizedText').appendChild( progress )
	
	Tesseract.recognize(
		imgSrc,
	'eng',
		{
			logger: m => { progress.value = m.progress }
		})
	.then(({ data: { words } }) => {
		
		$('#recognizedText').style.padding = '1em'
		
		// console.log(words)
		var gender = "Undefined";
        for (var i in words) {
          // console.log(words[i].text)
          if(words[i].text==="Male")
            {gender = "Male";
            break;}
          if(words[i].text==="Female")
            {gender = "Female";
            break;}
      }
	  if(gender == "Undefined")
	  {
		  alert("Please add another ID.");
		  location.reload();
	  }
      console.log(gender)
      $('#recognizedText').innerText = gender;
      $('#recognizedText').remove();
      var x = document.getElementById('signupGender').setAttribute("value", gender);
      document.getElementById('signupGender').setAttribute("readonly", true);
    //  x.setAttribute = gender;
    //  x.setAttribute("readonly", true);
      // var x = document.getElementById('signupGender');
      // x.setAttribute("readonly", true);
      
	})
	.catch( e => { $('#recognizedText').innerText = e } )
}

$('#import').addEventListener('change', open )
// $('#lang').addEventListener('change', _ => {	if(imgSrc) OCR() })
