# config.py
import os
from datetime import timedelta
basedir = os.path.abspath(os.path.dirname(__file__))  # backendフォルダの絶対パス
database_path = os.path.join(basedir, 'instance', 'database.db')
# JWT_SECRET_KEY = 'bisdom20242HBXXXWGFIRSTTRIAL'
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=2)
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=1)
JWT_COOKIE_HTTPONLY = True
JWT_TOKEN_LOCATION = ['headers', 'cookies']
JWT_COOKIE_SECURE = True
JWT_REFRESH_COOKIE_PATH ="/refresh"
# SQLiteデータベースのURI
SQLALCHEMY_DATABASE_URI = f'sqlite:///{database_path}'

# SQLAlchemyの設定
SQLALCHEMY_TRACK_MODIFICATIONS = False
