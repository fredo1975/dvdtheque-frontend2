pipeline {
    agent { label 'slave01' }
    stages{
		stage('Clone repository') {
			steps {
				script {
					def app
					def PROD_SERVER_IP = "192.168.1.106"
					def DEV_SERVER_IP = "192.168.1.101"
					/* Let's make sure we have the repository cloned to our workspace */
					checkout scm
				}
			}
		}
		stage('Build image') {
			steps {
				script {
					/* This builds the actual image; synonymous to
					* docker build on the command line */
					def app
					app = docker.build("fredo1975/dvdtheque", "--build-arg arg=$APP_ENV .")
				}
			}
		}
    }
}
