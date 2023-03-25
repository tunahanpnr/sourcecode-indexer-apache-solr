package org.source.indexer.utils;

import org.jose4j.json.internal.json_simple.JSONArray;
import org.source.indexer.Indexer;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class ContentTypeExtractor {
    private Set<String> fileTypes = new HashSet<>();

    private void getFileTypesAsSet(String dirPath) {
        try {
            File dir = new File(dirPath);
            File[] files = dir.listFiles();
            for (File file : files) {
                if (file.isFile()) {
                    String contentType = Files.probeContentType(file.toPath());
                    fileTypes.add(contentType);
                } else if (file.isDirectory()) {
                    getFileTypesAsSet(file.getAbsolutePath());
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void exportContentTypesToJSON(String dirPath){
        getFileTypesAsSet(dirPath);
        JSONArray jarray = new JSONArray(fileTypes);
        try {
            FileWriter writer = new FileWriter(new File("./contentTypes.json"));
            writer.write(jarray.toString());
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        String codeDirPath = args[0];

        ContentTypeExtractor extractor = new ContentTypeExtractor();
        extractor.exportContentTypesToJSON(codeDirPath);
    }
}
