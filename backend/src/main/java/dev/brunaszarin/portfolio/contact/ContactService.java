package dev.brunaszarin.portfolio.contact;

import dev.brunaszarin.portfolio.contact.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
public class ContactService {

    private final RestClient restClient;
    private final String apiKey;
    private final String from;
    private final String to;

    public ContactService(
            @Value("${resend.api-key}") String apiKey,
            @Value("${resend.from}") String from,
            @Value("${resend.to}") String to
    ) {
        this.apiKey = apiKey;
        this.from = from;
        this.to = to;
        this.restClient = RestClient.builder()
                .baseUrl("https://api.resend.com")
                .build();
    }

    public void sendContactEmail(ContactRequest request) {
        // Monta o corpo do email em HTML
        String html = """
            <h2>New message from your portfolio</h2>
            <p><strong>Name:</strong> %s</p>
            <p><strong>Email:</strong> %s</p>
            <hr>
            <p>%s</p>
            """.formatted(
                escapeHtml(request.name()),
                escapeHtml(request.email()),
                escapeHtml(request.message()).replace("\n", "<br>")
        );

        // O payload que a API do Resend espera
        Map<String, Object> payload = Map.of(
                "from", "Portfolio <" + from + ">",
                "to", to,
                "subject", "New contact from " + request.name(),
                "html", html,
                "reply_to", request.email()
        );

        try {
            restClient.post()
                    .uri("/emails")
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(payload)
                    .retrieve()
                    .toBodilessEntity();
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "could not send your message right now, please try again later"
            );
        }
    }

    // Evita que o conteúdo do formulário quebre o HTML do email
    private String escapeHtml(String input) {
        return input
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;");
    }
}