var assert = require('assert');
var tokenizer = require('../couch/search/vendor/tokenizer/ngram').tokenizer;
var join = function(x) { return x.join(','); };

describe('allNGram', function() {
  it('generates ngram', function() {
    var nGram2 = tokenizer.nGram("hallo", 2);
    assert.equal(join(nGram2), join(['ha', 'al', 'll', 'lo']), JSON.stringify(nGram2));
  });

  it('generates all ngrams bigger than 1', function() {
    var nGram2 = tokenizer.allNGram("hallo", 2);
    assert.equal(join(nGram2), join(["ha", "al", "ll", "lo", "hal", "all", "llo", "hall", "allo", "hallo"]), JSON.stringify(nGram2));
  });
  it('generates all ngrams bigger than 1', function() {
    var nGram2 = tokenizer.allNGram("hallo", 3, 3);
    assert.equal(join(nGram2), join(["hal", "all", "llo"]), JSON.stringify(nGram2));
  });
  it('generates all ngrams bigger than 1', function() {
    var nGram2 = tokenizer.allNGram("hallo", 3, 4);
    assert.equal(join(nGram2), join(["hal", "all", "llo", "hall", "allo"]), JSON.stringify(nGram2));
  });
});

describe('allNGramPhrase', function() {
  it('ngrams words in a phrase', function() {
    var nGram2 = tokenizer.allNGramPhrase("hallo done", 3, 5);
    var res =  ["hal","all","llo","hall","allo","hallo","don","one","done","done"];
    assert.equal(join(nGram2), join(res), JSON.stringify(nGram2));
  });
  it('ngrams words in a phrase', function() {
    var res = ["hal","all","llo","hall","allo","hallo"];
    var nGram2 = tokenizer.allNGramPhrase("hallo", 3);
    assert.equal(join(nGram2), join(res), JSON.stringify(nGram2));
  });
});
