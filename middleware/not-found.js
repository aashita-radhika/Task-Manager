// This middleware runs when no other route matches the request
const notFound = (req, res) => res.status(404).send('Route does not exist')

// Export the 404 handler
module.exports = notFound
