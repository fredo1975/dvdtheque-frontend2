node {
    label 'slave01'
    def app
    def PROD_SERVER_IP = "192.168.1.106"
	def DEV_SERVER_IP = "192.168.1.101"
    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("fredo1975/dvdtheque", "--build-arg arg=$APP_ENV .")
    }

    stage('Test image') {
        /* Ideally, we would run a test framework against our image.
         * For this example, we're using a Volkswagen-type approach ;-) */

        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("latest")
        }
    }
    stage('Remote stop container') {
		sh "echo APP_ENV=$APP_ENV"
        sh "echo DEV_SERVER_IP=$DEV_SERVER_IP"
		if("${APP_ENV}" == "dev"){
			sh "ssh jenkins@$DEV_SERVER_IP docker stop dvdtheque-frontend"
        }else if ("${APP_ENV}" == "production") {
			sh "ssh jenkins@$PROD_SERVER_IP docker stop dvdtheque-frontend"
		}
    }
    stage('remote remove container') {
        if("${APP_ENV}" == "dev"){
            sh "ssh jenkins@$DEV_SERVER_IP docker rm dvdtheque-frontend"
        }else if ("${APP_ENV}" == "production") {
			sh "ssh jenkins@$PROD_SERVER_IP docker rm dvdtheque-frontend"
		}
    }
    
    stage('docker login dockhub registry') {
        if("${APP_ENV}" == "dev"){
            sh "ssh jenkins@$DEV_SERVER_IP docker login -u fredo1975 -p docker1975 https://registry-1.docker.io/v2/"
            sh "ssh jenkins@$DEV_SERVER_IP docker pull fredo1975/dvdtheque:latest"
        }else if ("${APP_ENV}" == "production") {
			sh "ssh jenkins@$PROD_SERVER_IP docker login -u fredo1975 -p docker1975 https://registry-1.docker.io/v2/"
            sh "ssh jenkins@$PROD_SERVER_IP docker pull fredo1975/dvdtheque:latest"
		}
    }
    /*
    stage('docker pull to container') {
        if("${APP_ENV}" == "dev"){
            sh "ssh jenkins@$DEV_SERVER_IP docker pull fredo1975/dvdtheque:latest"
        }else if ("${APP_ENV}" == "prod") {
			sh "ssh jenkins@$PROD_SERVER_IP docker pull fredo1975/dvdtheque:latest"
		}
    }*/
    stage('docker run container') {
        if("${APP_ENV}" == "dev"){
            sh "ssh jenkins@$DEV_SERVER_IP docker run --name dvdtheque-frontend -d -p 80:80 fredo1975/dvdtheque:latest"
         }else if ("${APP_ENV}" == "production") {
			sh "ssh jenkins@$PROD_SERVER_IP docker run --name dvdtheque-frontend -d -p 80:80 fredo1975/dvdtheque:latest"
		}
    }
    stage('docker ps -a') {
         if("${APP_ENV}" == "dev"){
            sh "ssh jenkins@$DEV_SERVER_IP docker ps -a"
        }else if ("${APP_ENV}" == "production") {
			sh "ssh jenkins@$PROD_SERVER_IP docker ps -a"
		}
    }
}