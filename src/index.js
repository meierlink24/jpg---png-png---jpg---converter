const uploadButton = document.getElementById('upload-btn');
const convertButton = document.getElementById('convert-btn');
const fileInput = document.getElementById('file-input');
const preview = document.getElementById('preview');

let uploadedImage = null; // Store the uploaded image

uploadButton.addEventListener("click", function () {
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select an image first.");
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (event) {
        uploadedImage = event.target.result; // Store image data
        preview.src = uploadedImage;
        preview.style.display = "block";
        convertButton.classList.remove("hidden"); // Show Convert button
    };
});

convertButton.addEventListener("click", function () {
    if (!uploadedImage) {
        alert("Please upload an image first.");
        return;
    }

    const img = new Image();
    img.src = uploadedImage;

    img.onload = function () {
        // Create a canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Detect current format and convert accordingly
        let newFormat = uploadedImage.includes("image/png") ? "image/jpeg" : "image/png";
        let convertedImage = canvas.toDataURL(newFormat, 1.0);

        // Store in local storage
        localStorage.setItem("convertedImage", convertedImage);

        // Update preview
        preview.src = convertedImage;
        alert(`Image converted to ${newFormat.split("/")[1]} and saved to local storage!`);
    };
});