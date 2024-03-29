pipeline {
	environment {
		PROD_SERVER_IP = "192.168.1.106"
		DEV_SERVER_IP = "192.168.1.100"
		/*GIT_COMMIT_SHORT = sh(
                script: "printf \$(git rev-parse --short HEAD)",
                returnStdout: true
        )*/
		GIT_REVISION = getGitRevision()
		GIT_BRANCH_NAME = getGitBranchName()
		
	}
    //agent { label 'slave01' }
	agent any
    stages{
		stage ('Initialize') {
            steps {
                sh '''
                    echo "PROD_SERVER_IP = ${PROD_SERVER_IP}"
                    echo "DEV_SERVER_IP = ${DEV_SERVER_IP}"
                    echo "GIT_REVISION = ${GIT_REVISION}"
					echo "GIT_BRANCH_NAME = ${GIT_BRANCH_NAME}"
                '''
                sh 'env'
            }
        }
		stage('Clone repository') {
			steps {
				script {
					/* Let's make sure we have the repository cloned to our workspace */
					checkout scm
				}
			}
		}
		stage('Build for development') {
			when {
                branch 'develop'
            }
			steps {
				script {
					sh "npm install --save-dev @angular-devkit/build-angular"
					sh "ng build -c=dev --verbose"
				}
			}
		}
		stage('Build for production') {
			when {
                branch 'master'
            }
			steps {
				script {
					ARTIFACT_VERSION = getArtifactVersion(GIT_BRANCH_NAME,GIT_REVISION)
					sh "npm install --save-dev @angular-devkit/build-angular"
					sh "ng build -c=production --verbose"
				}
			}
		}
		stage('Copying binaries to development') {
			when {
                branch 'develop'
            }
			steps {
				script {
					sh "ssh jenkins@$DEV_SERVER_IP rm -rf /var/www/dvdtheque-frontend/*"
					sh "scp -r dist/dvdtheque-frontend/* jenkins@$DEV_SERVER_IP:/var/www/dvdtheque-frontend"
				}
			}
		}
		stage('Copying binaries to production') {
			when {
                branch 'master'
            }
			steps {
				script {
					sh "echo PROD_SERVER_IP=$PROD_SERVER_IP"
					sh "ssh jenkins@$PROD_SERVER_IP rm -rf /var/www/dvdtheque-frontend/*"
					sh "scp -r dist/dvdtheque-frontend/* jenkins@$PROD_SERVER_IP:/var/www/dvdtheque-frontend"
				}
			}
		}
    }
}

private String getGitRevision(){
	def gitRevision
	gitRevision = sh script: "git rev-parse --short HEAD", returnStdout: true
	gitRevision.trim()
}

private String getGitBranchName(){
	def gitBranchName
	gitBranchName = env.BRANCH_NAME
	gitBranchName.trim()
}

private String getArtifactVersion(String gitBranchName,String gitRevision){
	if(gitBranchName == "develop"){
		return "develop-${gitRevision}-SNAPSHOT"
	}
	if(gitBranchName == "master"){
		gitTagName = sh script: "git describe --tags --all ${gitRevision}", returnStdout: true
	}
	return ""
}