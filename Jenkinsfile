pipeline {
    agent { label 'slave01' }
  
    stages{
      
		stage('Clone repository') {
			steps {
        
				/* Let's make sure we have the repository cloned to our workspace */
				checkout scm
			}
		}
    }
}
