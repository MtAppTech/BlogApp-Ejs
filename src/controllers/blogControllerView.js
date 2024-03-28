"use strict";
/*

BLOG api project MODELS

*/
// move to index.js:
// require('express-async-errors')

const { BlogCategory, BlogPost } = require("../models/blogModel");

/*
BLOG CATEGORY Controllers
*/

module.exports.BlogCategory = {
  // GET
  list: async (req, res) => {
    // console.log(req)
    // const data = await BlogCategory.find()
    const data = await res.getModelList(BlogCategory);

    res.status(200).send({
      error: false,
      data,
    });
  },

  // CRUD Processes:

  // POST
  create: async (req, res) => {
    const data = await BlogCategory.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      data,
    });
  },

  // /:categoryId -> GET
  read: async (req, res) => {
    const data = await BlogCategory.findOne({ _id: req.params.categoryId });

    res.status(200).send({
      error: false,
      data,
    });
  },

  // /:categoryId -> PUT / PATCH
  update: async (req, res) => {
    const data = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );

    res.status(202).send({
      error: false,
      body: req.body,
      // data: data,
      data,
      newData: await BlogCategory.findOne({ _id: req.params.categoryId }),
    });
  },

  // /:categoryId -> DELETE
  delete: async (req, res) => {
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });

    res.status(data.deletedCount >= 1 ? 204 : 404).send({
      error: false,
      data,
    });
  },
};

/*
BLOG POST Controllers
*/

module.exports.BlogPost = {
  list: async (req, res) => {
    const data = await res.getModelList(BlogPost, "blogCategoryId");
    //console.log(req)

    // res.status(200).send({
    //     error: false,
    //     details: await res.getModelListDetails(BlogPost),
    //     data: data
    // })
    console.log(req.query.filter);
    const categories = await BlogCategory.find();
    const recentPosts = await BlogPost.find()
      .sort({ createdAt: "desc" })
      .limit(3);
    //console.log('basla'+req.url)
    // res.render('index')
    if (req.url.includes("?")) {
      if (req.url.includes("page=")) {
        req.url = req.url.split("&page=")[0];
      }
    } else {
      req.url += "?"; //* /post?
    }
    // res.render('index',{
    //    posts : data,
    //    categories,
    //    selectedCategory: req?.query?.filter?.blogCategoryId,
    //    recentPosts,
    //    details: await res.getModelListDetails(BlogPost),
    //    pageUrl: req.url
    // })

    res.render("postList", {
      posts: data,
      categories,
      selectedCategory: req?.query?.filter?.blogCategoryId,
      recentPosts,
      details: await res.getModelListDetails(BlogPost),
      pageUrl: req.url,
    });
  },

  create: async (req, res) => {
    //
    const data = await BlogPost.create(req.body);
    // console.log('*****');
    // console.log(req.body);
    res.status(200).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    //
    const data = await BlogPost.findOne({ _id: req.params.postId }).populate(
      "blogCategoryId"
    );
    /*
        res.status(200).send({
             error: false,
             data: data
         })
         */

    res.render("postRead", {
      post: data,
    });
  },
  update: async (req, res) => {
    //
    if (req.method == "POST") {
      const data = await BlogPost.updateOne(
        { _id: req.params.postId },
        req.body
      );
      console.log(req.method);
      /*
      res.status(200).send({
        error: false,
        data: data,
      });
      */
      res.render("/post" + req.params.postId);
    } else {
      res.render("postForm", {
        categories: await BlogCategory.find(),
        post: await BlogPost.findOne({ _id: req.params.postId }).populate(
          "blogCategoryId"
        ),
      });
    }
  },
  delete: async (req, res) => {
    //
    const data = await BlogPost.deleteOne({ _id: req.params.postId });
    // console.log(data);
    // res.status((data.deletedCount >= 1) ? 204 : 404).send({
    //     error: false,
    // })
    res.redirect("/");
  },
};
