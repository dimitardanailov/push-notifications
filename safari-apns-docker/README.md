Docker commands: 

Volumes: 

```bash
docker volume rm app_code_volume
```

Re - create configurations

```bash
docker-compose up -d --force-recreate --always-recreate-deps --build --remove-orphans --renew-anon-volumes
```

