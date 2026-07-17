package dev.brunaszarin.portfolio.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// Protege escrita em /api/posts (POST/PUT/DELETE) com uma chave secreta
// enviada no header X-API-Key. Leitura (GET) continua pública, já que os
// visitantes do blog precisam conseguir ler os posts sem chave nenhuma.
@Component
public class ApiKeyAuthFilter extends OncePerRequestFilter {

    @Value("${app.api-key}")
    private String apiKey;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        String method = request.getMethod();
        String path = request.getRequestURI();
        // OPTIONS é o preflight de CORS que o navegador manda antes de POST/
        // PUT/DELETE — ele nunca inclui a chave, então precisa passar livre
        // (a requisição de verdade que vem depois continua protegida)
        boolean isMutatingPostsRequest = path.startsWith("/api/posts")
            && !method.equals("GET")
            && !method.equals("OPTIONS");

        if (isMutatingPostsRequest) {
            String providedKey = request.getHeader("X-API-Key");
            if (providedKey == null || !providedKey.equals(apiKey)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\":\"unauthorized\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
