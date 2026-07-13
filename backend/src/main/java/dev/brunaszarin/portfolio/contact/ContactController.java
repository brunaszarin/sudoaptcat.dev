package dev.brunaszarin.portfolio.contact;

import dev.brunaszarin.portfolio.contact.dto.ContactRequest;
import dev.brunaszarin.portfolio.contact.dto.ContactResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    // POST /api/contact — recebe o formulário e envia o email
    @PostMapping
    public ContactResponse sendMessage(@Valid @RequestBody ContactRequest request) {
        service.sendContactEmail(request);
        return new ContactResponse("message sent successfully");
    }
}