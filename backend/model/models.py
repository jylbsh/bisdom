from init import db

class Users(db.Model):
    __tablename__ = 'users'

    # ��{����
    create_at = db.Column(db.String, nullable=False, default="(�V�X�e������)", comment="���R�[�h�쐬���� (ISO 8601�`��)")
    create_by = db.Column(db.String, nullable=False, comment="���R�[�h�쐬��")
    update_at = db.Column(db.String, nullable=False, default="(�V�X�e������)", comment="���R�[�h�X�V���� (ISO 8601�`��)")
    update_by = db.Column(db.String, nullable=False, comment="���R�[�h�X�V��")
    version = db.Column(db.Integer, nullable=False, default=0, comment="�X�V�� (�����l: 0)")
    _ts = db.Column(db.Integer, nullable=False, comment="CosmosDB�̓����^�C���X�^���v")
    _etag = db.Column(db.String, nullable=False, comment="CosmosDB�̔r������g�[�N��")
    
    # �_���폜�֘A
    is_deleted = db.Column(db.Boolean, nullable=False, default=False, comment="�_���폜�t���O (true/false)")
    deleted_at = db.Column(db.String, nullable=True, comment="�_���폜���� (ISO 8601�`��)")
    deleted_by = db.Column(db.String, nullable=True, comment="�_���폜�����s�������[�U�[��ID")

    # ���[�U�[���
    id = db.Column(db.String, primary_key=True, nullable=False, comment="�Ј��ԍ� (���[�U�[ID�Ƃ��Ďg�p)")
    type = db.Column(db.String, nullable=False, default="users", comment="�h�L�������g�^�C�v (�Œ�l: 'users')")
    name = db.Column(db.String, nullable=False, comment="���[�U�[�̎���")
    display_name = db.Column(db.String, nullable=True, comment="�V�X�e����ŕ\������閼�O")
    email = db.Column(db.String, nullable=False, unique=True, comment="�Г����[���A�h���X")
    password_hash = db.Column(db.String, nullable=False, comment="�n�b�V�������ꂽ�p�X���[�h")
    
    # �X�g���[�W�֘A
    storage_quota = db.Column(db.Integer, nullable=False, default=-1, comment="�X�g���[�W�����l (MB) (-1: ������)")
    storage_used = db.Column(db.Integer, nullable=False, default=0, comment="���݂̃X�g���[�W�g�p�� (0�ȏ�)")

    # ���̑�
    affiliation = db.Column(db.JSON, nullable=True, default=[], comment="�����O���[�v�̔z�� (��: ['�c��', 'admin'])")
    last_login_at = db.Column(db.String, nullable=True, comment="�Ō�Ƀ��O�C���������� (ISO 8601�`��)")
    likes = db.relationship('Like', back_populates='user', lazy=True)

    def __repr__(self):
        return f"<User {self.id} - {self.name}>"

class Group(db.Model):
    __tablename__ = 'groups'

    # ��{����
    create_at = db.Column(db.String, nullable=False, default="(�V�X�e������)", comment="���R�[�h�쐬����")
    create_by = db.Column(db.String, nullable=False, comment="���R�[�h�쐬��")
    update_at = db.Column(db.String, nullable=False, default="(�V�X�e������)", comment="���R�[�h�X�V����")
    update_by = db.Column(db.String, nullable=False, comment="���R�[�h�X�V��")
    version = db.Column(db.Integer, nullable=False, default=0, comment="�X�V�� (�����l: 0)")
    _ts = db.Column(db.Integer, nullable=False, comment="CosmosDB�̓����^�C���X�^���v")
    _etag = db.Column(db.String, nullable=False, comment="CosmosDB�̔r������g�[�N��")

    # �_���폜�֘A
    is_deleted = db.Column(db.Boolean, nullable=False, default=False, comment="�_���폜�t���O (true/false)")
    deleted_at = db.Column(db.String, nullable=True, comment="�_���폜����")
    deleted_by = db.Column(db.String, nullable=True, comment="�_���폜�����s�������[�U�[��ID")

    # �O���[�v���
    id = db.Column(db.String, primary_key=True, nullable=False, comment="�O���[�vID (�p�[�e�B�V�����L�[)")
    type = db.Column(db.String, nullable=False, default="groups", comment="�h�L�������g�^�C�v (�Œ�l: 'groups')")
    name = db.Column(db.String, nullable=False, unique=True, comment="�O���[�v�̖���")
    administrators = db.Column(db.JSON, nullable=False, default=[], comment="�O���[�v�Ǘ��҂̔z��")

    def __repr__(self):
        return f"<Group {self.id} - {self.name}>"

class Knowledge(db.Model):
    __tablename__ = 'knowledge'

    # ��{����
    create_at = db.Column(db.String, nullable=False, default="(�V�X�e������)", comment="���R�[�h�쐬����")
    create_by = db.Column(db.String, nullable=False, comment="���R�[�h�쐬��")
    update_at = db.Column(db.String, nullable=False, default="(�V�X�e������)", comment="���R�[�h�X�V����")
    update_by = db.Column(db.String, nullable=False, comment="���R�[�h�X�V��")
    version = db.Column(db.Integer, nullable=False, default=0, comment="�X�V��")
    _ts = db.Column(db.Integer, nullable=False,default=0, comment="CosmosDB�̓����^�C���X�^���v")
    _etag = db.Column(db.String, nullable=False,default="", comment="CosmosDB�̔r������g�[�N��")

    # �_���폜�֘A
    is_deleted = db.Column(db.Boolean, nullable=False, default=False, comment="�_���폜�t���O")
    deleted_at = db.Column(db.String, nullable=True, comment="�_���폜����")
    deleted_by = db.Column(db.String, nullable=True, comment="�_���폜�����s�������[�U�[��ID")

    # �i���b�W���
    id = db.Column(db.String, primary_key=True, nullable=False, comment="�i���b�WID (�p�[�e�B�V�����L�[)")
    type = db.Column(db.String, nullable=False, default="knowledge", comment="�h�L�������g�^�C�v (�Œ�l)")
    title = db.Column(db.String, nullable=False, comment="�i���b�W�̃^�C�g��")
    content = db.Column(db.String, nullable=False, comment="�i���b�W�̖{��")
    author_id = db.Column(db.String, nullable=False, comment="�i���b�W�쐬��(�p�[�e�B�V�����L�[)")
    visibility = db.Column(db.String, nullable=False, default="private", comment="���J�͈�")
    visible_to_groups = db.Column(db.JSON, nullable=True, default=[], comment="���J��O���[�v")
    tags = db.Column(db.JSON, nullable=False, default=[], comment="�i���b�W�̃^�O")
    image_path = db.Column(db.JSON, nullable=True, default=[], comment="�摜�p�X")
    links = db.Column(db.JSON, nullable=True, default=[], comment="�i���b�W�ɖ��ߍ��܂�Ă��郊���N")
    editors = db.Column(db.JSON, nullable=False, default=[], comment="�����ҏW��")
    viewer_count = db.Column(db.Integer, nullable=False, default=0, comment="�{����")
    bookmark_count = db.Column(db.Integer, nullable=False, default=0, comment="�u�b�N�}�[�N��")
    likes = db.relationship('Like', back_populates='knowledge', lazy=True)

    def __repr__(self):
        return f"<Knowledge {self.id} - {self.title}>"

# Like model to track user-blogpost likes
class Like(db.Model):
    __tablename__ = 'like'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    knowledge_id = db.Column(db.Integer, db.ForeignKey('knowledge.id'), primary_key=True)
    user = db.relationship('Users', back_populates='likes')
    knowledge = db.relationship('Knowledge', back_populates='likes')

    def __repr__(self):
        return f"<Likes {self.user_id} - {self.knowledge_id}>"