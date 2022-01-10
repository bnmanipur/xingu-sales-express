const db = require("../../config/firestore")
var fs = require("fs");

exports.index = (req, res, next) => {
    res.render("admin/worklist", {"title":"Worklist"})
}

exports.get_list = async (req, res, next) => {

    // const t1 = JSON.parse(fs.readFileSync("./controllers/admin/a/1.txt", "utf-8"));
    // const t2 = JSON.parse(fs.readFileSync("./controllers/admin/a/2.txt", "utf-8"));
    // const t3 = JSON.parse(fs.readFileSync("./a/3.txt", "utf-8"));

    // t1.forEach(element => {
    //     db.collection("worklist").doc(element.id).set({...element, paid: 0});
    // });
    // t2.forEach(element => {
    //     db.collection("worklist").doc(element.id).set({...element, paid: 0});
    // });
    // t3.forEach(element => {
    //     db.collection("worklist").doc(element.id).set({...element, paid: 0});
    // });
            
    const worklists = (await db.collection("worklist")
        .where("is_done", "==", 0)
        .where("cancelled", "==", 0)
        .get()).docs

    let data = []

    worklists.forEach(worklist => {
        data.push({
            id : worklist.id,
            ...worklist.data()
        })
    })

    res.send({
        "success" : true,
        "data" : data
    })
}

exports.get_list2 = async (req, res, next) => {
    const worklists = (await db.collection("worklist")
        .where("is_done", "==", 1)
        .where("paid", "==" , 0)
        .get()).docs

    let data = []

    worklists.forEach(worklist => {
        data.push({
            id : worklist.id,
            ...worklist.data()
        })
    })

    res.send({
        "success" : true,
        "data" : data
    })
}

exports.get_list3 = async (req, res, next) => {
    const worklists = (await db.collection("worklist")
        .where("cancelled", "==", 1)
        .get()).docs

    let data = []

    worklists.forEach(worklist => {
        data.push({
            id : worklist.id,
            ...worklist.data()
        })
    })

    res.send({
        "success" : true,
        "data" : data
    })
}

exports.get_list4 = async (req, res, next) => {
    const worklists = (await db.collection("worklist")
        .where("is_done", "==", 1)
        .where("paid", "==" , 1)
        .get()).docs

    let data = []

    worklists.forEach(worklist => {
        data.push({
            id : worklist.id,
            ...worklist.data()
        })
    })

    res.send({
        "success" : true,
        "data" : data
    })
}

exports.delete_order = async(req, res, next) => {
    const {id} = req.query

    await db.collection("worklist").doc(id).delete()

    res.send({
        "success" : "Aye! Aye! Work deleted successfully!!"
    })
}

exports.get_order = async(req, res, next) => {
    const {id} = req.query

    const worklist = (await db.collection("worklist").doc(id).get())

    let data = {
        id : worklist.id,
        ...worklist.data()
    }

    res.send({
        "success" : true,
        "data" : data
    })
}

exports.insert = async(req, res, next) => {
    const {
        date,
        work_date,
        client_name,
        contact,
        address,
        work,
        refer_by,
        payment_type,
        emergency
    } = req.body

    let _ = await db.collection("worklist").orderBy("workid", "desc").limit(1).get()
    let workid = _.docs[0].data().workid.toString()

    const a = await db.collection("worklist").doc().set({
        workid : parseInt(workid) + 1,
        date : date,
        work_date : work_date,
        name : client_name,
        contact : contact,
        address : address,
        work : work,
        refer_by : refer_by,
        payment_type : payment_type,
        emergency : emergency,
        technicians : "",
        remarks : "",
        is_done : 0,
        cancelled : 0,
        paid : 0
    })

    console.log(a.toString())

    res.send({"success" : "Aye! Aye! Order added successfully!"})
}

exports.update = async (req, res, next) => {

    let {
        id,
        work,
        technicians,
        is_done,
        payment_type,
        remarks,
        cancelled,
        emergency,
        paid
    } = req.body

    await db.collection("worklist").doc(id).update({
        work : work,
        technicians : technicians,
        is_done : is_done,
        remarks : remarks,
        payment_type : payment_type,
        cancelled : cancelled,
        emergency : emergency,
        paid : paid
    })

    res.send({"success" : `Aye! Aye! Order added successfully!!`})
}
