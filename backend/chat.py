import openai

# API�L�[�ƃG���h�|�C���g�̐ݒ�
api_key = "42c19dfbd58e4959b004e61187ae9a8e"  # Azure Portal����擾����API�L�[�����
endpoint = "https://basegpt4turbov.openai.azure.com/"  # ���\�[�X�̃G���h�|�C���g�����
deployment_id = "basegpt-4o"  # �f�v���C���ꂽ���f����ID

# OpenAI API�̃x�[�XURL��ݒ�
openai.api_type = "azure"
openai.api_key = api_key
openai.api_base = endpoint
openai.api_version = "2023-03-15-preview"  # �g�p����API�̃o�[�W�������w��

def chat_function(prompt):
    # ChatCompletion�i�`���b�g�`���j�ł̃��N�G�X�g
    response = openai.ChatCompletion.create(
        engine=deployment_id,  # �f�v���C�������f���̖��O
        messages=[
            # {"role": "system", "content": "You are a helpful assistant."},  # �V�X�e�����b�Z�[�W
            {"role": "user", "content": prompt}  # ���[�U�[����̓���
        ],
        max_tokens=50  # ��������g�[�N���̐����w��
    )

    # ���ʂ̕\��
    return response['choices'][0]['message']['content'].strip()

def chat_test(prompt):
    # ChatCompletion�i�`���b�g�`���j�ł̃��N�G�X�g
    response = openai.ChatCompletion.create(
        engine=deployment_id,  # �f�v���C�������f���̖��O
        messages=[
            # {"role": "system", "content": "You are a helpful assistant."},  # �V�X�e�����b�Z�[�W
            {"role": "user", "content": prompt}  # ���[�U�[����̓���
        ],
        # max_tokens=50  # ��������g�[�N���̐����w��
    )

    output = response['choices'][0]['message']['content'].strip()
    print(output)

    # ���ʂ̕\��
    return output
