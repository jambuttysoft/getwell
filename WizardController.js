const WizardService = require('./WizardService.js');

module.exports = class WizardController {
    constructor(){
        // try {
        //     BotService.createUser();
        // } catch (e) {
        //     console.log(e);
        // }
    }

    static async sendPDFToEmail(req, res){ 
        try {
            WizardService.sendPDFToEmail(req.body);
            res.status(200).json('ok');
        } catch (e) {
            res.status(500).json(e);
        }
    }
}
