#!/bin/bash

clear

echo 'starting store'

ember serve --proxy http://localhost:8888 --port 8889
