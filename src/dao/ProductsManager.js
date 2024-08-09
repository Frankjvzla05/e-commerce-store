const fs = require("fs")

class ProductsManager {
    static path

    static async getProducts() {
        if(fs.existsSync(this.path)){
            let heroes=JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
            heroes=heroes.map(h=>{
                return {
                    ...h, 
                    name: h.name.toUpperCase()
                }
            })
            return heroes 
        }else{
            return []
        }
    }

}

module.exports = ProductsManager