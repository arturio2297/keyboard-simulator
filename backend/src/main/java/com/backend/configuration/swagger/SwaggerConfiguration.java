package com.backend.configuration.swagger;

import com.backend.core.message.common.Language;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.media.StringSchema;
import io.swagger.v3.oas.models.parameters.Parameter;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

import java.util.Arrays;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Keyboard simulator API",
                version = "v1",
                description = "RESTful API for Keyboard Simulator Application"
        )
)
@SecurityScheme(
        name = "Bearer Authentication",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
public class SwaggerConfiguration {

    @Bean
    public OperationCustomizer operationCustomizer() {
        return ((operation, handlerMethod) -> {
            addOperationLanguageParameters(operation);
            return operation;
        });
    }

    private void addOperationLanguageParameters(Operation operation) {
        final StringSchema schema = new StringSchema();
        schema.setEnum(Arrays.stream(Language.values()).map(Language::getLabel).toList());
        final String description = """
                Allows you to change the language of the requested content,
                notifications sent to the user and error messages
                """;

        final Parameter languageHeaderParameter = new Parameter()
                .in("header")
                .required(false)
                .allowEmptyValue(true)
                .description(description)
                .name(HttpHeaders.ACCEPT_LANGUAGE)
                .schema(schema);

        operation.addParametersItem(languageHeaderParameter);
    }
}
