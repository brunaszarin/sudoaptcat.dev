package dev.brunaszarin.portfolio.post.dto;

import dev.brunaszarin.portfolio.post.Post;
import java.time.Instant;
import java.util.List;

public record PostResponse(
    Long id,
    String title,
    String slug,
    String excerpt,
    String content,
    String coverImage,
    List<String> tags,
    boolean published,
    Instant createdAt
) {
    // Converte uma entity Post no DTO de resposta
    public static PostResponse from(Post post) {
        return new PostResponse(
            post.getId(),
            post.getTitle(),
            post.getSlug(),
            post.getExcerpt(),
            post.getContent(),
            post.getCoverImage(),
            post.getTags(),
            post.isPublished(),
            post.getCreatedAt()
        );
    }
}