const newFormHandler = async function (event) {
    event.preventDefault();

    const title = document.querySelector('#title-info').value.trim();
    const description = document.querySelector('#content-info').value.trim();

    console.log(title);
    console.log(description);

    await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

};

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);