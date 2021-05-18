
// var pingButton = document.getElementById('ping')
// pingButton.addEventListener('click', function () {
//     fetch('/ping')
//         .then(response => response.json())
//         .then(data => console.log(data));
// })

// function listRefresh(){
//     $.post('/list').then(function(data){
//         window.location = data.redirectUrl
//     })
// }

// function addTest(){
//     document.getElementById('testing').innerHTML = 
//     'Clicked!'
// }

// function listRefresh(){
//     $.post('/').then(function(data){
//         window.location = data.redirectUrl
//     })
// }

// $('#testing').submit(function(event){
//     event.preventDefault();
// })

// $('#testing').submit(async function(event, data){

//     fetch('http://localhost:3005/tests', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: newTest
//     })
//         .then(response => response.json())
//         .then(console.log('sucess', data))
//         .catch((error) => {
//             console.log('error', error);
//         });
//         event.preventDefault();
// })