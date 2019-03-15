const categoriesService = require('../services/categories-service');

async function updateCategories() {
    let categories = await categoriesService.getCategories();
        categories = categories.filter(category=>category.posts.length > 0)
    this.setState({
        categories
    })
}

export default updateCategories
     
