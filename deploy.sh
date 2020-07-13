#!/bin/bash

if [ $# -eq 0 ]; then
    echo 'Please specify the deploy environment';
elif [ $1 == "staging" ]; then
    user="root"
    host="upgrade-sale-truck-month-2020-1-staging.shiftone.io"
    ssh_port="22"
    remote_path="/srv/upgrade-sale-truck-month-2020-1-staging"
    error="Error. Please make sure you've indicated correct parameters"
fi

echo "Deploying on $1"

ssh -p${ssh_port} ${user}@${host} << EOF
    cd ${remote_path}
    git reset --hard && git pull --rebase origin master --force
    docker-compose up --build --remove-orphans -d
EOF
