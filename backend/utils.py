import bleach
from datetime import datetime
from typing import Tuple
from init import db
from model.models import Knowledge
from messages import CreateBy,ErrorMessages
from common_decorator import transactional
from common_type import Model 
from collections import defaultdict
import uuid

def get_knowledge_by_id(id:int) -> Knowledge:
    return Knowledge.query.get({"id":id})

def messeage_generator(message_id:ErrorMessages,*args,**kwargs) -> str:
    return message_id.value.format(*args,**kwargs)

def create_default_insert_data(model:Model) -> dict[str,str|None]:
    """
    DBの登録データの初期設定

    Parameters:
    model(Model): 事前に設定したModel

    Return:
    default_insert_data(dict[str,str|None]): 初期設定された登録データ(作成日時および作成者)
    """
    default_insert_data:dict[str,str|None] = {column:None for column in model.__dict__ if not column.startswith("_")}
    if "create_at" in default_insert_data:default_insert_data["create_at"] = datetime.now()
    if "create_by" in default_insert_data:default_insert_data["create_by"] = CreateBy.SYSTEM
    if "update_at" in default_insert_data:default_insert_data["update_at"] = datetime.now()
    if "update_by" in default_insert_data:default_insert_data["update_by"] = CreateBy.SYSTEM
    return default_insert_data
@transactional
def update_knowledge(data:dict[str,str|int|None]) -> Tuple[dict[str,str|Model],int]:
    if "id" not in data:return {"message":ErrorMessages.ERROR_ID_005E},99
    knowledge:Knowledge = get_knowledge_by_id(data["id"])
    if not knowledge:return ErrorMessages.ERROR_ID_003E,99
    if "contents" not in data: return {"message":ErrorMessages.ERROR_ID_009E},99
    if "title" not in data or len(data["title"])<1: return {"message":ErrorMessages.ERROR_ID_008E},99
    if "author_id" not in data or len(data["author_id"])<1: return {"message":ErrorMessages.ERROR_ID_007E},99
    except_list = ["id","content","update_by"]
    for k, v in data.items():
        if k in knowledge and k not in except_list:
            setattr(knowledge, k, v)
    html,result = sanitize_quill_html(data["contents"])
    if result:return {"message":ErrorMessages.ERROR_ID_006E},99
    knowledge.content = html
    knowledge.update_at = datetime.now()
    knowledge.update_by = data["author_id"]
    return {"message":"ナレッジ内容更新が成功しました","knowledge_id":knowledge.id},0
    
@transactional
def add_new_knowledge(data:dict[str,str|int|None]) -> Tuple[dict[str,str|Model],int]:
    """
    ナレッジの追加
    
    Paramters:
    data(dict): ナレッジ登録用データ

    Return:
    result(dict[str,list[str]|Model]): 処理メッセージ
    exit_code(int): 処理結果
    """
    try:
        insert_data:dict[str,None|str] = create_default_insert_data(Knowledge)
        if "contents" not in data: return {"message":ErrorMessages.ERROR_ID_009E},99
        if "title" not in data or len(data["title"])<1: return {"message":ErrorMessages.ERROR_ID_008E},99
        if "author_id" not in data or len(data["author_id"])<1: return {"message":ErrorMessages.ERROR_ID_007E},99
        insert_data.update({k:v for k,v in data.items() if k in insert_data})
        html,result = sanitize_quill_html(data["contents"])
        if result:return {"message":ErrorMessages.ERROR_ID_006E},99
        insert_data["content"] = html
        insert_data["id"] = str(uuid.uuid4())
        knowledge = Knowledge(**insert_data)
        db.session.add(knowledge)
        return {"message":"登録完了した","knowledge_id":knowledge.id},0
    except Exception as e:
        return {"message":f"ナレッジの登録中にエラーが発生しました、エラーメッセージ:{e}"},99
def sanitize_quill_html(content:str|None) -> Tuple[str,int]:
    """
    Quillからの送信データ(HTML)をサニタイジングする作業
    
    Parameters:
    content(str) : htmlのコンテンツ

    Return:
    sanitized_html(str) : サニタイジング後のhtml
    exit_code(int) : 処理結果
    """
    ALLOWED_TAGS:list = list(bleach.ALLOWED_TAGS)+[
        "h1","h2","h3","p","br","strong","em","u","strike",
        "ul","ol","li","blockquote","code","div"
    ]
    ALLOWED_ATTRIBUTES:dict =defaultdict(list)
    ALLOWED_ATTRIBUTES.update({
        "a":["href","title"],
        "img":["src","alt","width","height"]
    },**bleach.ALLOWED_ATTRIBUTES)
    if not content:return "",0
    try:
        sanitized_html = bleach.clean(content,tags=ALLOWED_TAGS,attributes=ALLOWED_ATTRIBUTES,strip=True)
    except Exception:
        return "",99
    return sanitized_html,0
if __name__ == "__main__":
    print(CreateBy.SYSTEM)
    print(ErrorMessages.ERROR_ID_001E.value.id)
    print(messeage_generator(ErrorMessages.ERROR_ID_008E,"私"))
