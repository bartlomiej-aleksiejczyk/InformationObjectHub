pipeline {
    agent any

    environment {
        IMAGE_NAME = "${JOB_NAME}".toLowerCase().replaceAll(/[^a-z0-9._-]/, '-')
        IMAGE_TAG = 'latest'
        SPRING_DB_PROD_URL = "${env.SPRING_DB_PROD_URL}"
        NETWORK_NAME = "${env.STANDARD_TRAEFIK_DOCKER_NETWORK}"
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
            echo SPRING_DB_PROD_URL
            sh "docker stop ${env.IMAGE_NAME} || true"
            sh "docker rm ${env.IMAGE_NAME} || true"
            withCredentials([usernamePassword(credentialsId: 'database-config', passwordVariable: 'DB_PASSWORD', usernameVariable: 'DB_USERNAME')]) {
                sh '''
                # Use environment variables directly without Groovy interpolation
                docker build -t $IMAGE_NAME:$IMAGE_TAG --build-arg DB_USERNAME=$DB_USERNAME --build-arg DB_PASSWORD=$DB_PASSWORD --build-arg SPRING_DB_PROD_URL=$SPRING_DB_PROD_URL .
                '''            
            }
        }
    }
}


        stage('Get Host IP') {
            steps {
                script {
                    env.HOST_IP = sh(script: "hostname -I | awk '{print \$1}'", returnStdout: true).trim()
                }
            }
        }

        stage('Ensure Traefik is Running') {
            steps {
                ensureTraefik()
            }
        }

        stage('Deploy') {
            steps {
                script {
                    withCredentials([
                        usernamePassword(credentialsId: 'database-config', passwordVariable: 'DB_PASSWORD', usernameVariable: 'DB_USERNAME')
                    ]) {
                        sh '''
                        docker run -d --restart=unless-stopped --name $IMAGE_NAME --network="$NETWORK_NAME" \
                        -e DB_USERNAME="$DB_USERNAME" -e DB_PASSWORD="$DB_PASSWORD" -e SPRING_DB_PROD_URL="$SPRING_DB_PROD_URL" -e IMAGE_NAME="$IMAGE_NAME"\
                        -l traefik.enable=true \
                        -l "traefik.http.routers.$IMAGE_NAME.rule=Host(\\`$HOST_IP\\`) && PathPrefix(\\`/$IMAGE_NAME\\`)" \
                        -l traefik.http.services.$IMAGE_NAME.loadbalancer.server.port=8080 \
                        $IMAGE_NAME:$IMAGE_TAG
                        '''
                    }
                }
            }
        }
    }

    
}
