var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg'.Pool);

var config ={
    user: 'niladripal16',
    database: 'niladripal16',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title: 'article one | Niladri Pal',
        heading: 'Article One',
        date: 'Jan 22,2018',
        content: `
                <p>
                    This is the content is my first article.This is the content is my first article.This is the content is my first article.This is the content is my first article.This is the content is my first article.
                </p>
                <p>
                    This is the content is my first article.This is the content is my first article.This is the content is my first article.This is the content is my first article.This is the content is my first article.
                <p>
                    This is the content is my first article.This is the content is my first article.This is the content is my first article.This is the content is my first article.This is the content is my first article.
                </p>
                `
        },
    
    'article-two': {
        title: 'article two | Niladri Pal',
        heading: 'Article Two',
        date: 'Jan 23,2018',
        content: `
                <p>
                    This is the content is my Second article.
                </p>
             
        `
        },
    'article-three': {
        title: 'article three | Niladri Pal',
        heading: 'Article Three',
        date: 'Jan 24,2018',
        content: `
                <p>
                    This is the content is my third article.
                </p>
             
        `
        },
};
function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;

var htmlTemplate =
`
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        
        <div>
            ${content}
        </div>
    </body>
</html>

`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test.db', function (req, res) {
    //make a select request
    //return a response with the result
  pool.query('SELECT * FROM test', function(err,result){
      if (err) {
          res.status(500).send(err.toString());
      }
      else{
          res.send(JSON.stringify(result));
      }
  });  
});
app.get('/:articleName', function (req, res)
{
//articleName==article-one
//articles[articleName]== {} content object for article one

var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
