"use strict"
/*

BLOG api project ROUTS

*/
const router = require('express').Router()
const { BlogCategory:blogCategoryView, BlogPost:blogPostView } = require('../controllers/blogControllerView')

//? Browserlardan sadce ve sadece GET isteği gelir. HTML Form aracılığıyla sadece GET ve POST isteği gelir. O nedenle route planlaması yaparken diğer istekler için ona uygun bir planlama yapılmalıdır.

//* method olarak get ve post diye de kullanılabilir. Yada all metodu kullanılarak controllerda gelen istek kontrol edilebilir.

// URL: /
//* / anasayfayı viewe verdiğimiz için projemiz ayaga kalkdığında hatalı sayfa gelecektiir çünkü routeu bulamayacaktır. Çünkü /post şeklinde ayarlama yaptım. Bunun sebebi de ilerleyen süreçlerde yeni routelar eklenebilir diye. Bunun i,çin ana sayfay istek geldiğinde /post a yönlendirme yaptırabilirim:

// URL:

router.all('/',(req,res)=>{
    res.redirect('/post')
})


// BlogPost:
router.all('/post',blogPostView.list);
router.all('/post/create',blogPostView.create);
router.all('/post/:postId/update', blogPostView.update);
router.all('/post/:postId/delete', blogPostView.delete)
router.all('/post/:postId', blogPostView.read);


module.exports = router