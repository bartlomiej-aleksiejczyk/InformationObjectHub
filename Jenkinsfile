pipeline {
    agent any

    environment {
        // Define your image name here
        IMAGE_NAME = 'my-application'
        // Define a tag for your image
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop and remove any existing container
                    sh "docker stop ${IMAGE_NAME} || true"
                    sh "docker rm ${IMAGE_NAME} || true"
                    // Run the Docker container from the built image
                    // Adjust the docker run command according to your application's needs
                    // For example, mapping ports or specifying environment variables
                    sh "docker run -d --name ${IMAGE_NAME} -p 8080:8080 ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
    }

    post {
        always {
            // Add post-build actions here, like cleanup
        }
    }
}