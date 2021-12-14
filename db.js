import {Sequelize} from 'sequelize';

export default new Sequelize(
    'wizardMed',
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        'host': process.env.DB_HOST,
        'dialect': 'mysql',
        //'dialectOptions': {'socketPath': process.env.DB_SOCKETPATH || '', 'decimalNumbers': true}
    }
)