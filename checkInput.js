// Create a function to check the values of the inputs
function checkInputs() {
    var fileInput = document.getElementById('uploaded-file');
    var carrierSelect = document.getElementById('carrierName');
    var effectiveDateInput = document.getElementById('effectiveDate');
    var uploadButton = document.querySelector('.btn-primary');

    // Check if all inputs have values
    if (fileInput.files.length > 0 && carrierSelect.value && effectiveDateInput.value) {
        uploadButton.disabled = false;
    } else {
        uploadButton.disabled = true;
    }
}

// Add event listeners to call checkInputs whenever any of the inputs change
document.getElementById('uploaded-file').addEventListener('change', checkInputs);
document.getElementById('carrierName').addEventListener('change', checkInputs);
document.getElementById('effectiveDate').addEventListener('change', checkInputs);

// Call checkInputs on page load to set the initial button state
window.addEventListener('load', checkInputs);
