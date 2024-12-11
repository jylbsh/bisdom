from flask import Flask, jsonify, request
from flask_cors import CORS  # CORSをインポート
from database import db_connect
from model.models import db, Users, Group, Knowledge

from test_data.users_data1 import test_users

# Flaskアプリケーションの初期化
app = Flask(__name__)

# DBを起動する
db_connect(app)

# CORSを有効化
CORS(app)

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

if __name__ == '__main__':
    app.debug = True
    app.run(debug=True, port=8080)


#デバッグモードTrueにすると変更が即反映される
#ファイルのエンコードはUTF-8で保存すること
#下記URLをブラウザに打ち込むとページが開く
# http://127.0.0.1:8080/
