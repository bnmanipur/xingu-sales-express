const db = require('../../config/realtime')
const storage = require('../../config/storage')
const config = require("../../config/values.json")
const messaging = require("../../config/messaging")

exports.index = async (req, res, next) => {
    res.render("admin/notification", {"title":"Notification"})
}

exports.send = async (req, res, next) => {
    // const {
    //     title,
    //     body,
    // } = req.body;
    //
    // const image = req.files.image;
    //
    // const senton = ""
    //
    // // storage.storage().ref().child()
    // //
    // const milliseconds = new Date().getTime();
    //
    // await storage.storage.bucket("notification/" + milliseconds + "." + image.mimetype , {
    //
    // })
    //
    // db.ref("notifications").set({
    //     title : title,
    //     body : body,
    //     image : image,
    //     senton : senton
    // })
    //
    // const topic = 'global';
    //
    // const message = {
    //     data: {
    //         title: title,
    //         body: body,
    //         image: image
    //     },
    //     topic: topic
    // };
    //
    // messaging.send(message).then((response) => {
    //     console.log(response)
    // }).catch((exception) => {
    //     console.log(exception)
    // })

}
