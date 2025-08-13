#!/bin/bash
cd /home/happy/chatxbuy-blog

git fetch origin

LOCAL_HASH=$(git rev-parse HEAD)
REMOTE_HASH=$(git rev-parse origin/main)

if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
    echo "New commits found. Pulling and rebuilding..."
    git checkout main
    git pull

    # update config
    cp public/admin/config.prod.yml public/admin/config.yml
    /usr/bin/docker-compose up --build -d
else
    echo "No update."
fi