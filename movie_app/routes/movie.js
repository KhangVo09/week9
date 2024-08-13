var express = require('express');
var router = express.Router();
const request = require('request');
var Movie = require('../models/Movie');
var Constant = require("../common/constant.js");
const axios = require('axios');

/* GET movies listing. */
router.get('/list', function(req, res, next) {
    var movie = new Movie();
    movie.search_by_condition(
        {},
        {limit:10},
        '',
        {},
        function(results){
            // console.log(results);
            res.render('movie', { list: results['data'] });
    });
});
//Exercise
router.get('/list_test', function(req, res, next) {
    var movie = new Movie();
    movie.search_by_condition(
        {year: req.query.year},
        {limit:10},
        '',
        {},
        function(results){
            // console.log(results);
            res.json(results);
        });
});
//POST request
router.post('/create_new', function(req, res, next) {
    var movie = new Movie();
    movie.create(
        {
            "title": req.body['title'],
            "year": req.body['year']
        },
        function(results){
            // console.log(results);
            res.json(results);
        });
});
//PUT request
router.put('/update_me', function(req, res, next) {
    var movie = new Movie();
    movie.update(
        {_id: req.body['_id']},
        {year: req.body['year']},
        function(results){
            // console.log(results);
            res.json(results);
        });
});
//todo DELETE request
router.delete('/delete_it', function(req, res, next) {
    //you do it
});
////////// Youtube videos
router.get('/yt/homepage', function(req, res, next) {
    res.render('yt/homepage');
});

router.get('/yt/latest_songs', function(req, res, next) {
    //get data from public service https://openwhyd.github.io/openwhyd/API?ref=public_apis#hot-tracks
    var url = Constant.YT_DOMAIN + 'hot?format=json';
    axios.get(url)
        .then((response) => {
            const data = response.data;
            // console.log(data); // Or use the data as needed
            res.json(data.tracks);  //todo should not return all fields
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
});

module.exports = router;
