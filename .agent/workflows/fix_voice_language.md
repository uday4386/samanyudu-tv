---
description: Rectify Voice Reading Language
---

1.  Open `Mobile_App/Samanyudu-News_App/lib/widgets/news_detail_modal.dart`.
2.  Locate `_startSpeaking` method.
3.  Currently, it determines `lang` based on `text` content:
    ```dart
    final isTelugu = RegExp(r'[\u0c00-\u0c7f]').hasMatch(text);
    // ...
    if (isTelugu) lang = "te-IN";
    ```
4.  But the text displayed is `TranslatedText` which is async. The `item['title']` and `item['description']` are still in the original language (English).
5.  We need to:
    a.  Modify `_startSpeaking` to check `widget.selectedLanguage`.
    b.  If `selectedLanguage` is Telugu but content is English, we must translate it *before* speaking.
    c.  OR, simpler: Since `TranslatedText` handles display, we should use a `GoogleTranslator` instance inside `_startSpeaking` to get the text to speak.
6.  Update `_startSpeaking`:
    -   Check if `widget.selectedLanguage` implies Telugu.
    -   Combine title and description.
    -   If user wants Telugu but text is English:
        -   Translate text to Telugu using `GoogleTranslator`.
        -   Speak the *translated* text with `te-IN`.
    -   Else speak original text with `en-US` (or appropriate lang).

// turbo
7.  Apply changes to `Mobile_App/Samanyudu-News_App/lib/widgets/news_detail_modal.dart`.
