#!/usr/bin/env bash
function main() {
    case "$1" in
        "backend")
            backendDeploy
            sshCommand
            ;;
        "frontend")
            frontendDeploy
            sshCommand
            ;;
        "all")
            frontendDeploy
            backendDeploy
            sshCommand
            ;;
        *)
            echo "No service specified"
            ;;
    esac
}

function backendDeploy() {
    ./scripts/docker-compose.sh prod build backend
    ./scripts/docker-compose.sh prod push backend
}

function frontendDeploy() {
    ./scripts/docker-compose.sh prod build frontend
    ./scripts/docker-compose.sh prod push frontend
}

function sshCommand() {
    ssh vps "cd src/personal-website && git reset --hard && git pull origin master && ./scripts/docker-compose.sh prod down && ./scripts/docker-compose.sh prod pull && ./scripts/docker-compose.sh prod up -d"
}


main "$@"; exit
