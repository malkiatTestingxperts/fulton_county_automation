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
                // Run Playwright tests with HTML report
                bat 'npx playwright test --reporter=html --workers=1'
            }
        }

        stage('Open Report') {
            when {
                expression { return isUnix() == false } // Only for Windows agents
            }
            steps {
                // Open report in default browser
                bat 'npx playwright show-report'
            }
        }
    }

    post {
        always {
            // Archive artifacts safely
            archiveArtifacts artifacts: 'playwright-report/**/*',
                             fingerprint: true,
                             allowEmptyArchive: true

            // Publish HTML report in Jenkins (preview)
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
