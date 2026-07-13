package dev.brunaszarin.portfolio.contact.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank(message = "name is required")
        @Size(max = 100, message = "name is too long")
        String name,

        @NotBlank(message = "email is required")
        @Email(message = "invalid email")
        String email,

        @NotBlank(message = "message is required")
        @Size(max = 5000, message = "message is too long")
        String message
) {}