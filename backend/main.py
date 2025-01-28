from flask import Flask, jsonify, request
from flask_cors import CORS  # CORSをインポート
from database import db_connect
from model.models import db, Users, Group, Knowledge, Like
import requests

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
    
#knowledge like API
@app.route('/likeKnowledge', methods=['POST'])
def likeKnowledge():
    user_id = request.json.get('user_id')
    knowledge_id = request.json.get('knowledge_id')

    if not user_id or not knowledge_id:
        return jsonify({"error": "Missing user_id or knowledge_id"}), 400

    # Check if the blog post exists
    knowledge = Knowledge.query.get(knowledge_id)
    if not knowledge:
        return jsonify({"error": "Knowledge not found"}), 404

    # Check if the user exists
    user = Users.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Check if the user has already liked this blog post
    existing_like = Like.query.filter_by(user_id=user_id, knowledge_id=knowledge_id).first()

    if existing_like:
        # If the like already exists, remove it (unlike the post)
        db.session.delete(existing_like)
        db.session.commit()
        return jsonify({"message": "Knowledge unliked successfully"}), 200
    else:
        # If the like doesn't exist, add it
        new_like = Like(user_id=user_id, knowledge_id=knowledge_id)
        db.session.add(new_like)
        db.session.commit()
        return jsonify({"message": "Knowledge liked successfully"}), 200
    
@app.route('/countKnowledgeLikes/<knowledge_id>', methods=['GET'])
def countKnowledgeLikes(knowledge_id):
    knowledge = Knowledge.query.get(knowledge_id)
    if not knowledge:
        return jsonify({"error": "Knowledge not found"}), 404

    likes_count = Like.query.filter_by(knowledge_id=knowledge_id).count()
    return jsonify({"likes_count": likes_count}), 200

def send_like_request():
    url = 'http://127.0.0.1:8080/likeKnowledge'
    data = {"user_id": "U0001", "knowledge_id": "1"}
    
    try:
        response = requests.post(url, json=data)
        if response.status_code == 200:
            print("Successfully liked the knowledge!")
            print("Response:", response.json())  # Print the response content
        else:
            print(f"Failed to like the knowledge. Status Code: {response.status_code}")
            print("Response:", response.text)

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    app.debug = True
    app.run(debug=True, port=8080)


#デバッグモードTrueにすると変更が即反映される
#ファイルのエンコードはUTF-8で保存すること
#下記URLをブラウザに打ち込むとページが開く
# http://127.0.0.1:8080/
