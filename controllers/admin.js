exports.dashboard = (req, res, next) => {
    res.render('admin/dashboard', { title: 'Dashboard' });
}
