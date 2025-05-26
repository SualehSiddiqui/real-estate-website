import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/');
        } else if (!authentication && authStatus !== authentication) {
            navigate('/sale-order')
        }
        setLoading(false);
    }, [authentication, authStatus, navigate])

    return loading ? <>Loading...</> : <>{children}</>
}

export default AuthLayout;