
const header = new Headers();
header.append('Content-Type', 'application/json');

const Data = {
    name: 'Farming Simulator 2025',
    type_id: '65f60f8a89f811c81cef5239',
    description: 'Farm like never before!'
}

// header.append('auth', JSON.stringify(managerData));

fetch('http://localhost:8080/api/project/65f3b74b77df5262b3453221', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Data),
})
    .then(response => {
        // if (!response.ok) {
        //     console.log(response);
        //     throw new Error('Network response was not ok');
        // }
        // console.log(response.json());
        console.log(response);
        return response.json(); // Parse response as JSON
    })
    .then(data => {
        console.log(data); // Output the response from the server
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });