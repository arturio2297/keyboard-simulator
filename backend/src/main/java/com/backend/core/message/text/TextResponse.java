package com.backend.core.message.text;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter@Setter
public class TextResponse {
    private List<String> content;
}
