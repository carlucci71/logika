node {
    stage('Stop and Restart JAR') {
        sh '''
#!/bin/bash

process_name="MainClassLogika"  
java_pid=$(jps | grep "$process_name" | awk '{print $1}')

if [ -z "$java_pid" ]; then
    echo "Nessun processo Java trovato con il nome: $process_name"
else
    echo "Terminazione del processo Java con PID: $java_pid"
    kill "$java_pid"
fi
/var/lib/jenkins/workspace/logika/go.sh &
        '''
    }
}
