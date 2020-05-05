git submodule update --init --recursive 
./devops/docker-compose.sh prod build  && ./devops/docker-compose.sh prod down  && ./devops/docker-compose.sh prod up -d