// const newFormHandle = async function (event) {
//     event.preventDefault();

//     const title = document.querySelector('#title-info').value.trim();
//     const description = document.querySelector('#content-info').value.trim();

//     console.log(title);
//     console.log(description);

//     await fetch("/api/post", {
//         method: 'POST',
//         body: JSON.stringify({
//             title,
//             description,
//         }),
//         headers: { 'Content-Type': 'application/json' },
//     });
// };

const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-info').value.trim();
    const description = document.querySelector('#content-info').value.trim();

    console.log(title);
    console.log(description);

    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            content: description,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        console.log('Successfully submitted burger');
        document.location.replace('/');
    } else {
        alert('Failed to submit post');
    }
};

document
    .querySelector('#newFormBtn')
    .addEventListener('click', newFormHandler);