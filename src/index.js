const Button = document.getElementById('upload-btn')
const fileInput = document.getElementById('file-input')
const preview = document.getElementById('preview')

Button.addEventListener("click",function(){
/*upload documents to a local storage*/
	const file = fileInput.file[0];
	if(!file){
         alert("Please select an IMAGE first");
		return;
	}
	
	const reader = new FileReader();
	reader.readAsDataUrl(file);

	reader.onload = function (event) {
                  const img = new Image();
		  img.src = event.target.result;

		img.onload = function () {
                //this function creates canvas
			const canvas = document.getElementById('canvas');
			const ctx = canvas.getContext();

			canvas.width = img.width;
			canvas.height = img.height;
                
                // Draw image onto canvas
                ctx.drawImage(img, 0, 0, img.width, img.height);

                // Convert to desired format (change 'image/webp' to 'image/png' or 'image/jpeg')
                const convertedImg = canvas.toDataURL("image/webp", 1.0);

                // Store in local storage
                localStorage.setItem("convertedImage", convertedImg);

                // Display the converted image
                preview.src = convertedImg;
                preview.style.display = "block";

                alert("Image converted and saved to local storage!");
		};
	};
});
