#!/bin/bash

curl 'http://localhost:8983/solr/intellij_core/update?commit=true' -H 'Content-type:application/csv' --data-binary @dump.csv

