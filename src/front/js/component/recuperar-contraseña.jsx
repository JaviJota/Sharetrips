import React, { useState } from 'react'

export const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(process.env.BACKEND_URL + '/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await resp.json();
            localStorage.setItem('tempToken', data.token)
            if (resp.ok) {
                alert('Revisa tu correo para restablecer tu contraseña');
            } else {
                alert('Hubo un error, por favor intenta de nuevo');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div className="modal fade ejemplo" id="forgot-password" aria-hidden="true" aria-labelledby="retrieve-password" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="retrieve-password">ShareTrips</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className=" text-center">
                            <h1 className="action fs-5 text-black">
                            Recuperar contraseña
                            </h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="w-75 mx-auto mt-3 input-group-sm">
                                <label htmlFor="recoveryEmail" className="ms-2">
                                    Email
                                </label>
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    id="recoveryEmail"
                                    name="recoveryEmail"
                                    className="form-control rounded-pill input-sm mx-auto mt-1"
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="text-center mt-3">
                                <button
                                    style={{ background: "#257895" }}
                                    type="submit"
                                    className="btn btn-primary mt-2 my-3 rounded-pill px-3 mx-auto"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}