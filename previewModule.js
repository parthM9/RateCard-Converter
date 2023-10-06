// previewModule.js
console.log('previewModule.js loaded');

export function previewFile(fileInputId, previewContainerId, isExcel) {
    console.log('previewFile function called');
    var fileInput = document.getElementById(fileInputId);
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        console.log('File read successfully');
        var data = e.target.result;
        var previewContainer = document.getElementById(previewContainerId);
        if (isExcel) {
            console.log('Processing Excel file');
            var workbook = XLSX.read(data, { type: 'binary' });
            console.log('Workbook read successfully');
            var tabsContainer = document.createElement('div');
            tabsContainer.className = 'tabs-container';
            var sheetsContainer = document.createElement('div');
            sheetsContainer.className = 'sheets-container';

            console.log('Sheet names: ', workbook.SheetNames);
            workbook.SheetNames.forEach(function (sheetName, index) {
                console.log('Processing sheet: ', sheetName);
                var tabButton = document.createElement('button');
                tabButton.innerText = sheetName;
                tabButton.className = 'tab-button';
                tabButton.onclick = function (event) {
                    event.preventDefault();  // Prevent the default click behavior
                    Array.from(sheetsContainer.children).forEach((sheetDiv, sheetIndex) => {
                        sheetDiv.style.display = sheetIndex === index ? 'block' : 'none';
                    });
                };

                tabsContainer.appendChild(tabButton);

                var sheet = workbook.Sheets[sheetName];
                var html = XLSX.utils.sheet_to_html(sheet);
                var sheetDiv = document.createElement('div');
                sheetDiv.className = 'sheet';
                sheetDiv.innerHTML = html;
                sheetDiv.style.display = index === 0 ? 'block' : 'none';  // Only display the first sheet initially
                sheetsContainer.appendChild(sheetDiv);
            });

            var parentContainer = document.createElement('div');
            parentContainer.className = 'parent-container';

            parentContainer.appendChild(tabsContainer);
            parentContainer.appendChild(sheetsContainer);

            previewContainer.innerHTML = '';
            previewContainer.appendChild(parentContainer);

        } else {
            console.log('Processing PDF file');
            var object = document.createElement('object');
            object.data = data;
            object.type = 'application/pdf';
            object.width = '100%';
            object.height = '500px';
            previewContainer.innerHTML = '';
            previewContainer.appendChild(object);
        }
    };
    reader.onerror = function (error) {
        console.error("File reading error: ", error);
    };
    console.log('Initiating file read');
    reader.readAsBinaryString(file);
}
