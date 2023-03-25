package org.source.indexer;

import java.io.File;
import java.io.IOException;
import java.util.*;



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
        } catch (IOException exception) {
            System.out.printf(exception.toString());
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


}