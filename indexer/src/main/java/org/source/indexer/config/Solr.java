package org.source.indexer.config;

import org.apache.solr.client.solrj.impl.HttpSolrClient;


public class Solr {
    private static final String SOLR_COLLECTION_URL = getSolrCollectionUrl();

    private static String getSolrCollectionUrl() {
        String solrCollectionUrl = System.getenv("SOLR_COLLECTION_URL");
        if (solrCollectionUrl == null) {
            solrCollectionUrl = "http://localhost:8983/solr/intellij_core";
        }
        return solrCollectionUrl;
    }
    public static HttpSolrClient getSolrCollectionClient() {
        return new HttpSolrClient.Builder(SOLR_COLLECTION_URL).build();
    }
}
