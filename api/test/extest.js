
const header = new Headers();
header.append('Content-Type', 'application/json');
//
// const managerData = {
//     email: 'hujeno@gmail.com',
//     password: 'password',
// }

// header.append('auth', JSON.stringify(managerData));

fetch('http://localhost:8080/api/managers', {
    method: 'GET',
    headers: header,
})
    .then(response => {
        if (!response.ok) {
            // console.log(response);
            throw new Error('Network response was not ok');
        }
        // console.log(response.json());
        // console.log(response);
        return response.json(); // Parse response as JSON
    })
    .then(data => {
        console.log(data); // Output the response from the server
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });