import sqlite3
import os

def insert_test_data():
    # データベースファイルへの相対パスを取得
    db_path = os.path.join(os.path.dirname(__file__), '..', 'instance', 'database.db')
    
    # データベースに接続
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # テストデータの定義
    test_data = (
        '1', 'knowledge', 'Test Title', 'Test Content', 'author_1', 'private', 
        '2023-01-01', 'system', '2023-01-01', 'system', 1, 'etag_1', 0, 0, '', '', 0, 0
    )

    # テストデータの挿入
    cursor.execute('''
    INSERT INTO knowledge (
        id, type, title, content, author_id, visibility, create_at, create_by, 
        update_at, update_by, _ts, _etag, version, is_deleted, tags, editors, 
        viewer_count, bookmark_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', test_data)

    # コミットして接続を閉じる
    conn.commit()
    conn.close()

if __name__ == '__main__':
    insert_test_data()