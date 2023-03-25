package org.source.indexer.config;

import org.apache.solr.client.solrj.impl.HttpSolrClient;


public class Solr {
    private static final String SOLR_COLLECTION_URL = "http://localhost:8983/solr/intellij_core";

    public static HttpSolrClient getSolrCollectionClient() {
        return new HttpSolrClient.Builder(SOLR_COLLECTION_URL).build();
    }
}
