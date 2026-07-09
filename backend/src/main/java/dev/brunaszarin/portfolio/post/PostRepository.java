package dev.brunaszarin.portfolio.post;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    // Busca um post pelo slug (pra URLs tipo /blog/meu-post)
    Optional<Post> findBySlug(String slug);

    // Busca só os posts publicados, mais recentes primeiro
    List<Post> findByPublishedTrueOrderByCreatedAtDesc();

    // Verifica se já existe um post com aquele slug (evita duplicados)
    boolean existsBySlug(String slug);
}