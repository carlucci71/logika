// Trova il PID del processo Java utilizzando jps e filtra per il nome del processo
def processName = "MainClassLogika" // Sostituisci con il nome del tuo processo Java
def processList = new ProcessBuilder("jps").redirectErrorStream(true).start()
def reader = new BufferedReader(new InputStreamReader(processList.getInputStream()))
def javaPid = reader.lines().collect { line ->
    if (line.contains(processName)) {
        line.split()[0]
    }
}.find()

if (!javaPid) {
    println "Nessun processo Java trovato con il nome: $processName"
} else {
    println "Terminazione del processo Java con PID: $javaPid"
    def processKill = new ProcessBuilder("kill", javaPid).redirectErrorStream(true).start()
    def killReader = new BufferedReader(new InputStreamReader(processKill.getInputStream()))
    killReader.lines().forEach { println it }
    processKill.waitFor()
}

def gitDir = new File("/home/daniele/githubrepository/logika/")
if (gitDir.exists()) {
    def gitPull = new ProcessBuilder("git", "pull").directory(gitDir).redirectErrorStream(true).start()
    def pullReader = new BufferedReader(new InputStreamReader(gitPull.getInputStream()))
    pullReader.lines().forEach { println it }
    gitPull.waitFor()

    def launchScript = new ProcessBuilder("sh", "lancia.sh").directory(gitDir).redirectErrorStream(true).start()
    def launchReader = new BufferedReader(new InputStreamReader(launchScript.getInputStream()))
    launchReader.lines().forEach { println it }
    launchScript.waitFor()
} else {
    println "La directory git non esiste: ${/home/daniele/githubrepository/logika/}"
}
