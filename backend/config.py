# config.py
import os
basedir = os.path.abspath(os.path.dirname(__file__))  # backend�t�H���_�̐�΃p�X
database_path = os.path.join(basedir, 'instance', 'database.db')

# SQLite�f�[�^�x�[�X��URI
SQLALCHEMY_DATABASE_URI = f'sqlite:///{database_path}'

# SQLAlchemy�̐ݒ�
SQLALCHEMY_TRACK_MODIFICATIONS = False
