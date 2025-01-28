# config.py
import os
basedir = os.path.abspath(os.path.dirname(__file__))  # backendフォルダの絶対パス
database_path = os.path.join(basedir, 'instance', 'database.db')

# SQLiteデータベースのURI
SQLALCHEMY_DATABASE_URI = f'sqlite:///{database_path}'

# SQLAlchemyの設定
SQLALCHEMY_TRACK_MODIFICATIONS = False
