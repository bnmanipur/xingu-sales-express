const db = require("../../config/firestore")

exports.index = (req, res, next) => {
    res.render('admin/repairing', { title: 'Repairing' });
}

exports.delete = async(req, res, next) => {
    const { id } = req.query;
    await db.collection("repairing").doc(id).delete()
    res.json({ 'status': "success", "message": "Aye! Aye! Job deleted successfully!" })
}

exports.get_list = async(req, res, next) => {
    // let {page, limit} = req.query
    //
    // page = parseInt(page)
    // limit = parseInt(limit)
    // if(isNaN(page)){
    //     page = 1
    // }
    // if(isNaN(limit)){
    //     limit = 6
    // }
    // .limit(page * limit)
    const snapshots = await db.collection('repairing').orderBy("jobno", "desc").get()
        // const snapshots = await db.collection('repairing').orderBy("added_on", "desc").get()

    let repairings = snapshots.docs;
    // console.log(repairings.length)
    //
    // const last = repairings[repairings.length - 1];

    // if(page > 1){
    //     repairings = (await db.collection("repairing").orderBy("addedon", "desc").startAfter(last).limit(limit).get()).docs
    // }

    let data = []

    repairings.forEach(repairing => {
        data.push({
            id: repairing.id,
            ...repairing.data()
        })
    })

    // for(let i = 0; i < repairings.length; i++){
    //     const _repairing = repairings[i]
    //     const repairing = repairings[i].data()
    //     const _user = await db.collection("users").doc(repairing.added_by).get()
    //     const user = _user.data()
    //
    //     // let add = true;
    //     //
    //     // if(page > 1){
    //     //     add = !snapshots.docs.some(e => e.id === _repairing.id);
    //     // }
    //     //
    //     // if(add){
    //         data.push({
    //             id : _repairing.id,
    //             ...repairing,
    //             added_by : {
    //                 id : _user.id,
    //                 name : user.name,
    //             }
    //         })
    //     // }
    // }
    res.send({ status: 200, data: data })
}

exports.get_job = async(req, res, next) => {

    const { id } = req.query

    const repairing = (await db.collection("repairing").doc(id).get())

    let data = {
        id: repairing.id,
        ...repairing.data()
    }

    res.send({
        "success": true,
        "data": data
    })

    res.send({ status: 200, data: data })
}

exports.get_latest_jobno = async(req, res, next) => {
    let data = await db.collection("repairing").orderBy("jobno", "desc").limit(1).get()
    let jobno = data.docs[0].data().jobno.toString()
    res.send(jobno)
}

exports.add_job = async(req, res, next) => {
    const {
        date,
        job_no,
        customer_name,
        contact,
        address,
        product,
        problem,
        accessories
    } = req.body;

    try {
        await db.collection("repairing").doc().set({
            date: date,
            jobno: job_no,
            customer_name: customer_name,
            contact: contact,
            address: address,
            product: product,
            problem: problem,
            accessories: accessories,
            added_by: req.session.userId,
            added_on: Date.now()
        })
        res.send({ status: 200, "success": "Aye! Aye! Job added successfully!!" })
    } catch (e) {

    }
}

exports.edit_job = async(req, res, next) => {
    const {
        id,
        job_no,
        courier,
        delivered,
        advanced_payment,
        total_payment,
        courier_place,
        courier_dispatched,
        courier_recieved,
        courier_returned,
        courier_delivered,
        credit,
        worked
    } = req.body

    const data = {
        is_courier: courier,
        worked: worked,
        is_delivered: delivered,
        advanced_payment: advanced_payment,
        total_amount: total_payment,
        courier_place: courier_place,
        courier_dispatched: courier_dispatched,
        courier_recieved: courier_recieved,
        courier_returned: courier_returned,
        courier_delivered: courier_delivered,
        is_credit: credit
    }

    const data1 = {
        ...data,
        jobno: job_no,
        added_by: req.session.userId
    }

    try {
        db.collection("repairing").doc(id).update(data).then(snaps => {
            if (!snaps.empty) {
                db.collection("repairing_logs").doc().set(data1)
            }
            res.send({ status: 200, "success": "Aye! Aye! Job edited successfully!!" })
        })
    } catch (e) {

    }
}