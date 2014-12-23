# Change Log

All notable changes to this project will be documented in this
file. This file is structured according to http://keepachangelog.com/

- - -
## [0.1.1] - 2014-12-19
### Fixed
- Lucene hangs with 'out of of memory' when a field with > 2000 characters that was tokenized using Ngrams
  is indexed.
### Removed
- Ngram tokenizer from mapping
### Added
- Couchdb-Lucene query parameter to trigger Lucene's NGram Tokenizer
