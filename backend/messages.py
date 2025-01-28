from enum import Enum
from dataclasses import dataclass

@dataclass
class Messages:
    id:str
    error_code:int
    message:str

class ErrorMessages(Enum):
    ERROR_ID_0001E = {'message':"test","id":"001E"}
    ERROR_ID_0002E = '{0}が埋め込んでない'
    ERROR_ID_0003E = 'ナレッジが見つかりませんでした'
    ERROR_ID_0004E = 'XXX'
    ERROR_ID_0005E = 'ナレッジID不正'
    ERROR_ID_0006E = 'htmlのサニタイジングが失敗しました'
    ERROR_ID_0007E = 'ユーザーが未設定'
    ERROR_ID_0008E = 'タイトルが未設定'
    ERROR_ID_0009E = '送信内容が存在していません'
    ERROR_ID_0010E = Messages("010E","テスト",404)
    def __str__(self):
        return self.value
class CreateBy(Enum):
    SYSTEM = "system"
    def __str__(self):
        return self.value