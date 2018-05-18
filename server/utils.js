const jwt = require('jwt-simple');

const checkUser = (req, res, next) => {
   var token = '';
   var username = '';
   
   if(req.body.token) {
     token = req.body.token;
     username = req.body.username;
   } else {
   	 token = req.query.token;
   	 username = req.query.username;
   }

   var decoded = jwt.decode(token, 'xxx'); 
   if(decoded.user === username) {
   	 next();
   }
}

exports.checkUser = checkUser;