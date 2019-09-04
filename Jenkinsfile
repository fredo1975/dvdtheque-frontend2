pipeline {
    agent any
    environment {
    	def SERVER_IP = '192.168.1.102'
    }
    stages {
        stage('Deliver') {
            steps {
                sh 'echo stoping image dvdtheque-frontend on server "$SERVER_IP"'
                sh 'ssh jenkins@$SERVER_IP sudo docker stop dvdtheque-frontend'
                sh 'echo removing image dvdtheque-frontend on server "$SERVER_IP"'
                sh 'ssh jenkins@$SERVER_IP sudo docker rm dvdtheque-frontend'
                sh 'echo build dvdtheque-frontend on server "$SERVER_IP"'
                sh 'ssh jenkins@$SERVER_IP sudo docker build -t dvdtheque-frontend:prod .'
                sh 'echo run dvdtheque-frontend:prod on server "$SERVER_IP"'
                sh 'ssh jenkins@$SERVER_IP sudo docker run -d -p 80:80 dvdtheque-frontend:prod'
                sh 'echo check http://localhost/info on server "$SERVER_IP"'
                sh 'ssh jenkins@$SERVER_IP sudo http http://localhost/info'
            }
        }
    }
}