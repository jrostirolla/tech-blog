const router = require('express').Router();
const { User, Blogpost, Comment } = require('../../models');

//find users page
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.param.id, {
      include: [{
        model: Blogpost,
        attributes: ['id', 'title', 'body', 'date_created']
      },
      {
        model: Comment,
        attributes: ['id', 'content', 'date_created']
      }]
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
})

//find all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{
        model: Blogpost,
        attributes: ['id', 'title', 'body', 'date_created']
      },
      {
        model: Comment,
        attributes: ['id', 'content', 'date_created']
      }]
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
})


//create new account
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Wrong email or password used. Please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Wrong email or password used. Please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'Welcome! You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
