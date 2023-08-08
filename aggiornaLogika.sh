node {
    stage('Stop and Restart JAR') {
        sh '''
        #!/bin/bash
		process_name="MainClassLogika"
		java_pid=$(jps | grep "$process_name" | awk '{print $1}')
        kill "$java_pid"
        mvn spring-boot:run &
        '''
    }
}
