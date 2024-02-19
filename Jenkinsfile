pipeline {
    agent any

    environment {
        // Define your image name here
        IMAGE_NAME = "${JOB_NAME}".toLowerCase().replaceAll(/[^a-z0-9._-]/, '-')
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

        stage('Get Host IP') {
            steps {
                script {
                    // Using a shell command to get the host IP address. Adjust the command according to your OS and network configuration.
                    // Note the use of double dollar signs ($$) to escape the dollar sign in the Groovy string.
                    env.HOST_IP = sh(script: "hostname -I | awk '{print \$1}'", returnStdout: true).trim()
                }
            }
        }

        stage('Ensure Traefik is Running') {
            steps {
                script {
                    // Execute a shell command to check if the Traefik container is running and start it if it isn't
                    sh '''
                    RUNNING=$(docker ps --filter "name=^/traefik$" --format "{{.Names}}")
                    if [ "$RUNNING" != "traefik" ]; then
                    echo "Starting Traefik container..."
                    docker rm traefik || true
                    docker run -d --name traefik \
                        --restart=unless-stopped \
                        -p 80:80 \
                        -p 8085:8080 \
                        -v /var/run/docker.sock:/var/run/docker.sock \
                        traefik:v2.5 \
                        --api.insecure=true \
                        --providers.docker \
                        --entrypoints.web.address=:80
                    else
                    echo "Traefik container is already running."
                    fi
                    '''
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
                    
                    // Run the Docker container with Traefik labels, using the dynamically obtained HOST_IP
                    // Note the change in how variables are handled within the command
                    sh """
                    docker run -d --restart=unless-stopped --name ${env.IMAGE_NAME} \\
                    -l traefik.enable=true \\
                    -l "traefik.http.routers.${env.IMAGE_NAME}.rule=Host(``192.168.1.52``) && PathPrefix(``test``)" \\
                    -l traefik.http.routers.${env.IMAGE_NAME}.entrypoints=web \\
                    -l traefik.http.services.${env.IMAGE_NAME}.loadbalancer.server.port=8080 \\
                    ${env.IMAGE_NAME}:${env.IMAGE_TAG}
                    """
                }
            }
        }
    }
}
