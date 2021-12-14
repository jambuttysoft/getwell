const Router = require('express');

//const ReqValidator = require('./ReqValidator.js');

const WizardController = require('./WizardController.js');

const router = Router();

router.post('/wizardSendToEmail', (req, res, next) => {
    const {body} = req;

    next();

    // try {
    //     ReqValidator.messageValidate(body, 'message');
    //     next();
    // }
    // catch (err) { 
    //     res.status(422).json(err.message);
    // }

}, WizardController.sendPDFToEmail);


module.exports = router;