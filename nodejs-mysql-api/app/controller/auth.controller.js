const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const { generateKeyPairSync } = require('crypto'); 
const { publicKey, privateKey } = generateKeyPairSync('rsa', 
{   modulusLength: 2048,  // the length of your key in bits   
    publicKeyEncoding: {
      type: 'spki',       // recommended to be 'spki' by the Node.js docs
      format: 'pem'   
    },   
    privateKeyEncoding: {
      type: 'pkcs8',      // recommended to be 'pkcs8' by the Node.js docs
      format: 'pem',
      //cipher: 'aes-256-cbc',   // *optional*
      //passphrase: 'top secret' // *optional*   
  } 
}); 

const Reviewer = db.reviewers;
const Attachment = db.attachments;
const Group = db.groups;
const Position = db.positions;
const Admin = db.admins;

exports.login = (req, res) => {
    const email = req.body.email,
          password = req.body.password;
          
    Reviewer.findOne({
        where: {email: email, password: password, deletedAt: null},
        include:[
            {model: Position, attributes:[]},
            {model: Attachment, attributes:[]},
            {model: Group, attributes:[]}
          ],
        attributes:{include:[
                                [db.sequelize.col('position.name'),'positionName'],
                                [db.sequelize.col('attachment.name'),'unitName'],
                                [db.sequelize.col('group.name'),'groupName']
                            ]},
        raw:true
    }).then(reviewer => {
        if (reviewer) {
            const jwtToken = jwt.sign({}, privateKey, {
                algorithm: 'RS256',
                expiresIn: "1h",
                subject: reviewer.email
            });
            res.status(200).json({
                reviewer,
                authToken: jwtToken,
                expireIn: 3600
            });
        } else {
            Admin.findOne({
                where: {email: email, password: password}
            }).then(admin => {
                if (admin) {
                    const jwtToken = jwt.sign({}, privateKey, {
                        algorithm: 'RS256',
                        expiresIn: "1h",
                        subject: admin.email
                    });
                    res.status(200).json({
                        admin,
                        authToken: jwtToken,
                        expireIn: 3600
                    });
                } else {
                    res.status(401).send('invalid login');

                }
            })
        }
    })    
}

exports.checkIfAuthenicated = expressJwt({
    secret: publicKey
})