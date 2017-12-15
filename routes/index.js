const path = require("path");
const router = require("express").Router();
const Article = require("../models/article.js");
var axios = require('axios');


const yearStringToInt = (yearString) => {
    const THIS_YEAR=new Date().getFullYear();
    let year = parseInt(yearString);
    if (year < 1800) {
      year = 1800;
    } else if (year > THIS_YEAR) {
      year = THIS_YEAR;
    }
    return year;
  }
  
const yearFloor = (yearString) => {
return yearStringToInt(yearString).toString() + "0101";
}

const yearCeil = (yearString) => {
return yearStringToInt(yearString).toString() + "1231";
}

// API Routes
router.post("/api/saved", function(req, res){
	const link = req.body;
	var savedArticle = new Article(req.body);
	savedArticle.save(function(err, doc){
		if (err){
			console.log(err)
		}else{
			console.log(doc);
		}
		res.json(doc);
	});

	// });
});

router.get("/api/saved", function(req, res){
	return Article
    .find({})
    .sort({ date: -1 })
    .then(result => res.json(result))
    .catch(err => res.status(400).json(err));

});

router.get("/api/remove/:id", function(req, res){
	return Article
    .findById({ _id: req.params.id })
    .then(article => article.remove())
    .then(article => res.json(article))
    .catch(err => res.status(400).json(err));

});

router.get("/api/search", function(req, res){
    const apikey = '07f5421726064b1bab1eafc8b671eab8';
	const search = req.query.search;
	const startyear = req.query.startyear;
    const endyear = req.query.endyear;
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
        params: {
          'api-key': apikey,
          'q': search,
          'begin_date': yearFloor(startyear),
          'end_date': yearCeil(endyear),
          'page': 0,
          'facet_field': "document_type"
        }
    })
    .then(function (response) {
        res.json(response.data);
    })
    .catch(function (error) {
        console.log(error);
        res.json(error);
    });
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

module.exports = router;