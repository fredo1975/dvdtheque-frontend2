pipeline {
    agent any
    environment {
    	def SERVER_IP = '192.168.1.102'
    }
    stages {
        stage('Deliver') {
            steps {
                sh 'echo \'stoping image ...\''
                sh 'ssh jenkins@$SERVER_IP sudo docker stop gallant_franklin'
                sh 'echo \'removing image ...\''
                sh 'ssh jenkins@$SERVER_IP sudo docker rm gallant_franklin'
                sh 'echo \'build dvdtheque-frontend:prod ...\''
                sh 'ssh jenkins@$SERVER_IP sudo docker build -t dvdtheque-frontend:prod .'
                sh 'echo \'run dvdtheque-frontend:prod ...\''
                sh 'ssh jenkins@$SERVER_IP sudo docker run -d -p 80:80 dvdtheque-frontend:prod'
                sh 'echo \'check http://localhost/info...\''
                sh 'ssh jenkins@$SERVER_IP sudo http http://localhost/info'
            }
        }
    }
}