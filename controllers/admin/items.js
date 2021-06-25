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
            dealer_price : item.data().dealer_price +"",
            company_price : item.data().company_price + "",
            customer_price : item.data().customer_price + "",
            mrp : item.data().mrp + "",
            category : categories[item.data().category].name + "",
            actions : ""
        })
    })

    res.send({data : data})

}
