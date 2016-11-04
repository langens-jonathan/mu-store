#!/bin/bash

clear

echo 'starting store + manager'

drc up &

cd store-manager

./start-store-manager.sh &
