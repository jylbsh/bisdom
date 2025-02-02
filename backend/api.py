from init import app,db,jwt
from common_exception import TransactionException
from werkzeug.security import generate_password_hash,check_password_hash
# chat import chat_function,chat_test
#CORS(app)  # CORSを有効化
from flask import  jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, \
    get_jwt_identity,set_refresh_cookies,unset_jwt_cookies,unset_access_cookies
from utils import add_new_knowledge,get_knowledge_by_id,update_knowledge,get_user_by_id
with app.app_context():
    db.create_all()

@jwt.unauthorized_loader
def custom_unauthorized_error(error):
    return jsonify({
        'msg': 'Authorization token is missing or invalid'
    }), 403

@jwt.expired_token_loader
def custom_expired_token_error(error):
    return jsonify({
        'msg': 'The token has expired. Please log in again.'
    }), 402

@jwt.invalid_token_loader
def custom_invalid_token_error(error):
    return jsonify({
        'msg': 'The token is invalid. Please check your credentials.'
    }), 404
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


if __name__ == '__main__':
    app.debug = True
    app.run(port=8080)


#デバッグモードTrueにすると変更が即反映される
#ファイルのエンコードはUTF-8で保存すること
#下記URLをブラウザに打ち込むとページが開く
# http://127.0.0.1:5000/
