package org.source.indexer;


public class Main {
    public static void main(String[] args) {
        String codeDirPath = args[0];

        Indexer indexer = new Indexer(codeDirPath);
        indexer.start();
    }
}