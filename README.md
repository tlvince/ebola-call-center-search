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
grunt test:[gin|sl|lr]
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

upload the search document to the couchDB instance
from the root of the project using couchapp:

```shell
cd couch/search && couchapp push "protocol://host:port/db_name"
```

### Bumping version
Using the task

```shell
grunt bump
```

We add the version number tag and commit the following files:
- package.json
- index functions
- couchdb document id

This allows to decouple frontend from backend and being able to
index a new index with breaking changes without breaking the frontend.
Then frontend has to be updated once the new index is ready.
