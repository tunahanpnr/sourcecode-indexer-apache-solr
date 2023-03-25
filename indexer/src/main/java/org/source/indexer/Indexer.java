package org.source.indexer;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.common.SolrInputDocument;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;
import java.util.*;

import static org.source.indexer.config.Solr.getSolrCollectionClient;


public class Indexer {
    private final String codeDirPath;
    ArrayList<String> filePaths;


    public Indexer(String codeDirPath) {
        this.codeDirPath = codeDirPath;
        filePaths = new ArrayList<>();
    }


    public void start() {
        try {
            loadFiles(codeDirPath);
            indexCodeFiles();
        } catch (IOException exception) {
            System.out.printf(exception.toString());
        } catch (SolrServerException e) {
            throw new RuntimeException(e);
        }
    }

    private void loadFiles(String dirPath) throws IOException {
        File dir = new File(dirPath);
        File[] files = dir.listFiles();
        for (File file : files) {
            if (file.isFile()) {
                filePaths.add(file.getPath());
            } else if (file.isDirectory()) {
                loadFiles(file.getAbsolutePath());
            }
        }
    }

    private void indexCodeFiles() throws SolrServerException, IOException {
        SolrClient solrClient = getSolrCollectionClient();
        try {
            for (String filePath : filePaths) {
                File file = new File(filePath);

                String fileName = file.getName();
                String contentType = Files.probeContentType(file.toPath());
                String content = getFileContent(file);
                Map<String, String> metadata = getFileMetadata(file);

                SolrInputDocument doc = new SolrInputDocument();
                doc.addField("filename", fileName);
                doc.addField("content_type", contentType);
                doc.addField("content", content);
                for (Map.Entry<String, String> entry : metadata.entrySet()) {
                    doc.addField(entry.getKey(), entry.getValue());
                }

                solrClient.add(doc);
            }
        } finally {
            solrClient.commit();
            solrClient.close();
        }
    }

    private String getFileContent(File file) throws IOException {
        byte[] encoded = Files.readAllBytes(Paths.get(file.getAbsolutePath()));
        return new String(encoded, StandardCharsets.UTF_8);
    }

    private Map<String, String> getFileMetadata(File file) throws IOException {
        Map<String, String> metadata = new HashMap<>();
        Path path = file.toPath();
        BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);
        FileTime createdTime = attrs.creationTime();
        metadata.put("created_date", createdTime.toString());
        return metadata;
    }
}