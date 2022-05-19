const loginFormHandler = async function (event) {
    event.preventDefault();

    const username = document.querySelector('#LoginUser').value.trim();
    const password = document.querySelector('#LoginPassword').value.trim();
    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
