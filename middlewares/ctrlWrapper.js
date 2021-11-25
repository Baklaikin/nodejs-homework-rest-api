const ctrlWrapper = (ctrls) => {
    return async (req, res, next) => {
        try {
            await ctrls(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ctrlWrapper