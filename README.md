# Source Code Indexer and Viewer

Source codes are indexer applications using Solr and Java. Also, indexed data can be searched via using Elastic Search-UI with custom implementation for Solr.


## Installation Local

### Indexing part
Install Java on your system. Details can be found [here](https://www.java.com/en/download/help/download_options.html).

Install Apache Solr on your system, run it, and create a new core called intellij_core. Details can be found [here]('https://solr.apache.org/guide/8_11/installing-solr.html').

Install maven on your system. Details can be found [here]('https://maven.apache.org/install.html').

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

First, install node js from [here]('https://nodejs.org/en/download'), and yarn from [here]('https://classic.yarnpkg.com/lang/en/docs/install').
 
Then, under the "search-ui" directory, run these commands.
```bash
yarn install
yarn start
```


```bash
git clone https://github.com/tunahanpnr/sourcecode-indexer-apache-solr
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


## Installation via Docker
Install docker and docker-compose. [docker](https://docs.docker.com/engine/install/) [docker-compose](https://docs.docker.com/compose/install/)
 
 
Than simply run
 ```bash
docker-compose up -d
```
If you want to run Solr with HDD index, just delete the COPY part from solr/Dockerfile.


## Load Indexed Core
After the running application, you can load your dump data.
Just run the dump.sh script with these steps:
 ```bash
chmod +x dump.sh
./dump.sh
```

