const loginFormHandler = async function (event) {
    event.preventDefault();

    const usernameEl = document.querySelector('#LoginUser').value.trim();
    const passwordEl = document.querySelector('#LoginPassword').value.trim();
    if (usernameEl && passwordEl) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ usernameEl, passwordEl }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to login');
        }
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
