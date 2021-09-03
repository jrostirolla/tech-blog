const router = require('express').Router();
const { Blogpost } = require('../../models');


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
    const BlogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!BlogpostData) {
      res.status(404).json({ message: 'No Blog post found with this id!' });
      return;
    }

    res.status(200).json(BlogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
