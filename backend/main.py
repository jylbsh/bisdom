import csv
from io import StringIO
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import requests  # CORSをインポート
from database import db_connect, db_insert_test_data
from model.models import db, Users, Group, Knowledge, Like

from test_data.knowledge_data1 import test_knowledge

# Flaskアプリケーションの初期化
app = Flask(__name__)

# DBを起動する
db_connect(app)
#db_insert_test_data(app)

# CORSを有効化
CORS(app)

@app.route('/', methods=['GET'])
def index():
    #send_like_request()
    return "nothing"

#Knowledge Download API using knowledge_id
@app.route('/downloadKnowledge/<knowledge_id>', methods=['GET'])
def downloadKnowledge(knowledge_id):
    #指定されたナレッジの検索
    knowledge = Knowledge.query.get(knowledge_id)

    #ナレッジ検索失敗のとき
    if not knowledge:
        return jsonify({"error": "Knowledge not found" + " [" + knowledge_id + "]"}), 404
    
    #CSVデータの出力準備
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(['id','type','title','content','author_id'])
    writer.writerow([knowledge.id, knowledge.type, knowledge.title, knowledge.content, knowledge.author_id])

    res = make_response()
    res.data = output.getvalue()
    res.headers['Content-Type'] = 'text/csv'
    res.headers['Content-Disposition'] = 'attachment; filename=knowledge_'+ knowledge_id +'.csv'
    return res

if __name__ == '__main__':
    app.debug = True
    app.run(debug=True, port=8080)


#デバッグモードTrueにすると変更が即反映される
#ファイルのエンコードはUTF-8で保存すること
#下記URLをブラウザに打ち込むとページが開く
# http://127.0.0.1:8080/
