var tokenizer = {

  //extract ngrams for a string
  nGram: function (string,n) {
    var buf=[];
    if (string.length<=n){
      buf.push(string);
      return buf;
    }
    for( var i=0; i <= string.length - n; i++) {
      buf.push(string.substr(i,n));
    }
    return buf;
  },

  //extract ngrams for a words with min and max ngram
  allNGram: function(string, min, max) {
    if (!max) {
      max = string.length;
    }
    var all = [];
    for( var i=min; i <= max; i++) {
      all = all.concat(this.nGram(string, i));
    }
    return all;
  },

  //extract ngrams from words in sentece with min and max ngram
  allNGramPhrase: function(string, minGram, maxGram) {
    var that = this;
    return string.split(" ").map(function(x) {
      return that.allNGram(x, minGram, maxGram);
    }).reduce(function(x, y) { return x.concat(y); }, []);
  }

};

if( typeof(exports) === 'object' ) {
  module.exports = tokenizer;
};
