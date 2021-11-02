const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [ {
      model: Product,
      through: ProductTag,
      },
    ],
  }).then((tagData) => {
    res.json(tagData);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne(
    {
      where: {
        id: req.params.id,
      },
      include: [{
        model: Product,
        through: ProductTag,
        },
      ],
    }
  ).then((tagData) => {
    res.json(tagData);
  })
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
