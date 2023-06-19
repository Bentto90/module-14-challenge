const addPost = async (event) => {
    event.preventDefault();
    const contents = $('#modal-content-textarea').val();
    const title = $('#modal-title-input').val().trim();
    if (contents && title) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ contents, title }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert(data.message)
            document.location.replace('/dashboard');
        } else {
            alert('Failed to add post');
        }
    }
  };

  $('#add-post').click(addPost);