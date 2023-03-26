# Use the official Java 11 image as the base image
FROM openjdk:11-jdk-slim

# Install Apache Solr and Maven
RUN apt-get update && apt-get install -y git maven


# Copy the Java application code to the container
WORKDIR /app
COPY . /app

# Fetch some data from the internet
ARG REPO_NAME="maven"
RUN git clone https://github.com/apache/$REPO_NAME.git ./data


# Build and run your Java application with Maven
RUN mvn package
CMD ["java", "-jar", "target/indexer-1-jar-with-dependencies.jar", "/app/data"]
