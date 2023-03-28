# Source Code Indexer and Viewer

Source codes are indexer applications using Solr and Java. Also, indexed data can be searched via using Elastic Search-UI with custom implementation for Solr.


## Installation Locally

### Indexing part
Install Java on your system. Details can be found [here](https://www.java.com/en/download/help/download_options.html).

Install Apache Solr on your system, run it, and create a new core called intellij_core. Details can be found [here](https://solr.apache.org/guide/8_11/installing-solr.html).

If you want to run solr with RAM index, you have to change your solrConfig.xml file with solr/solrConfig.xml which is in this repo.

Install maven on your system. Details can be found [here](https://maven.apache.org/install.html).

Download or clone the source code.

First, run the indexer one time for indexing the source codes. Go under the indexer directory in the cloned repo, and run these commands (replace <path> with your source code path that will be indexed). This takes a while based on the source code size you chose.

```bash
mvn package
java -jar target/indexer-1-jar-with-dependencies.jar <path to source codes>
```
Now, source codes are indexed to Solr. You can check it with this link if you are working on localhost.
```bash
http://localhost:8983/solr/#/intellij_core/core-overview
```

### Search-UI
Also, you can run the Elastic Search-UI implementation for Solr.

First, install node js from [here](https://nodejs.org/en/download), and yarn from [here](https://classic.yarnpkg.com/lang/en/docs/install).

Warning: Change the proxy in the package.json. Replace http://solr:8983/ with http://localhost:8983/ to work without docker.

Then, under the "search-ui" directory, run these commands.
```bash
yarn install
yarn start
```

```bash
git clone https://github.com/tunahanpnr/sourcecode-indexer-apache-solr
```


## Installation via Docker
Install docker and docker-compose. [docker](https://docs.docker.com/engine/install/) [docker-compose](https://docs.docker.com/compose/install/)
 
 
Than simply run
 ```bash
docker-compose up -d
```
If you want to run Solr with HDD index, just delete this part from solr/Dockerfile:
```bash
COPY ./solrconfig.xml /opt/solr/server/solr/configsets/_default/conf
```

If you don't want to run indexer, just delete the indexer part from docker-compose.

If you want to add more repo to index, you have to write these to indexer/Dockerfile. It is just indexing maven repo for now (because others have much bigger sizes, and it slows the process if you just want to try).

## Load Indexed Core
After the running application, you can load your dump data.

You have to add your dump.csv data under the same directory with dump.sh.
 
Then, Just run the dump.sh script with these steps:
 
 ```bash
chmod +x dump.sh
./dump.sh
```
 
You can find mine dump.csv [here](https://drive.google.com/file/d/1vhhEVfxIAbpIkU6SKn5thc2-Gayb4sO7/view?usp=sharing)

It includes more than 100k sourcecode files. The repos I used for this data are intellij-community, junit4, kotlin, and maven.

## Further Developments
Make search-ui better. (It only searches for context of the files for now)

Add search-ui to auto-complete.

Seperate all the configs for different situations. (ram-hdd index, different dockerfiles and docker-compose files, etc.)
 
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
