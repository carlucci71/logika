node {
    stage('Stop and Restart JAR') {
        sh '''
#!/bin/bash

/home/daniele/aggiornaLogika.sh &
        '''
    }
}
