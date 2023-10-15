
@echo off

start cmd /k "npm i"
start cmd /k "cd frontend & npm install --save react-credit-card-input styled-components easyinvoice --force "
start cmd /k "cd frontend & npm i & npm install --save react-credit-card-input styled-components easyinvoice --force "
start cmd /k "cd backend & npm i"