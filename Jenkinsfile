pipeline {
    agent { dockerfile true }
    environment {
    	def SERVER_IP = '192.168.1.102'
    }
    stages {
        
        
        stage('Build image') {
            steps {
                sh 'docker -v $(which docker):/usr/bin/docker build -t dvdtheque-frontend:prod .'
            }
        }
        stage('Login to docker') {
            steps {
                sh 'docker login -u fredo1975 -p fredo1975;0108'
            }
        }
        stage('Tag image') {
            steps {
                sh 'docker tag image fredo1975/dvdtheque:prod'
            }
        }
        stage('Publish image') {
            steps {
                sh 'docker push fredo1975/dvdtheque:prod'
            }
        }
        stage('Run image') {
            steps {
                sh 'ssh jenkins@$SERVER_IP docker run -d -p 80:80 fredo1975/dvdtheque:prod'
            }
        }
    }
}