// @login & register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');

// @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'login works' });
});

// @route  POST api/users/register
// @desc   返回的请求的json数据
// @access public
router.post('/register', (req, res) => {
  // 查询数据库中是否拥有该用户
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json('该用户名已存在');
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      const newUser = new User({
        username: req.body.username,
        school: req.body.school,
        schoolNum: req.body.schoolNum,
        avatar,
        password: req.body.password,
        identity: req.body.identity
      });

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  POST api/users/login
// @desc   返回token jwt passport
// @access public

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // 查询数据库
  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json('用户不存在!');
    }

    // 密码匹配
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const rule = {
          id: user.id,
          username: user.username,
          schoolNum: user.schoolNum,
          school: user.school,
          avatar: user.avatar,
          identity: user.identity
        };
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
        // res.json({msg:"success"});
      } else {
        return res.status(400).json('密码错误!');
      }
    });
  });
});

// @route  GET api/users/current
// @desc   return current user
// @access Private
router.get(
  '/allUser',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find().then(data => {
      res.json(data);
    })
  }
);

module.exports = router;
