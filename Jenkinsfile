pipeline {
    agent any
    
    tools{
        maven "MAVEN"
    }

    stages {
	
		stage("Checkout code"){
			steps
			{
				checkout([$class: 'GitSCM', branches: [[name: '*/Assignment']], extensions: [], userRemoteConfigs: [[credentialsId: 'c9f74676-365b-448d-9887-e5939d5fc504', url: 'https://git.nagarro.com/GITG00641/Java/priyanand-shukla.git']]])
				echo 'Check Out'
			}
        }
        stage('Clean') {
            steps {
                bat 'mvn -f Week_9_Assignment/pom.xml clean'
                echo 'Cleaning..'
            }
        }
        stage('Compile') {
            steps {
                bat 'mvn -f Week_9_Assignment/pom.xml compile'
                echo 'Compiling..'
            }
        }
        stage('Test') {
            steps {
                bat 'mvn -f Week_9_Assignment/pom.xml test'
                echo 'Testing..'
            }
        }
        stage('Packaging') {
            steps {
                bat 'mvn -f Week_9_Assignment/pom.xml package'
                echo 'Packageing..'
            }
        }
        stage('Install') {
            steps {
                bat 'mvn -f Week_9_Assignment/pom.xml install'
                echo 'Installing..'
            }
        }
        
      
    }
}
