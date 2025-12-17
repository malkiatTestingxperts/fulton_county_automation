pipeline {
  agent any

  tools {
    nodejs "Node22"
  }

  stages {

    stage('Install') {
      steps {
        bat 'node -v'
        bat 'npm ci'
        bat 'npx playwright install'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        bat 'npx playwright test --reporter=html --workers=1'
      }
    }

    stage('Serve Playwright Report') {
      steps {
        bat '''
          echo Starting Playwright HTML report server...
          start "" cmd /c "npx http-server playwright-report -p 9323"
        '''
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**/*',
                       allowEmptyArchive: true

      echo '====================================='
      echo 'Playwright Report URL:'
      echo 'http://localhost:9323'
      echo '====================================='
    }
  }
}
