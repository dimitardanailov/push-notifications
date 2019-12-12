# Shutdown current container setup
docker-compose down

# Delete volume
docker volume rm app_code_volume

# Re - create containers
docker-compose up -d --force-recreate --always-recreate-deps --build --remove-orphans --renew-anon-volumes