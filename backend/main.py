from flask import Flask, jsonify, request
from flask_cors import CORS  # CORSをインポート

from chat import chat_function,chat_test

app = Flask(__name__)
CORS(app)  # CORSを有効化

@app.route('/')
def index():
    return "Hallo World!"

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
    response_message = chat_test(message)

    # JSON形式で返却
    return jsonify({'reply': response_message})


if __name__ == '__main__':
    app.debug = True
    app.run(port=8080)


#デバッグモードTrueにすると変更が即反映される
#ファイルのエンコードはUTF-8で保存すること
#下記URLをブラウザに打ち込むとページが開く
# http://127.0.0.1:5000/
