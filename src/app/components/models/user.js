const mongoose = require("mongoose");

/* const POOL = require("./config");

const Project={
    getProject: function(id){
        return new Promise ((resolve,reject) =>{
            POOL.query("SELECT * FROM projects WHERE id=?",parseInt(id),(error,result) =>{
                if (error){
                    console.log(error);
                    reject(error);
                } else {
                    console.log(result);
                    if (result.length === 0)
                        resolve(null)
                    else
                        resolve(result);
                }
            });
        });
    }
}

module.exports = Project; */

Schema = mongoose.Schema;

projectSchema = mongoose.Schema;

projectSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
});

module.exports = mongoose.model("Project", projectSchema);