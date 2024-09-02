from flask import Flask, request, jsonify, Blueprint, url_for
from api.models import db, User, Itinerary, Contacts
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token, decode_token
from flask_cors import CORS
from flask_mail import Mail, Message
import bcrypt
import re
import jwt
from datetime import datetime, timedelta
import os

api = Blueprint('api', __name__)

# Regex patterns basados en las restricciones del front-end
EMAIL_REGEX = r"^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
PASSWORD_REGEX = r"(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"

def validate_email(email):
    return re.match(EMAIL_REGEX, email)

def validate_password(password):
    return re.match(PASSWORD_REGEX, password)



# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users = [user.serialize() for user in users]

    return jsonify({'msg': 'ok',
                    'users': users}), 200

@api.route('/itineraries', methods=['GET'])
def get_itineraries():
    city = request.args.get('city')
    duration = request.args.get('duration')

    query = Itinerary.query
    
    if city:
        query = query.filter_by(city=city)
    
    if duration:
        query = query.filter_by(duration=duration)
    
    itineraries = query.all()
    itineraries = [itinerary.serialize() for itinerary in itineraries]

    if not itineraries:
        return jsonify({'msg': 'Data not found'}), 404

    return jsonify({'msg': 'ok', 'itineraries': itineraries}), 200

@api.route('/itineraries/<int:id>', methods=['GET'])
def get_single_itinerary(id):
    itinerary = Itinerary.query.get(id)
    if not itinerary:
        return jsonify({'msg': 'Data not found'}), 404
    itinerary = itinerary.serialize()
    return jsonify({'msg': 'ok', 'itinerary': itinerary}), 200

@api.route('/itineraries', methods=['POST'])
@jwt_required()
def create_itinerary():
    data = request.json
    author_id = get_jwt_identity()
    required_fields = ['title', 'description', 'city', 'duration', 'itinerary']
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        print(data)
        return jsonify({'msg': f'Missing fields: {", ".join(missing_fields)}', 'data': data}), 400

    new_itinerary = Itinerary(
        author_id = author_id,
        title = data['title'].strip(),
        description = data['description'].strip(),
        duration = data['duration'],
        city = data['city'],
        itinerary = data['itinerary'],
        images = data['images']
    )

    db.session.add(new_itinerary)
    db.session.commit()
    return jsonify({'msg': 'Itinerary created successfully'}), 201

