const users = [];

function signUp(username, password) {
    if (users.find(user => user.username === username)) {
        return 'Username already exists';
    }
    users.push({ username, password });
    return 'User signed up successfully';
}

function signIn(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        return 'User signed in successfully';
    }
    return 'Invalid username or password';
}

module.exports = { signUp, signIn };