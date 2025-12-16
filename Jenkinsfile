pipeline {
  agent any
 
  tools {
    nodejs "Node22" // This must match the name you configured in "Manage Jenkins" → "Global Tool Configuration"
  }
 
  stages {
    stage('Install') {
      steps {
        bat 'node -v' // Just to verify Node version in Jenkins console
        bat 'npm ci'
        bat 'npx playwright install'
      }
    }
 
    stage('Test') {
      steps {
        bat 'npm run test --workers=1'
      }
    }
  }
 
  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
      publishHTML(target: [
        reportName: 'Playwright Report',
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: false,
        allowScript: true
      ])
    }
  }
}
