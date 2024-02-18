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
// Use the 'script' block directly within 'steps'
                script {
                    docker.build("${env.IMAGE_NAME}:${env.IMAGE_TAG}")
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Ensure commands are correctly structured within the 'script' block
                    // Stop and remove any existing container
                    sh "docker stop ${env.IMAGE_NAME} || true"
                    sh "docker rm ${env.IMAGE_NAME} || true"
                    
                    // Run the Docker container from the built image
                    // Adjust the docker run command according to your application's needs
                    // For example, mapping ports or specifying environment variables
                    sh "docker run -d --name ${env.IMAGE_NAME} -p 8090:8080 ${env.IMAGE_NAME}:${env.IMAGE_TAG}"
                }
            }
        }
    }
}
