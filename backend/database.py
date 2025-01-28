from model.models import db, Users, Group, Knowledge, Like

def db_connect(app):
    # 設定ファイルの読み込み
    app.config.from_object('config')  # 'config'はconfig.pyを指す
    
    db.init_app(app)

    # データベースの初期化
    with app.app_context():
        db.create_all()