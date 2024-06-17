const { sendEmail } = require("../helpers/send_email.helpers");

const sendTestEmail = async (req, res = response) => {
    try {
        const { toAddress, subject, url } = req.body;
        const { MessageId } = await sendEmail(toAddress, subject, url);

        res.json({
            ok: true,
            body: MessageId
        });
    } catch (error) {
        res.json({
            ok: false,
            body: `${error.message}`
        });
    }
};

module.exports = {    
    sendTestEmail
}