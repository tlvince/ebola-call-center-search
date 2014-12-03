[![Build Status](https://travis-ci.org/eHealthAfrica/ebola-call-center-search.svg?branch=sprintly%2Fitem%2F724)](https://travis-ci.org/eHealthAfrica/ebola-call-center-search)

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


### Location management

There is a normalized version for location keys which has the following structure

        {
            "patient": {
                "chiefdomCode": "undefined",
                "districtCode": "undefined",
                "provinceCode": "undefined"
            },
            "contact": {
                "chiefdom_code": "undefined",
                "district_code": "undefined",
                "province_code": "undefined"
            },
            "response": {
                "chiefdomCode": "undefined",
                "districtCode": "undefined",
                "provinceCode": "undefined"
            }
        }


        {
            "patient": {
                "chiefdomCode": "undefined",
                "districtCode": "undefined",
                "provinceCode": "undefined"
            },
            "contact": {
                "chiefdom_code": "undefined",
                "district_code": "undefined",
                "province_code": "undefined"
            },
            "response": {
                "chiefdomCode": "undefined",
                "districtCode": "undefined",
                "provinceCode": "undefined"
            }
        }
        {
            "patient": {
                "chiefdomCode": "undefined",
                "districtCode": "undefined",
                "provinceCode": "undefined"
            },
            "contact": {
                "chiefdom_code": "undefined",
                "district_code": "undefined",
                "province_code": "undefined"
            },
            "response": {
                "chiefdomCode": "undefined",
                "districtCode": "undefined",
                "provinceCode": "undefined"
            }
        }


