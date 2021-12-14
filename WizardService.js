var PdfPrinter = require('pdfmake');
let fs = require('fs');
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const mkdirp = require('mkdirp');


module.exports = class WizardService {

    static genName(){
        return uuidv4();
    }

    static async sendMail(name){
        // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "mail.totalflow.com.ua",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
            user: 'no-reply@totalflow.com.ua', // generated ethereal user
            pass: 'P@ssP@ss!@#', // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'no-reply@totalflow.com.ua', // sender address
            to: "Stronciy@gmail.com", // list of receivers
            subject: "GetWell опросник", // Subject line
            text: "Результат заполнения опросника.\n", // plain text body
            //html: "<b>Hello world?</b>", // html body
            attachments: [{
                filename: `${name}.pdf`,
                path: `./documents/${name}.pdf`,
                contentType: 'application/pdf'
            }],
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    static async createPDF(data){
        let fonts = {
            Roboto: {
                normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
                bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
                italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
                bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
            }
        };
        console.log(data);
        var printer = new PdfPrinter(fonts);
        let pdfDoc = printer.createPdfKitDocument(data);
        //console.log(pdfDoc);
        const namePdf = this.genName();
        const made = mkdirp.sync('./documents')
        console.log(`made directories, starting with ${made}`)
        pdfDoc.pipe(fs.createWriteStream(`documents/${namePdf}.pdf`));
        pdfDoc.end();
        return namePdf;
    }
    
    static async parseResponse(data){
        var dd = {
            content: [],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true,
                    alignment: "center"
                },
                subheader: {
                    fontSize: 13,
                    bold: true
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                }
            }
            
        }
        data.forEach(dataArr => {
            dd.content.push({
                text: `\n\n${dataArr.title}\n\n`,
                style: 'header'
            });
            dataArr.responses.forEach(subDataArr => {
                dd.content.push({
                    text: `\n${subDataArr.question}`,
                    style: 'subheader'
                });
                dd.content.push({
                    color: 'blue',
			        markerColor: 'red',
                    ul: Array.isArray(subDataArr.response) ? subDataArr.response : [subDataArr.response]
                });
            })
        });

        return dd;
    }

   static async sendPDFToEmail(data){
        console.log(data);
        let parseResponse = await this.parseResponse(data.responses);
        let name = await this.createPDF(parseResponse);
        this.sendMail(name);
        //console.log(data.responses);
    }
}
