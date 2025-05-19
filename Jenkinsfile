pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "product_catalog_ci"
    COMPOSE_FILE = "docker-compose.yml"
  }

  stages {
    stage('Clean Up Old Containers') {
      steps {
        dir('.') {
          sh 'docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE down || true'
        }
      }
    }

    stage('Build and Run Containers') {
      steps {
        dir('.') {
          sh 'docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE up --build -d'
        }
      }
    }

    stage('Check Running Containers') {
      steps {
        sh 'docker ps'
      }
    }
  }

  post {
    always {
      echo "Pipeline finished."
      sh 'docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE ps'
    }
  }
}
