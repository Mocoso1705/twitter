'use strict';

var express = require('express');
var router = express.Router();

var page = require('../lib/middleware/page');
var Entry = require('../lib/entry');

router.get('/:page?', page(Entry.count, 5), function(req, res) {
  var page = req.page;
  Entry.getRange(page.from, page.to, function(err, entries) {
    res.render('entries', {
      title: 'Entries',
      entries: entries
    });
  });
});

module.exports = router;
