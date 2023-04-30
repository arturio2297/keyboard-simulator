package com.backend.service.text;

import com.backend.client.TextClient;
import com.backend.core.message.text.TextResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TextService {

    private final TextClient textClient;

    public TextResponse get(Integer paragraphs) {
        final List<String> text = textClient.getText(paragraphs);
        return new TextResponse() {{
            setContent(text);
        }};
    }
}
