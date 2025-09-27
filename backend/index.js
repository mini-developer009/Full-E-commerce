
function getingOneFunction(fun){
      return function (res,req,next){
        Promise.resolve(fun(req,res)).catch(err => {
          console.log(err);
          res.status(500).json({error: 'Internal Server Error'});
          next(err);
        }
    )
      }
}

getingOneFunction(function(req,res){
    console.log(req.body);
    res.json({message: 'Hello World'});
} (res,req,next))  