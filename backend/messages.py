from enum import Enum
from dataclasses import dataclass

@dataclass
class Messages:
    id:str
    error_code:int
    message:str

class ErrorMessages(Enum):
    ERROR_ID_009E = '送信内容が存在していません'
    ERROR_ID_008E = 'タイトルが未設定'
    ERROR_ID_007E = 'ユーザーが未設定'
    ERROR_ID_006E = 'htmlのサニタイジングが失敗しました'
    ERROR_ID_005E = 'ナレッジID不正'
    ERROR_ID_004E = 'XXX'
    ERROR_ID_003E = 'ナレッジが見つかりませんでした'
    ERROR_ID_002E = '{0}が埋め込んでない'
    ERROR_ID_010E = Messages("010E","テスト",404)
    ERROR_ID_0001E = {'message':"test","id":"001E"}
    def __str__(self):
        return self.value
class CreateBy(Enum):
    SYSTEM = "system"
    def __str__(self):
        return self.value