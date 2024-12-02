import openai

# APIキーとエンドポイントの設定
api_key = "42c19dfbd58e4959b004e61187ae9a8e"  # Azure Portalから取得したAPIキーを入力
endpoint = "https://basegpt4turbov.openai.azure.com/"  # リソースのエンドポイントを入力
deployment_id = "basegpt-4o"  # デプロイされたモデルのID

# OpenAI APIのベースURLを設定
openai.api_type = "azure"
openai.api_key = api_key
openai.api_base = endpoint
openai.api_version = "2023-03-15-preview"  # 使用するAPIのバージョンを指定

def chat_function(prompt):
    # ChatCompletion（チャット形式）でのリクエスト
    response = openai.ChatCompletion.create(
        engine=deployment_id,  # デプロイしたモデルの名前
        messages=[
            # {"role": "system", "content": "You are a helpful assistant."},  # システムメッセージ
            {"role": "user", "content": prompt}  # ユーザーからの入力
        ],
        max_tokens=50  # 生成するトークンの数を指定
    )

    # 結果の表示
    return response['choices'][0]['message']['content'].strip()

def chat_test(prompt):
    # ChatCompletion（チャット形式）でのリクエスト
    response = openai.ChatCompletion.create(
        engine=deployment_id,  # デプロイしたモデルの名前
        messages=[
            # {"role": "system", "content": "You are a helpful assistant."},  # システムメッセージ
            {"role": "user", "content": prompt}  # ユーザーからの入力
        ],
        # max_tokens=50  # 生成するトークンの数を指定
    )

    output = response['choices'][0]['message']['content'].strip()
    print(output)

    # 結果の表示
    return output
