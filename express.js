const express = require('express');
const ExpressError = require('./expressError')
const app = express();


app.get('/mean/:arr', (req,res,next) => {

    let arr = req.params.arr.split(',')

    if (arr.value === null || arr.value === NaN) throw new ExpressError("Thats not a number or array!", 404)

    let result = arr.map(function (x) { 
        return parseInt(x, 10); 
    });

    let total = 0
    let count = 0
    
    result.forEach(function(item) {
        total += item
        count++
    });

    let mean = total/count

    return res.json({ mean: mean })
})


app.get('/median/:arr', (req,res,next) => {
  try {

    let arr = req.params.arr.split(',')
    
    if (arr.value === null || arr.value === NaN) throw new ExpressError("Thats not a number or array!", 404)

    let result = arr.map(function (x) { 
        return parseInt(x, 10); 
    });

    if (result.length % 2 == 0){
        let medUpper = (result.length / 2)
        let medLower = (result.length / 2) - 1

        let respon = (result[medUpper] + result[medLower]) / 2
        return res.json({ median: respon })
    }

    if (result.length % 2 == 1){
        let median = Math.floor(result.length / 2)
        return res.json({ median: result[median] })
    }
  } catch (err) {
    return next(err)
  }
})


app.get('/mode/:arr', (req,res,next) => {
  try{

    let arr = req.params.arr.split(',')

    if (arr.value === null  || arr.value === NaN) throw new ExpressError("Thats not a number or array!", 404)

    function createFrequencyCounter(arr) {
        return arr.reduce(function(acc, next) {
          acc[next] = (acc[next] || 0) + 1;
          return acc;
        }, {});
      }

    let freqCounter = createFrequencyCounter(arr);

    let count = 0;
    let mostFrequent;
  
    for (let key in freqCounter) {
      if (freqCounter[key] > count) {
        mostFrequent = key;
        count = freqCounter[key];
      }
    }

    
    return res.json({ mode: +mostFrequent })
  } catch (err) {
    return next(err)
  }
})


app.use(function(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message;
  return res.status(status).json({
    error: {message, status}
  });
});


app.listen(3000, function () {
  console.log('Server running on port 3000');
})
