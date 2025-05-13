async function getUsers() {
    const response = await fetch('http://127.0.0.1:3000/users'); // Modificato da "localhost"
    const data = await response.json();
    console.log(data);
}

async function registerUser() {
    const response = await fetch('http://127.0.0.1:3000/auth/register', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "Mattia", email: "mattia@email.com", password: "123456" })
    });

    const data = await response.json();
    console.log(data);
}

getUsers();
