
export const isUserValidated = async () => {
    const validateToken = await fetch('/api/validate-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })

    const data = validateToken;
    if (data.status === 403 || data.status === 401 || data.status === 500) {
        localStorage.removeItem('user');
        localStorage.removeItem('account');
        return false;
    }

    
    return true;
}