package com.backend.service.email;

import com.backend.service.locale.LocaleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Date;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    @Value("${spring.mail.username}")
    private String email;

    private final JavaMailSender sender;
    private final LocaleService localeService;

    public void sendRegistrationCode(String email, String code) {
        final String subject = localeService.getMessage("mailMessages", "registrationSubject");
        final String text = localeService.getMessage("mailMessages", "registrationText");
        sendText(email, subject, MessageFormat.format(text, code));
    }

    public void sendText(String to, String subject, String text) {
        final SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(email);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setSentDate(new Date());

        sender.send(message);

        log.debug("Send text message with subject: '{}' to: '{}'", subject, to);
    }
}
