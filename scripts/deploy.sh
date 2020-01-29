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
    docker-compose build backend
    docker-compose push backend
}

function frontendDeploy() {
    docker-compose build frontend
    docker-compose push frontend
}

function sshCommand() {
    ssh vps "cd src/personal-website && git reset --hard && git pull origin master && docker-compose down && docker-compose pull && docker-compose up -d"
}


main "$@"; exit
