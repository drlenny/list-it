
var pingButton = document.getElementById('ping')
pingButton.addEventListener('click', function () {
    fetch('/ping')
        .then(response => response.json())
        .then(data => console.log(data));
})