# Rutas de autenticación
@api.route('/register', methods=['POST'])
def register():
    data = request.json
    required_fields = ['email', 'password', 'username']
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        return jsonify({'msg': f'Missing fields: {", ".join(missing_fields)}'}), 400

    # Validar email
    if not validate_email(data['email']):
        return jsonify({"success": False, "msg": "Email inválido."}), 400

    # Validar contraseña
    if not validate_password(data['password']):
        return jsonify({"success": False, "msg": "La contraseña no cumple con los requisitos."}), 400

    # Verificar si el email ya está en uso
    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({'success': False, 'msg': 'Este email ya está en uso.'}), 400
    
    username = User.query.filter_by(username=data['username']).first()
    if username:
        return jsonify({'success': False, 'msg': 'Este username ya está en uso.'}), 400

    # Encriptar la contraseña usando bcrypt
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    # Crear nuevo usuario
    new_user = User(email=data['email'], username=data['username'], password=hashed_password.decode('utf-8'))

    # Guardar usuario en la base de datos
    db.session.add(new_user)
    db.session.commit()

    # Crear token de acceso JWT
    access_token = create_access_token(identity=new_user.id)

    return jsonify({'msg': 'User registered successfully', 'access_token': access_token}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    required_fields = ['email', 'password']
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        return jsonify({'msg': f'Missing fields: {", ".join(missing_fields)}'}), 400
    
    # Validar email
    if not validate_email(data['email']):
        return jsonify({"success": False, "msg": "Email inválido."}), 400
    
    # Validar contraseña
    if not validate_password(data['password']):
        return jsonify({"success": False, "msg": "Contraseña inválida."}), 400

    # Buscar el usuario por email
    user = User.query.filter_by(email=data['email']).first()
    
    # Verificar si el usuario existe y si la contraseña es correcta
    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({'msg': 'Email o contraseña incorrectos.'}), 401
    
    # Crear el token de acceso JWT si la autenticación es exitosa
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

@api.route('/forgot-password', methods=['POST'])
def request_password_reset():
    data = request.json
    from app import app, mail

    BASE_URL = "https://obscure-doodle-9764jrgrgw6x2xj5q-3000.app.github.dev"

    if 'email' not in data:
        return jsonify({'msg': 'Email is required'}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({'msg': 'User not found'}), 404

    # Generar un token JWT para el reset de contraseña
    reset_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    reset_token_encoded = jwt.utils.base64url_encode(reset_token.encode()).decode()

    reset_url = f"{BASE_URL}/reset-password/{reset_token_encoded}"

    try:
        msg = Message(subject="Password Reset Request",
                      sender=app.config['MAIL_DEFAULT_SENDER'],
                      recipients=[data['email']])
        msg.body = f"To reset your password, click the following link: {reset_url}"
        mail.send(msg)
    except Exception as e:
        return jsonify({'msg': 'Error sending email', 'error': str(e)}), 500

    return jsonify({'msg': 'Password reset email sent', 'token': reset_token}), 200

@api.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    from app import app

    try:
        reset_token_decoded = jwt.utils.base64url_decode(token.encode()).decode()
        
        # Decodificar el token JWT para obtener el ID del usuario
        decoded_token = decode_token(reset_token_decoded)
        user_id = decoded_token['sub']
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'msg': 'Invalid token'}), 400

        # Obtener la nueva contraseña desde los datos de la solicitud
        data = request.json
        new_password = data.get('password')
        if not new_password or not validate_password(new_password):
            return jsonify({'msg': 'Invalid password'}), 400

        # Encriptar la nueva contraseña y actualizarla en la base de datos
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
        user.password = hashed_password.decode('utf-8')
        db.session.commit()
        
        return jsonify({'msg': 'Password has been reset'}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'msg': 'Token expired'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'msg': 'Invalid token'}), 400
    except Exception as e:
        return jsonify({'msg': 'Error resetting password', 'error': str(e)}), 500


@api.route('/validate-token', methods=['GET'])
@jwt_required()
def validate_token():
    current_user_id = get_jwt_identity()
    return jsonify({'success': True, 'msg': 'Token is valid', 'user_id': current_user_id}), 200

@api.route('/contact', methods=['POST'])
def create_contact():
    data = request.json
    from app import app, mail

    required_fields = ['contactEmail', 'asunto', 'descripcion']
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        return jsonify({'msg': f'Missing fields: {", ".join(missing_fields)}'}), 400
    new_contact = Contacts(email=data['contactEmail'], title=data['asunto'], description=data['descripcion'])

    db.session.add(new_contact)
    db.session.commit()

    try:
        msg = Message(subject=data['asunto'],
                      sender=('Formulario de contacto', app.config['MAIL_DEFAULT_SENDER']),
                      recipients=[data['contactEmail']],
                      bcc=['sharetrips.help@gmail.com'])
        msg.body = f"Email: {data['contactEmail']}\nAsunto: {data['asunto']}\nDescripción:\n{data['descripcion']}"
        mail.send(msg)
    except Exception as e:
        return jsonify({'msg': 'Error al enviar el correo', 'error': str(e)}), 500

    return jsonify({'msg': 'ok'}), 200


@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(logged_in_as=user.username), 200

# Nueva ruta para eliminar la cuenta del usuario
@api.route('/delete-account', methods=['DELETE'])
@jwt_required()
def delete_account():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"message": "Cuenta eliminada"}), 200

@api.route('/verify-password', methods=['POST'])
@jwt_required()
def verify_password():
    data = request.json
    required_fields = ['password']
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        return jsonify({'msg': f'Missing fields: {", ".join(missing_fields)}'}), 400

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    if not bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({'msg': 'Contraseña incorrecta'}), 401
    
    return jsonify({'msg': 'Contraseña verificada'}), 200

