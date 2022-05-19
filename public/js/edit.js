const delButtonHandler = async (event) => {

    if (event.target.id) {
        const id = event.target.id;
        console.log('---------------------------------------', id);
        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete post');
        }
    }
};

document
    .querySelector('.deleteBtn')
    .addEventListener('click', delButtonHandler);
