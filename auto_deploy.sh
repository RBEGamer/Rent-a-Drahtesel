# cd ~/
#DEL Repo
#sudo rm -R ./swe_praktikum_ws1718
#Clone the repo
sudo git clone https://ad717d8509aa0b78422ec2ef9c21b4cbf5a0f330@github.com/RBEGamer/swe_praktikum_ws1718.git
#Stop all processes
killall -s KILL node

#Move back and prepare to rename the Git Repo
cd ./swe_praktikum_ws1718/src/backend/
# sudo rm -r /opt/www
# sudo mv /opt/repo-api-server /opt/www

#Now start the app
sudo npm install
sudo node ./server.js &
