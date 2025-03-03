import unittest
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from utils import add_new_knowledge
from your_app_module import create_app  # 例: アプリケーション工場の関数

class TestAddNewKnowledge(unittest.TestCase):
    def setUp(self):
        self.app = create_app(config_name='testing')
        self.app_context = self.app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_add_new_knowledge_success(self):
        test_data = {
            "title": "テスト題目",
            "contents": "<p>これはテストです。</p>",
            "author_id": "test_author"
        }
        with self.app.app_context():
            result, exit_code = add_new_knowledge(test_data)
        self.assertEqual(exit_code, 0)
        self.assertIn("登録完了した", result.get("message", ""))

if __name__ == '__main__':
    unittest.main()