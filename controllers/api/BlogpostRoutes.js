const router = require('express').Router();
const { Blogpost, Comment } = require('../../models');

//find single post
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blogpost.findByPk(req.params.id, {
      include: [{
        model: Comment,
        attributes: ['id', 'content', 'date_created'],
      }]
    })

    res.status(200).json(blogData);
  } catch (err) {
    res.status(404).json(err);
  }
});

//find all posts
router.get('/:user_id', async (req, res) => {
  try {
    const blogData = await Blogpost.findAll({
      include: [{
        model: Comment,
        attributes: ['id', 'content', 'date_created'],
      }]
    })

    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Create blogpost
router.post('/', async (req, res) => {
  try {
    const newBlogpost = await Blogpost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No Blog post found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
