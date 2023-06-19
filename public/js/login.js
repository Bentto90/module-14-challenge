const loginHandler = async (event) => {
    event.preventDefault();

    const user_name = $('#user-name').val().trim();
    const password = $('#password').val().trim();

    if (user_name == "") {
        alert("Please enter a username");
        return;
    }

    if (password == "") {
        alert("Please enter a password");
        return;
    }

    if (user_name && password) {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ user_name, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if(response.status === 400 || response.status === 404) {
            alert(data.message);
            return;
        }
        document.location.replace('/');
    }
};

$('#login-btn').click(loginHandler);
