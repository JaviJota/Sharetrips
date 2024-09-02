import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

const ResetPassword = () => {
    const { store, actions } = useContext(Context)
    const { token } = useParams();  // Token del enlace
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Obtén la función de navegación

    // useEffect(() => {
	// 	if(!localStorage.getItem('tempToken')) navigate('/')
	// },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                },
                body: JSON.stringify({ password })
            });

            if (response.ok) {
                alert('Contraseña restablecida con éxito. Puedes iniciar sesión ahora.');
                localStorage.removeItem('tempToken')
                navigate('/');  // Usa navigate en lugar de history.push
            } else {
                const data = await response.json();
                setError(data.msg || 'Hubo un error al restablecer la contraseña.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Hubo un error al restablecer la contraseña.');
        }
    };

    return (
      <div className="ms-4 mt-5">
        <h3>Restablecer Contraseña</h3>
        <form className="ms-4 mb-5" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Contraseña Nueva</label>
            <input
              type="password"
              value={password}
              className="form-control rounded-pill input-sm mt-1 w-25"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              className="form-control rounded-pill input-sm mt-1 w-25"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button
            style={{ background: "#257895" }}
            type="submit"
            className="btn btn-primary mt-4 my-3 rounded-pill px-3 mx-auto"
          >
            Restablecer contraseña
          </button>
        </form>
      </div>
    );
};

export default ResetPassword;
