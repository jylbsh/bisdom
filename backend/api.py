from init import app,db
from common_exception import TransactionException
# chat import chat_function,chat_test
#CORS(app)  # CORSを有効化
from flask import  jsonify, request
from utils import add_new_knowledge,get_knowledge_by_id,update_knowledge
with app.app_context():
    db.create_all()
@app.route('/')
def index():
    return "Hallo World!"
@app.route('/knowledge/<id>',methods=["GET"])
def move_to_knowledge_detail(id):
    """
    明細画面に遷移処理

    TODO
    """
    knowledge = get_knowledge_by_id(id)
    return jsonify({"messages":"YES","knowledge_id":id,"content":knowledge.to_dict()}),200
 
@app.route('/add-knowledge',methods=['POST','GET'])
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
