const db = require('../models')
const Restaurant = db.Restaurant

const adminController = {
  getRestaurants: (req, res) => {
    return Restaurant.findAll({ raw: true })
      .then(restaurants => {
        return res.render('admin/restaurants', { restaurants })
      })
  },
  createRestaurant: (req, res) => {
    res.render('admin/create')
  },
  postRestaurant: (req, res) => {
    const { name, tel, address, opening_hours, description } = req.body
    if (!name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }
    Restaurant.create({
      name,
      tel,
      address,
      opening_hours,
      description
    }).then(restaurant => {
      req.flash('success_messages', 'restaurant was successfully created')
      res.redirect('/admin/restaurants')
    })
  },
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, { raw: true })
      .then(restaurant => {
        return res.render('admin/restaurant', { restaurant })
      })
  },
  editRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, { raw: true })
      .then(restaurant => {
        return res.render('admin/create', { restaurant }) // create 和 edit 共用表單
      })
  },
  putRestaurant: (req, res) => {
    const { name, tel, address, opening_hours, description } = req.body
    if (!name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        restaurant.update({
          name,
          tel,
          address,
          opening_hours,
          description
        })
          .then(restaurant => {
            req.flash('success_messages', 'restaurant was successfully to update')
            res.redirect('/admin/restaurants')
          })
      })
  },
  deleteRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        restaurant.destroy()
          .then(() => res.redirect('/admin/restaurants'))
      })
  }
}

module.exports = adminController