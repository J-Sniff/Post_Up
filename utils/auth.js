const withAuth = (req, res, next) => {
    const { logged_in } = req.session;

    // If user is not logged in, send unauthorized response
    if (!logged_in) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
};

module.exports = withAuth;