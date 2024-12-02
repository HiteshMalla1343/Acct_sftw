from googletrans import Translator

def translate_to_telugu(name):
    """
    Translate name to Telugu using Google Translate
    Note: In production, use a more robust translation service
    """
    try:
        translator = Translator()
        translation = translator.translate(name, dest='te')
        return translation.text
    except Exception as e:
        print(f"Translation error: {e}")
        return None