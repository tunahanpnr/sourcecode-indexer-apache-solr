FROM solr:8.11.1

COPY ./solrconfig.xml /opt/solr/server/solr/configsets/_default/conf

CMD solr-create -c intellij_core
