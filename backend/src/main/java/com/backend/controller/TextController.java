package com.backend.controller;

import com.backend.core.message.text.TextResponse;
import com.backend.service.text.TextService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/text")
@Tag(name = "text")
@RequiredArgsConstructor
public class TextController {

    private final TextService textService;

    @GetMapping
    public TextResponse get(@RequestParam Integer paragraphs) {
        return textService.get(paragraphs);
    }
}
