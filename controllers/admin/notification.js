const db = require('../../config/realtime')
const storage = require('../../config/storage')
const config = require("../../config/values.json")
const messaging = require("../../config/messaging")

exports.index = async (req, res, next) => {
    res.render("admin/notification", {"title":"Notification"})
}

exports.send = async (req, res, next) => {
    const {
        title,
        body,
    } = req.body;

    db.ref("notifications").set({
        title : title,
        body : body,
        senton : senton
    })

    const topic = 'global';

    const message = {
        data: {
            title: title,
            body: body,
            from_web: true,
            sented : "_",
            user : "_"
        },
        topic: topic
    };

    messaging.send(message).then((response) => {
        console.log(response)
    }).catch((exception) => {
        console.log(exception)
    })

}
