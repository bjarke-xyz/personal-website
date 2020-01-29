#/usr/bin/env bash

function main() {
    case "$1" in
        "dev")
            dockercomposeDEV "${@:2}"
            ;;
        "prod")
            dockercomposePROD "${@:2}"
            ;;
        *)
            echo "No service specified"
            ;;
    esac
}

function dockercomposeDEV() {
    docker-compose -f docker-compose-dev.yml -f docker-compose-prod.yml "$@"
}

function dockercomposePROD() {
    docker-compose -f docker-compose-prod.yml "$@"
}

main "$@"; exit