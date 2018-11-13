var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        //required: true,
        max: 100,
        default: "User"
    },
    password: {
        type: String,
        max: 1000,
        default: "0123456789"
    },
    username: {
        type: String,
        //raequired: true,
        max: 20,
        default: "2018ACSC0123456"
    },
    registration_number: {
        type: String,
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    dob: {
        type: String
    },
    course: {
        type: String
    }
    // status: {
    //     type: Boolean,
    //     //required: true,
    //     default:true
    // },
    // image: {
    //     data: {
    //         type: Buffer,
    //     },
    //     contentType: {
    //         type: String,
    //         max: 15,
    //         default: "png"
    //     }
    // }
});


//Export model
module.exports = mongoose.model("User", UserSchema);