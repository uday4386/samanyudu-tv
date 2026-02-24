async function testLogin() {
    try {
        const res = await fetch('http://localhost:5000/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin1@samanyudu.tv', password: 'adminpassword1' })
        });
        const data = await res.json();
        console.log('Login Response:', data);
    } catch (e) {
        console.error('Login Error:', e);
    }
}
testLogin();
