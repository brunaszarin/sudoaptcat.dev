package dev.brunaszarin.portfolio.post.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record CreatePostRequest(
    @NotBlank(message = "title is required")
    String title,

    @NotBlank(message = "slug is required")
    String slug,

    @NotBlank(message = "excerpt is required")
    String excerpt,

    @NotBlank(message = "content is required")
    String content,

    String coverImage,

    List<String> tags,

    boolean published
) {}