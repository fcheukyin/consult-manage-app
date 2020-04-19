const db = require('../config/db.config.js');

const Reviewer = db.reviewers;

exports.login = (req, res) => {
    const email = req.body.email,
          password = req.body.password;

          console.log(123);

    Reviewer.findOne({
        where: {email: email, password: password}
    }).then(reviewer => {
        if (!reviewer) {
            res.sendStatus(401);
            
        } else {
            res.json(reviewer);
        }
    })


    
}