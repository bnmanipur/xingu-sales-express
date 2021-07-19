const db = require("../../config/firestore")

exports.index = async (req, res, next) => {

    const categories = await db.collection("categories").get()

    const data = []

    categories.docs.forEach(category => {
        data.push({
            id : category.id,
            name : category.data().name
        })
    })

    res.render('admin/items', {title : "Items", categories : data})
}

exports.get_list = async (req, res, next) => {
    const items = await db.collection("items").get()
    const categoryRef = db.collection("categories")
    const _categories = (await categoryRef.get()).docs

    const categories = {}
    _categories.forEach(category => {
        categories[category.id] = {
            id : category.id,
            name : category.data().name
        }
    })

    let data = []

    items.forEach(item => {
        data.push({
            id : item.id + "",
            name : item.data().name +"",
            dealer_price : item.data().dealer_price || "",
            company_price : item.data().company_price || "",
            customer_price : item.data().customer_price || "",
            mrp : item.data().mrp + "",
            vendor : item.data().vendor || "",
            category : categories[item.data().category].name || "",
            addedon : item.data().addedon,
            actions : ""
        })
    })

    res.send({data : data})

}


exports.get = async (req, res, next) => {
    const item = await db.collection("items").doc(req.query.itemid).get()

    let data = {
        id : item.id + "",
        name : item.data().name +"",
        dealer_price : item.data().dealer_price || "",
        company_price : item.data().company_price || "",
        customer_price : item.data().customer_price || "",
        mrp : item.data().mrp + "",
        vendor : item.data().vendor || "",
        category : item.data().category || "",
        addedon : item.data().addedon,
        actions : ""
    }

    res.send({data : data})

}


exports.add = async (req, res, next) => {
    const {
        name,
        category,
        b2p_price,
        customer_price,
        mrp,
        vendor,
        company_price
    } = req.body;

    await db.collection("items").doc().set({
        name : name,
        category : category,
        dealer_price : b2p_price,
        customer_price : customer_price,
        mrp : mrp,
        vendor : vendor,
        company_price : company_price,
        addedon : new Date().getTime()
    })

    res.send({status : 200, message : "Added successfully!"})
}

exports.delete = async (req, res, next) => {
    const {
        itemid
    } = req.query

    await db.collection("items").doc(itemid).delete()

    res.send({status : 200, message : "Aye! aye! deleted successfully!"})
}

exports.edit = async(req, res, next) => {
    const {
        itemid,
        name,
        category,
        b2p_price,
        customer_price,
        mrp,
        vendor,
        company_price
    }  = req.body;


    await db.collection("items").doc(itemid).update({
        name : name,
        category : category,
        dealer_price : b2p_price,
        customer_price : customer_price,
        mrp : mrp,
        vendor : vendor,
        company_price : company_price,
    })

    res.send({status : 200, message : "Edited successfully!"})
}
