ebola-call-center-search
========================

search implementation for the Ebola Call Center Application


The project uses the following projects:

- We use the [CouchDB-Lucene plugin](https://github.com/rnewson/couchdb-lucene) to enable full-text searching of CouchDB documents using Lucene.
- [couchapp]( https://github.com/couchapp/couchapp) for managing the views



### Deploy

Build is country dependant

```shell
grunt build:[gin|sl|lr]
```

upload the search document to the couchDB instance


###  Todo

- remove the generated data.js file after build
- use Francesco end to end test
- integrate couchdb view uploading with grunt

