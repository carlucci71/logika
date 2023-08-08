// Comando Bash da eseguire
def bashCommand = "bash /home/daniele/githubrepository/logika/lancia.sh"

// Esecuzione del comando Bash
def process = bashCommand.execute()
process.waitFor()

// Lettura dell'output del comando
def output = process.in.text
def error = process.err.text

// Elaborazione dell'output
if (process.exitValue() == 0) {
    println "Comando Bash eseguito con successo:"
    println output
} else {
    println "Errore durante l'esecuzione del comando Bash:"
    println error
}
