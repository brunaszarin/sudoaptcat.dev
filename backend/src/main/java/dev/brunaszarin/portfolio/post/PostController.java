package dev.brunaszarin.portfolio.post;

import dev.brunaszarin.portfolio.post.dto.CreatePostRequest;
import dev.brunaszarin.portfolio.post.dto.PostResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService service;

    public PostController(PostService service) {
        this.service = service;
    }

    // GET /api/posts — lista os posts publicados
    @GetMapping
    public List<PostResponse> getPosts() {
        return service.getPublishedPosts();
    }

    // GET /api/posts/{slug} — busca um post pelo slug
    @GetMapping("/{slug}")
    public PostResponse getPost(@PathVariable String slug) {
        return service.getBySlug(slug);
    }

    // POST /api/posts — cria um novo post
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponse createPost(@Valid @RequestBody CreatePostRequest request) {
        return service.create(request);
    }

    // DELETE /api/posts/{id} — apaga um post
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable Long id) {
        service.delete(id);
    }
}