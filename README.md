[![Build Status](https://travis-ci.org/eHealthAfrica/ebola-call-center-search.svg?branch=sprintly%2Fitem%2F724)](https://travis-ci.org/eHealthAfrica/ebola-call-center-search)

## Indexing issues with version 0.0.5: use version 0.1.1

**SE** = search engine, in our case **Lucene**

Version 0.0.5 fails with strings that have to be indexed as NGrams and are > 2000 chars.
This version fixes the problem since it is using Lucene Ngram Tokenizer implementation.
If you have version 0.0.5 running and present following problems:
- The index is not indexing anymore, i.e. there is a delay btw. the update sequence in couchdb and the update sequence in the SE, and new changes are not indexed.
- The java process is not there anymore (not present in display via command `top`, or `ps -ef | grep java`,  or `sudo service couchdb-lucene restart` complaining about a missing pid)

Use the release **v0.1.1**:
- Deploy the new index following the normal instructions.
- when the new index has finished indexing:
    - Ask for a new frontend release with the right version number.
    - If the change is urgent, when the new index has finished indexing, update the search version at this point in the front end code https://github.com/eHealthAfrica/sl-ebola-call-admin/blob/develop/app/scripts/services/lucene-query-factory.js#L128.

Removing the old index:
Once the SE is back to work and you want to remove the old index:
- remove the indexing couchDB document:  `_design/search:old_version`
- trigger a **SE** cleanup using the _cleanup endpoint: `curl -XPOST "http://user:password@host[:port]/db_name/_fti/_cleanup`

ebola-call-center-search
========================

Search implementation for the Ebola Call Center Application.
This project is used by call centers in Sierra Leona, Liberia and Guinea.
Since those countries have different location data codes, we have build and test tasks
for each one of the countries to handle this data difference.

The source of this location data is: https://github.com/eHealthAfrica/locations

The project uses the following tools:

- We use the [CouchDB-Lucene plugin](https://github.com/rnewson/couchdb-lucene) to enable full-text searching of CouchDB documents using Lucene.
- [couchapp]( https://github.com/couchapp/couchapp) for managing the views


use the following command to see the available tasks:

```shell
grunt --help
```

### Test

```shell
grunt test:[gin|sl|lr]
```

### Deploy

Build is country dependant

```shell
grunt build:[gin|sl|lr]
```

Upload the search document to the couchDB instance
from the root of the project using couchapp:

```shell
cd couch/search && couchapp push "protocol://host:port/db_name"
```

### Bumping version

Whenever we consider the version number should change we use the task:

```shell
grunt bump
```

it will add the version number tag, add the version inline in the following files and commit them:
- npm package `package.json`
- index functions `couch/search/fulltext/all/index.js`
- couchdb document id (i.e.) `couch/search/_id`

This allows to decouple frontend from backend. We are able to
index a new index with breaking changes without breaking the frontend.
Then frontend has to be updated once the new index is ready.
