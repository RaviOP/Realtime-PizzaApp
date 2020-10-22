const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/login')
    next()
}

module.exports = auth