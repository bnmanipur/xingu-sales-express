const db = require("../../config/firestore")

exports.index = (req, res, next) => {
    res.render("admin/courier", {"title":"Courier"})
}

exports.get_list = async (req, res, next) => {
    const couriers = (await db.collection("courier")
        .where("is_incoming", "==", 0)
        .where("is_outgoing", "==", 0)
        .where("is_received", "==", 0)
        .get()).docs

    let data = []

    couriers.forEach(courier => {
        data.push({
            id : courier.id,
            ...courier.data()
        })
    })

    res.send({
        "success" : true,
        "data" : data
    })
}

exports.get_list2 = async (req, res, next) => {
    const couriers = (await db.collection("courier")
        .where("is_incoming", "==", 1)
        .where("is_outgoing", "==", 0)
        .where("is_received", "==", 0)
        .get()).docs

    let data = []

    couriers.forEach(courier => {
        data.push({
            id : courier.id,
            ...courier.data()
        })
    })

    res.send({
        "success" : true,
        "data" : data
    })
}

exports.get_list3 = async (req, res, next) => {
    const couriers = (await db.collection("courier")
        .where("is_incoming", "==", 0)
        .where("is_outgoing", "==", 1)
        .where("is_received", "==", 0)
        .get()).docs

    let data = []

    couriers.forEach(courier => {
        data.push({
            id : courier.id,
            ...courier.data()
        })
    })

    res.send({
        "success" : true,
        "data" : data
    })
}

exports.delete = async(req, res, next) => {
    const {id} = req.query

    await db.collection("courier").doc(id).delete()

    res.send({
        "success" : "Aye! Aye! Courier deleted successfully!!"
    })
}

exports.get_data = async(req, res, next) => {
    const {id} = req.query

    const courier = (await db.collection("courier").doc(id).get())

    let data = {
        id : courier.id,
        ...courier.data()
    }

    res.send({
        "success" : true,
        "data" : data
    })
}

exports.insert = async(req, res, next) => {
    let {
        date,
        courier_name,
        boxno,
        tracking_id,
        payable_amt,
        party_name,
        party_add,
        received_date,
        is_received,
        is_incoming,
        is_outgoing,
        type
    } = req.body

    is_received = is_received === true ? 1 : 0;
    is_incoming = is_incoming === true ? 1 : 0;
    is_outgoing = is_outgoing === true ? 1 : 0;

    const a = await db.collection("courier").doc().set({
        date : date,
        courier_name : courier_name,
        boxno : boxno,
        tracking_id : tracking_id,
        payable_amt : payable_amt,
        party_name : party_name,
        party_add : party_add,
        received_date : received_date,
        is_received : is_received,
        is_incoming : is_incoming,
        is_outgoing : is_outgoing,
        type : type
    })

    res.send({"success" : "Aye! Aye! Courier added successfully!"})
}

exports.update = async (req, res, next) => {

    let {
        id,
        date,
        courier_name,
        boxno,
        tracking_id,
        payable_amt,
        party_name,
        party_add,
        received_date,
        is_received,
        is_incoming,
        is_outgoing,
        type
    } = req.body

    is_received = is_received === true ? 1 : 0;
    is_incoming = is_incoming === true ? 1 : 0;
    is_outgoing = is_outgoing === true ? 1 : 0;

    await db.collection("courier").doc(id).update({
        date : date,
        courier_name : courier_name,
        boxno : boxno,
        tracking_id : tracking_id,
        payable_amt : payable_amt,
        party_name : party_name,
        party_add : party_add,
        received_date : received_date,
        is_received : is_received,
        is_incoming : is_incoming,
        is_outgoing : is_outgoing,
        type : type
    })

    res.send({"success" : "Aye! Aye! Courier added successfully!!"})
}
