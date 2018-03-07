const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// bcrypt.genSalt(10, (err,salt) => {
//     if(err) return next(err);

//     bcrypt.hash('password123',salt,(err, hash) => {
//         if (err) return next(err);

//         console.log(hash);

        
//     })
// })

const id= '1000';
const secret = 'superjatin'
const received = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.XWmwAAMbyzFPsGp6rNL-uAM2X5uC8vFBZq903gpnfrU';

const token = jwt.sign(id, secret);
const decodeToken = jwt.verify(received, secret);

console.log(decodeToken)
