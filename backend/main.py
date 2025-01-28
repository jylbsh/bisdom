from flask import Flask, jsonify, request
from flask_cors import CORS  # CORSをインポート
import sqlite3
import pandas as pd
import os
from database import db_connect
from model.models import db, Users, Group, Knowledge
from pprint import pprint

from test_data.users_data1 import test_users
from message import error_0001E

# Flaskアプリケーションの初期化
app = Flask(__name__)

# DBを起動する
db_connect(app)

# CORSを有効化
CORS(app)

# 例外クラスを定義
class ApplicationException(Exception):
    """カスタム例外クラス"""
    def __init__(self, message_id, message, status_code):
        super().__init__(message)
        self.message_id = message_id
        self.status_code = status_code

@app.route('/', methods=['GET'])
def index():
    return "{Getリクエストを正常に受信しました。}"

# データを追加するエンドポイント
@app.route('/database/users/post', methods=['POST'])
def add_user():
    db.session.add_all(test_users)
    db.session.commit()
    return jsonify({'message': 'User added successfully'})

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

@app.route('/knowledge/get/meisai',methods = ['GET'])
def get_knowledge_meisai():
    knowledge_id = request.args.get('knowledge_id')
    if knowledge_id is None:
        raise ApplicationException(error_0001E.id, error_0001E.message,error_0001E.code)
    
    # 相対パスを使用
    db_path = os.path.join(os.path.dirname(__file__), 'instance', 'database.db')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # SQLクエリを実行
    cursor.execute("SELECT * FROM knowledge WHERE id = ?", (knowledge_id,))
    results = cursor.fetchall()

    # 接続を閉じる
    conn.close()
    
    if len(results) == 0:
        return jsonify({"error": "No data found"}), 404
    elif len(results) > 1:
        return jsonify({"error": "Multiple records found"}), 400

    # データをDataFrameとして表示
    df = pd.DataFrame(results, columns=[desc[0] for desc in cursor.description])
    
    # JSONを整理して出力
    pprint(df.to_dict(orient='records'))

    # JSONで返却
    return df.to_json(orient='records')

if __name__ == '__main__':
    app.debug = True
    app.run(debug=True, port=8080)


#デバッグモードTrueにすると変更が即反映される
#ファイルのエンコードはUTF-8で保存すること
#下記URLをブラウザに打ち込むとページが開く
# http://127.0.0.1:8080/
