#!/bin/bash

# Trova il PID del processo Java utilizzando jps e filtra per il nome del processo
process_name="MainClassLogika"  # Sostituisci con il nome del tuo processo Java
java_pid=$(jps | grep "$process_name" | awk '{print $1}')

if [ -z "$java_pid" ]; then
    echo "Nessun processo Java trovato con il nome: $process_name"
else
    echo "Terminazione del processo Java con PID: $java_pid"
    kill "$java_pid"
fi
cd githubrepository/logika/
git pull
sh lancia.sh
