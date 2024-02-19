# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21-jammy AS builder

# Define build arguments for database username and password
ARG DB_USERNAME
ARG DB_PASSWORD

# Set environment variables for database username and password
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD

# Copy source code to the build container
COPY src /home/app/src
COPY pom.xml /home/app

# Set the working directory
WORKDIR /home/app

# Build the application
RUN mvn clean package

# Stage 2: Create the runtime image
FROM eclipse-temurin:21.0.2_13-jre-jammy

# Add a volume pointing to /tmp
VOLUME /tmp

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Copy the JAR file from the build stage
COPY --from=builder /home/app/target/*.jar app.jar

# Run the JAR file
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
