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

    stage('Test') {
      steps {
        // Ensure HTML report is generated
        bat 'npx playwright test --reporter=html --workers=1'
      }
    }
  }

  post {
    always {
      // Do NOT fail build if report folder is missing
      archiveArtifacts artifacts: 'playwright-report/**/*',
                       fingerprint: true,
                       allowEmptyArchive: true

      publishHTML(target: [
        reportName: 'Playwright Report',
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: true,
        allowScript: true
      ])
    }
  }
}
