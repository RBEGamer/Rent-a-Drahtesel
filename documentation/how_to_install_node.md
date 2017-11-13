# INSTALLATION
Hier sind die wichtigsten Schritte um eine NodeJS zu installieren.
Natrülich muss dafür das Repo geklont sein


* 1. install latest stable nodejs version `https://nodejs.org/en/`
* 2. install nodemon extention `npm install -g nodemon`
* 3. goto the backend directory `cd swe_praktikum_ws1718/src/backend/`
* 4. run `npm install` to install the dependencies
* 5. to run the script run: `nodemon server.js`
* 6. goto `http://127.0.0.1:8080`


## NODEMON
Nodemon ist ein kleines tool welches den server automatisch neustartet wenn ihr etwas an einer Datei verändert.
Ausserdem werden zusätzliche debu Informationen in der Konsole ausgegeben (Callstack,...)
So könnt ihr direkt sehen was sich verändert hat. Im Normalbetrieb werden werden scripte per `node server.js` gestartet. 




## DATABSE
Die Datenbank wurde bereits angepasst (s. `config/database.js`) wer aber eine lokale installation hat (mit dem aktuellsten dump) muss seine logindaten in der `config/database.js` angeben.














####### OLD STUFF

install packages: `npm install`
edit the database configuration: `config/database.js`
create the database schema: `node scripts/create_database.js`
`node server.js`
browser at: `http://localhost:8080`

