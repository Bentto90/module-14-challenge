const editPost = async (event) => {
    event.preventDefault();

    const urlString = window.location.toString().split('/');
    const post_id = urlString[urlString.length - 1];

    const contents = $('#modal-post-text').val().trim();
    const title = $('#modal-post-title').val().trim();

    const response = await fetch(`/api/post/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ contents, title }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
};
$('#update-post').click(editPost);