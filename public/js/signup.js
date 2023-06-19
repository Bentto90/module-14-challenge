const signUpHandler = async (event) => {
    event.preventDefault();

    const user_name = $('#signup-username').val().trim();
    const password = $('#signup-password').val().trim();

    if (user_name == "") {
        alert("Please enter a username");
        return;
    }

    if (password == "") {
        alert("Please enter a password");
        return;
    }
    
    if (user_name && password) {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ user_name, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if(response.status === 400 || response.status === 404) {
            return alert(data.message);
        }
        if(response.ok){
            document.location.replace('/');
        } else {
            alert('Failed to sign up');
        }
    }
};

$('#signup-btn').click(signUpHandler)