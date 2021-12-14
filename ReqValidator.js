import Joi from 'joi';

class ReqValidator {

    messageValidate(data, reqName){

        const schema = Joi.object().keys({
            [reqName]: Joi.string().required()
        });

        const {error, value} = schema.validate(data);

        if(error){
            throw new Error(error);
        }

        return value;
    }
    
}

export default new ReqValidator();