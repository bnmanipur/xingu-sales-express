const db = require("../../config/firestore")

exports.index = async (req, res, next) => {
    res.render('admin/users', {title : "Users"})
}

exports.login = async (req, res, next) => {
    const {pincode} = req.body

    const snapshot = await db.collection("users").where("pincode", "=" ,pincode).limit(1).get()
    if(snapshot.docs.length > 0){
        const doc = snapshot.docs[0]
        req.session.userId = doc.id;
        res.send({"status":"success", "data" :"login"})
    }else{
        res.send({"status":"success", "data" :"wrong"})
    }
}
 
exports.get_list = async (req, res, next) => {
    const users = (await db.collection('users').get()).docs
    let data = []

    for(let i = 0; i < users.length; i++){
        const user = users[i].data()

        data.push({
            uid : user.uid,
            name : user.name,
            pin : user.pincode,
            role : user.role,
            delete : "<a class=delete>Delete</a>"
        })
    }
    res.send({"success":true, "data" :data})
}

exports.add = async (req, res, next) => {
    let _ = await db.collection("users").orderBy("uid", "desc").limit(1).get()
    let uid = _.docs[0].data().uid

    const data = {
        uid : parseInt(uid) + 1,
        name : req.body.name,
        pincode : req.body.pin,
        role : req.body.role
    }

    await db.collection("users").doc().set(data)
    res.send({"success" : true, "data" : "added"})
}

exports.logout = async(req, res, next) => {
    req.session.userId = null
    res.redirect("/login")
}
