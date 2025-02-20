from init import app,db,jwt
from common_exception import TransactionException
from werkzeug.security import generate_password_hash,check_password_hash
from flask import  jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, \
    get_jwt_identity,set_refresh_cookies,unset_jwt_cookies,unset_access_cookies
import os

from utils import add_new_knowledge,get_knowledge_by_id,update_knowledge,get_user_by_id
from model.models import Users, Group, Knowledge
import messages
import chatbotBaseAI

with app.app_context():
    db.create_all()

@jwt.unauthorized_loader
def custom_unauthorized_error(error):
    return jsonify({
        'msg': 'Authorization token is missing or invalid'
    }), 403

@jwt.expired_token_loader
def custom_expired_token_error(error, jwt_payload):
    return jsonify({
        'msg': 'The token has expired. Please log in again.'
    }), 402

@jwt.invalid_token_loader
def custom_invalid_token_error(error):
    return jsonify({
        'msg': 'The token is invalid. Please check your credentials.'
    }), 404

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({
        "msg": "Token has expired, please refresh your session"
    }), 401

@app.route('/')
@jwt_required()
def index():
    return "Hallo World!"
@app.route('/log-in',methods=["POST"])
def auth():
    employee_id = request.json.get('id', None)
    password = request.json.get('password', None)
    user = get_user_by_id(employee_id)
    if user and check_password_hash(user.password_hash,password): 
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        response = jsonify({
            "authToken": access_token
        })      
        
        set_refresh_cookies(response, refresh_token)

        return response, 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401
@app.route('/log-out', methods=['POST'])
def logout():
    response = jsonify({"msg": "Logout successful"})
    unset_jwt_cookies(response)
    return response, 200

@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)

    return jsonify({"access_token": new_access_token}), 200
@app.route('/knowledge/<id>',methods=["GET"])
@jwt_required()
def move_to_knowledge_detail(id):
    """
    明細画面に遷移処理

    TODO
    """
    knowledge = get_knowledge_by_id(id)
    return jsonify({"messages":"YES","knowledge_id":id,"content":knowledge.to_dict()}),200
 
@app.route('/add-knowledge',methods=['POST','GET'])
@jwt_required()
def add_knowledge():
    """
    ナレッジ追加処理

    Return:
    Response:json
    status_code:int
    """
    if request.method == 'get':
        return jsonify({"message":"Access Denied"}),400
    try:
        data:dict|None = request.get_json()
        result,exit_code = add_new_knowledge(data)
        match exit_code:
            case 0:
                return jsonify({"messages":result["message"],"knowledge_id":result["knowledge_id"],"is_author":True}),200
            case _:
                return jsonify({"messages":result["message"],"knowledge_id":None,"is_author":None}),401
    except TransactionException as t:
        return jsonify({"messages":str(t),"knowledge_id":None,"is_author":None}),401
@app.route('/modify-knowledge',methods=['POST','GET'])
@jwt_required()
def modify_knowledge():
    """
    ナレッジ更新処理

    Return:
    Response:json
    status_code:int
    """
    if request.method == 'get':
        return jsonify({"message":"Access Denied"}),400
    try:
        data:dict|None = request.get_json()
        result,exit_code = update_knowledge(data)
        match exit_code:
            case 0:
                return jsonify({"messages":result["message"],"knowledge_id":result["knowledge_id"],"is_author":True}),200
            case _:
                return jsonify({"messages":result["message"],"knowledge_id":None,"is_author":None}),401
    except TransactionException as t:
        return jsonify({"messages":str(t),"knowledge_id":None,"is_author":None}),401
        
        
@app.route('/test', methods=['POST'])
def test():
    # リクエストデータを取得
    data = request.get_json()
    message = data.get('message', '')
    history = data.get('history', [])
    # print(history)
    prompt_list = []
    for his in history:
        prompt_list.append(his)

    prompt_list.append(message)

    # ここで何らかの処理をして応答を生成する
    # response_message = chat_function(prompt_list)
    #response_message = chat_test(message)

    # JSON形式で返却
    return jsonify({"a":10000}),200
    #return jsonify({'reply': response_message})

# データを追加するエンドポイント
@app.route('/database/users/post', methods=['POST'])
def add_user():
    '''
    ユーザーを追加するエンドポイント
    ※現時点で未完成
    args:
        str username
        str password
    return:
        str message
        int status_code
    '''
    # クエリパラメータを取得
    username = request.args.get('username')
    password = request.args.get('password')

    # パラメータが存在するか確認
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    # パスワードをハッシュ化
    hashed_password = generate_password_hash(password, method='sha256')

    # 新しいユーザーを作成
    new_user = Users(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User added successfully'}), 201

# データを取得するエンドポイント
@app.route('/database/users/get', methods=['GET'])
def get_users():
    try:
        # データベースから全てのユーザーを取得
        users = Users.query.all()

        # ユーザーを辞書形式に変換
        users_list = [
            {
                "create_at": user.create_at,
                "create_by": user.create_by,
                "update_at": user.update_at,
                "update_by": user.update_by,
                "version": user.version,
                "_ts": user._ts,
                "_etag": user._etag,
                "is_deleted": user.is_deleted,
                "deleted_at": user.deleted_at,
                "deleted_by": user.deleted_by,
                "id": user.id,
                "type": user.type,
                "name": user.name,
                "display_name": user.display_name,
                "email": user.email,
                "password_hash": user.password_hash,
                "storage_quota": user.storage_quota,
                "storage_used": user.storage_used,
                "affiliation": user.affiliation,
                "last_login_at": user.last_login_at
            }
            for user in users
        ]

        # JSONで返却
        return jsonify(users_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/knowledge/get/meisai', methods=['GET'])
def get_knowledge_meisai():
    knowledge_id = request.args.get('knowledge_id')
    if knowledge_id is None:
        raise messages.ApplicationException(messages.ErrorMessages.ERROR_ID_0003E.value, 404)

    try:
        # SQLAlchemyを使用してデータを取得
        knowledge = Knowledge.query.filter_by(id=knowledge_id).first()

        if knowledge is None:
            return jsonify({"error": "No data found"}), 404

        # データを辞書形式に変換
        knowledge_data = {
            "id": knowledge.id,
            "title": knowledge.title,
            "content": knowledge.content,
            "created_at": knowledge.created_at,
            "updated_at": knowledge.updated_at
        }

        return jsonify(knowledge_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    
    # Get a response from the model
    response = chatbotBaseAI.apiChat(user_input)
    return jsonify({'response': response})