const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const RSMQ = require("rsmq")
const rsmq = new RSMQ({
    host: process.env.HOST,
    port: process.env.PORT,
    ns: "rsmq"
})

createSeleniumQueue = () => {
    rsmq.createQueue({qname: "SeleniumQueue"}, (err, _) => {
        if(err) {
            return
        }
    })
}
createSeleniumQueue()

createPlaywrightQueue = () => {
    rsmq.createQueue({qname: "PlaywrightQueue"}, (err, _) => {
        if(err) {
            return
        }
    })
}
createSeleniumQueue()

rsmq.listQueues(function (err, queues) {
	if (err) {
		return
    }
	console.log(`Active Queues: ["${queues.join("\", \"")}"]`)
});

class Controller {
    urls = {selenium: '', playwright: ''}
    messages = []

    runing = (_, res) => {
        res.json({status: "API is running!!!"})
    }

    helloWorld = (_, res) => {
        res.json({status: "Hello World!!!"})
    }

    pop = (queue) => {
        rsmq.popMessage({qname: queue}, (err, resp) => {
            if (err) {
                return
            }
            if (resp.id) {
                this.messages.push(JSON.parse(resp.message))
                return
            }
            return
        });
    }

    next = (req, res) => {
        rsmq.receiveMessage({qname: req.body.queue}, (err, resp) => {
            if (err) {
                res.json({status: "Error al obtener message!!!"})
            }
            if (resp.id) {
                res.json({response: JSON.parse(resp.message)})
            } else {
                res.json({status: "No messages for me..."})
            }
        });
    }

    generatePDF = async (data, isSelenium) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([400, 700]);
        const { width, height } = page.getSize();
        var info = {}
        var red = ''
        var text = ''
        for(const [_, value] of Object.entries(data)) {
            if(text != '') {
                text += '\n'
            }
            if(Object.keys(value)[0] === 'facebook') {
                red = 'facebook '
                info = value.facebook
            } else if(Object.keys(value)[0] === 'instagram') {
                red = 'instagram '
                info = value.instagram
            } else if(Object.keys(value)[0] === 'linkedin') {
                red = 'linkedin '
                info = value.linkedin
            } else if(Object.keys(value)[0] === 'twiter') {
                red = 'twiter '
                info = value.twitter
            }
            text += `\n${red}`
            for(const [key, value] of Object.entries(info)) {
                text += `\n${key}: ${value}`
            }
        }
        text = `${red}\n${text}`
        page.drawText(text, { x: 50, y: height - 100, size: 14});
        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync('./output.pdf', pdfBytes);
    }

    save = async (req, res) => {
        const keys = Object.keys(req.body)
        if(keys[0] === "Selenium") {
            if(this.urls.selenium === "") {
                this.urls.selenium = req.body.url
            }
        } else {
            if(this.urls.playwright === "") {
                this.urls.playwright = req.body.url
            }
        }
        const queueName = keys[0] === "Selenium" ? "SeleniumQueue" : "PlaywrightQueue"
        const msg = keys[0] === "Selenium" ? JSON.stringify(req.body.Selenium) : JSON.stringify(req.body.Playwright)
        rsmq.sendMessage({qname: queueName, message: msg}, (err, resp) => {
            if(err) {
                console.log(err)
                res.json({status: "Error al guardar informacion de la red social!!!"})
                return
            }
            rsmq.getQueueAttributes({qname: queueName}, (err, resp1) => {
                if(err) {
                    console.log(err)
                    res.json({status: "Error al contar elementos en la cola!!!"})
                    return
                }
                console.log(resp1.msgs)
                if(resp1.msgs >= 4) {
                    // desencolar
                    for(let i = 0; i < resp1.msgs; i ++) {
                        this.pop(queueName)
                    }
                    this.generatePDF(this.messages)
                    this.messages = []
                    res.json({status: "reporte generado"});
                } else {
                    res.json({status: "info guardada"});
                }
            })
        })
    }
}

module.exports = {
    Controller: Controller
}