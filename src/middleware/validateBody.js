function validateBody(schema) {
    return function(req, res, next) {
        const { error } = schema.validate(req.body)
        if(error == null) {
            next()
        } else {
            res.status(400).json({error: error.message})
        }
    }
}

module.exports = validateBody   