const deletePost = async (event) => {
    event.preventDefault();

    const urlString = window.location.toString().split('/');
    const post_id = urlString[urlString.length - 1];

    const response = await fetch(`/api/post/${post_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
};
$('#delete-post').click(deletePost);