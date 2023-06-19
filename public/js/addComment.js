const addComment = async (event) => {
    event.preventDefault();

    const urlString = window.location.toString().split('/');
    const postId = urlString[urlString.length - 1];

    const contents = $('#comment').val().trim();

    if (contents) {
        const response = await fetch(`/api/comment/${postId}`, {
            method: 'POST',
            body: JSON.stringify({ contents }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        }
    }
};

$('#add-comment').click(addComment);
