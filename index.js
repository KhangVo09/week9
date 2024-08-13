const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test1', (req, res) => {
  res.send('Hello ' + req.query.name);
});
//Exercise 1
app.get('/pagination', (req, res) => {
  var current_page = req.query.index;
  var numbers = [];
  
  for (var i=1; i<=10; i++){
    if(i == current_page){
      numbers.push('<strong style="color: blue; text-decoration: underline;">' + i + '</strong>');
    } else {
      numbers.push('<strong style="text-decoration: underline;">' + i + '</strong>');
    }
  }
  
  var string = numbers.join(" ");
  res.send(string);
});

//Exercise 2
app.get('/remove_duplication', (req, res) => {
  var string = req.query.string;
  var chars = [...new Set(string)];
  res.send(chars.join(''));
});
//Exercise 3
app.get('/permutation', (req, res) => {
  var string = req.query.string;
  var chars = string.split('');
  console.log(chars);
  //todo: calculate all permuation of input string
  /*
  For ex: input 'ABC', print ABC”, “ACB”, “BAC”, “BCA”, “CBA”, “CAB”
   */
  res.send(chars.join(''));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});