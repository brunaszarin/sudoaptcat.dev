# ---- Etapa 1: build ----
# Compila o projeto e gera o JAR
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copia só o pom primeiro (aproveita o cache do Docker:
# se o pom não mudou, as dependências não são baixadas de novo)
COPY pom.xml .
RUN mvn dependency:go-offline

# Agora copia o código e compila
COPY src ./src
RUN mvn clean package -DskipTests

# ---- Etapa 2: runtime ----
# Imagem final, só com o Java e o JAR (bem menor)
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copia só o JAR da etapa de build
COPY --from=build /app/target/*.jar app.jar

# O Cloud Run injeta a porta via variável PORT
EXPOSE 8080

# Roda a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]