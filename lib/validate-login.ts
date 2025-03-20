
export const isUserValidated = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        return false;
    }
    const validateToken = await fetch('/api/validate-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
    })

    const data = validateToken;

    if (data.status === 403 || data.status === 401 || data.status === 500) {
        localStorage.removeItem('accessToken');
        return false;
    }

    return true;
}