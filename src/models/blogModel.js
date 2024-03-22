"use strict"
/*

BLOG api project MODELS

*/
//https://mongoosejs.com/docs/models.html


const mongoose = require('mongoose')

// const modelSchema=new mongoose.Schema(
//     {fields },{model detail}
// )
/*
const modelSchema=new mongoose.Schema(
    {
        fieldName:{
            type:String, //data type
            default: null, //
            trim: true, // boşlukarı al
            select: true, // çağrılınca gelsin mi
            index: true, //  aramada hızlı erişim
            unique : true, //
            required: true, // veri girişi gerekli mi
            enum: [[1,2,3],"error message"], // standart veri girişi sağlar
            validate:[function(data) {return true}], // girilen veriyi istenen fonksiyon ile kontrol eder
            get: function(data) {return  true}, // veri çağrılınca çalıcak fonksiyon
            set: function(data) {return  true}  // veri kaydederken çalışacak fonksiyon
        }

    },
    {
        collection:collectionName,
        timestamps: true // veri kayıt ve güncellemede zaman damgası 
    }
)
*/

// BlogCategory:

const BlogCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    }

}, {
    collection: 'blogCategories',
    timestamps: true
})

// BlogPost:
const BlogPostSchema = new mongoose.Schema(
    {
        // _id
        // blog category oluşunca kullan
        // blogCategoryId:{
        // }

        blogCategoryId: {
            type: mongoose.Schema.Types.ObjectId, // ForeignKey // Relational ID
            ref: 'BlogCategory',
            required: true,
        },

        title: {
            type: String,
            trim: true,
            required: true
        },
        content: {
            type: String,
            trim: true,
            required: true
        },
        published: {
            type: Boolean,
            default: true
        },
        // createdAt
        //updatedAt  mongo takip ediyor

    },
    {
        collection: 'blogPosts',
        timestamps: true // veri kayıt ve güncellemede zaman damgası 
    }
)

// Export:
module.exports = {
    BlogCategory: mongoose.model('BlogCategory', BlogCategorySchema),
    BlogPost: mongoose.model('BlogPost', BlogPostSchema),
}