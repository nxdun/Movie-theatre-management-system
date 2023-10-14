
@echo off

start cmd /k "npm i"
start cmd /k "cd frontend & npm install --save react-credit-card-input styled-components easyinvoice --force &  npm i "
start cmd /k "cd backend & npm i"