const Joi = require('@hapi/joi');

// Subjects Validation
module.exports.subjectValidation = (req, res, next) => {
    const subject = req.body;
    const schema = Joi.object({
        subject_title: Joi.string().required(),
        course_code: Joi.string().required(),
    });
    const { data, error } = schema.validate(subject);
    if (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            error: 'Invalid fields constraints. Bad request',
            details: error.details[0]
        });
    } else {
        return next();
    }
}

module.exports.assignmentValidation = (req, res, next) => {
    const assignment = req.body;
    const schema = Joi.object({
        date_due: Joi.string().required(),
        course_name: Joi.string().required(),
    });
    const { data, error } = schema.validate(assignment);
    if (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            error: 'Invalid fields constraints. Bad request',
            details: error.details[0]
        });
    } else {
        return next();
    }
}

module.exports.classValidation = (req, res, next) => {
    const reqClass = req.body;
    const schema = Joi.object({
        subject_id: Joi.number().required(),
        start: Joi.string().required(),
        end: Joi.string().required(),
        day: Joi.string().required(),
    });
    const { data, error } = schema.validate(reqClass);
    if (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            error: 'Invalid fields constraints. Bad request',
            details: error.details[0]
        });
    } else {
        return next();
    }
}