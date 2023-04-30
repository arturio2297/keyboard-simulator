package com.backend.client;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TextClient {

    private final static String URL_BASE = "https://baconipsum.com/api";

    private final RestTemplate restTemplate;

    public List<String> getText(Integer paragraphs) {
        final HttpEntity<Objects> request = new HttpEntity<>(getHeaders());
        final String url = UriComponentsBuilder.fromHttpUrl(URL_BASE)
                .queryParam("paras", paragraphs)
                .queryParam("type", "all-meat")
                .encode()
                .toUriString();
        System.out.println(url);
        final ResponseEntity<String[]> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                request,
                String[].class
        );
        return List.of(response.getBody());
    }

    private HttpHeaders getHeaders() {
        return new HttpHeaders();
    }
}
