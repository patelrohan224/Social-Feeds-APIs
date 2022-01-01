#!/bin/bash

# Install node 10 default
. $HOME/.nvm/nvm.sh
nvm install 10.24.1

# MySQL Setup
sudo install-packages mysql-server
sudo mkdir -p /var/run/mysqld /var/log/mysql
sudo chown -R gitpod:gitpod /etc/mysql /var/run/mysqld /var/log/mysql /var/lib/mysql /var/lib/mysql-files /var/lib/mysql-keyring /var/lib/mysql-upgrade
wget -qOmysqld.cnf https://codejudge-starter-repo-artifacts.s3.ap-south-1.amazonaws.com/backend-project/gitpod/mysqld.cnf 
sudo mv mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf 
wget -qOclient.cnf https://codejudge-starter-repo-artifacts.s3.ap-south-1.amazonaws.com/backend-project/gitpod/client.cnf 
sudo mv client.cnf /etc/mysql/mysql.conf.d/ 
wget -qOmysql-bashrc-launch.sh https://codejudge-starter-repo-artifacts.s3.ap-south-1.amazonaws.com/backend-project/gitpod/mysql-bashrc-launch.sh 
chmod 0755 mysql-bashrc-launch.sh
sudo mv mysql-bashrc-launch.sh /etc/mysql/mysql-bashrc-launch.sh 
. "/etc/mysql/mysql-bashrc-launch.sh"
sudo mysql -e "ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY 'admin'"
sudo mysql -u root --password=admin -e "create database db"

# MongoDB Setup
sudo mkdir -p /data/db
sudo chown -R $USER:$USER /data/db
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
# BIND TO ALL ADAPTERS IN CONTAINER
sudo sed -i "s,\\(^[[:blank:]]*bindIp:\\) .*,\\1 0.0.0.0," /etc/mongod.conf
sudo /usr/bin/mongod --port 27017 --dbpath /data/db >/dev/null 2>&1 &
ps aux | grep mongo
sleep 5
wget https://codejudge-starter-repo-artifacts.s3.ap-south-1.amazonaws.com/backend-project/database/mongo-database.js
mongo < mongo-database.js
rm -rf mongo-database.js