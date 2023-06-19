const logout = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/login');
    }
};

$('#logout').click(logout);