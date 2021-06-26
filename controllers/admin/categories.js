const db = require("../../config/firestore")

exports.index = async (req, res, next) => {
    res.render('admin/categories', {title : "Categories"})
}

exports.get_list = async (req, res, next) => {
    const categoryRef = db.collection("categories")
    const _categories = (await categoryRef.get()).docs

    const data = []
    _categories.forEach(category => {
        data.push({
            id : category.id,
            name : category.data().name
        })
    })

    res.send({data : data})

}


exports.get = async (req, res, next) => {
    const category = await db.collection("categories").doc(req.query.categoryid).get()

    let data = {
        id : category.id + "",
        name : category.data().name +"",
    }

    res.send({data : data})
}


exports.add = async (req, res, next) => {
    const {
        name,
    } = req.body;

    await db.collection("categories").doc().set({
        name : name,
    })

    res.send({status : 200, message : "Added successfully!"})
}

exports.delete = async (req, res, next) => {
    const {
        categoryid
    } = req.query

    await db.collection("categories").doc(categoryid).delete()

    res.send({status : 200, message : "Aye! aye! deleted successfully!"})
}

exports.edit = async(req, res, next) => {
    const {
        categoryid,
        name,
    }  = req.body;


    await db.collection("categories").doc(categoryid).update({
        name : name,
    })

    res.send({status : 200, message : "Edited successfully!"})
}
