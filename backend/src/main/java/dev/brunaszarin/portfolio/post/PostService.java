package dev.brunaszarin.portfolio.post;

import dev.brunaszarin.portfolio.post.dto.CreatePostRequest;
import dev.brunaszarin.portfolio.post.dto.PostResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class PostService {

    private final PostRepository repository;

    // O Spring injeta o repository automaticamente (constructor injection)
    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    // Lista todos os posts publicados (pro blog público), mais recentes primeiro
    public List<PostResponse> getPublishedPosts() {
        return repository.findByPublishedTrueOrderByCreatedAtDesc()
            .stream()
            .map(PostResponse::from)
            .toList();
    }

    // Busca um post pelo slug (pra página individual do post)
    public PostResponse getBySlug(String slug) {
        Post post = repository.findBySlug(slug)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "post not found"));
        return PostResponse.from(post);
    }

    // Cria um novo post
    public PostResponse create(CreatePostRequest request) {
        // Não deixa criar dois posts com o mesmo slug
        if (repository.existsBySlug(request.slug())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT, "a post with this slug already exists");
        }

        Post post = new Post();
        post.setTitle(request.title());
        post.setSlug(request.slug());
        post.setExcerpt(request.excerpt());
        post.setContent(request.content());
        post.setCoverImage(request.coverImage());
        post.setTags(request.tags() != null ? request.tags() : List.of());
        post.setPublished(request.published());

        Post saved = repository.save(post);
        return PostResponse.from(saved);
    }

    // Apaga um post pelo id
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "post not found");
        }
        repository.deleteById(id);
    }
}