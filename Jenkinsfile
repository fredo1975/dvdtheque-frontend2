pipeline {
    agent { dockerfile true }
    stages {
        stage('Stop image') {
            steps {
                sh 'docker stop dvdtheque-frontend'
            }
        }
        stage('Remove image') {
            steps {
                sh 'docker rm dvdtheque-frontend'
            }
        }
        stage('Build image') {
            steps {
                sh 'docker build -t dvdtheque-frontend:prod .'
            }
        }
        stage('Run image') {
            steps {
                sh 'docker run --name dvdtheque-frontend -d -p 80:80 dvdtheque-frontend:prod'
            }
        }
    }
}