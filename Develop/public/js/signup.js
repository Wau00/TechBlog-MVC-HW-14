const signupFormHandler = async function (event) {
    event.preventDefault();

    const username = document.querySelector('#InputUser').value.trim();
    const password = document.querySelector('#InputPassword').value.trim();
    console.log(username);
    console.log(password);
    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to sign up');
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
