pipeline {
	environment {
		PROD_SERVER_IP = "192.168.1.106"
		DEV_SERVER_IP = "192.168.1.100"
	}
    agent { label 'slave01' }
    stages{
		stage('Clone repository') {
			steps {
				script {
					/* Let's make sure we have the repository cloned to our workspace */
					checkout scm
				}
			}
		}
		stage('Build') {
			steps {
				script {
					if("${APP_ENV}" == "dev"){
						sh "ng update"
						sh "ng build -c=dev --verbose"
					}else if ("${APP_ENV}" == "production") {
						sh "ng build -c=production --verbose"
					}
				}
			}
		}
		stage('Copying binaries') {
			steps {
				script {
					sh "echo APP_ENV=$APP_ENV"
					sh "echo DEV_SERVER_IP=$DEV_SERVER_IP"
					if("${APP_ENV}" == "dev"){
						sh "ssh jenkins@$DEV_SERVER_IP sudo rm -rf dvdtheque-frontend/"
						sh "ssh jenkins@$DEV_SERVER_IP sudo cp -r dvdtheque-frontend/* /var/www/dvdtheque-frontend/"
					}else if ("${APP_ENV}" == "production") {
						sh "ssh jenkins@$PROD_SERVER_IP sudo rm -rf dvdtheque-frontend/"
						sh "ssh jenkins@$PROD_SERVER_IP sudo cp -r dvdtheque-frontend/* /var/www/dvdtheque-frontend/"
					}
				}
			}
		}
		stage('remote stop nginx') {
			steps {
				script {
					if("${APP_ENV}" == "dev"){
						sh "ssh jenkins@$DEV_SERVER_IP sudo systemctl stop nginx.service"
					}else if ("${APP_ENV}" == "production") {
						sh "ssh jenkins@$PROD_SERVER_IP sudo systemctl stop nginx.service"
					}
				}
			}
		}
		stage('remote start nginx') {
			steps {
				script {
					if("${APP_ENV}" == "dev"){
						sh "ssh jenkins@$DEV_SERVER_IP sudo systemctl start nginx.service"
					}else if ("${APP_ENV}" == "production") {
						sh "ssh jenkins@$PROD_SERVER_IP sudo systemctl start nginx.service"
					}
				}
			}
		}
    }
}
