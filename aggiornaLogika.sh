node {
    stage('Stop and Restart JAR') {
        sh '''
#!/bin/bash

/home/daniele/aggiornaLogika.sh/var/lib/jenkins/workspace/logika/go.sh &
        '''
    }
}
