TinyMCE WYSIWYG Editor
https://www.tiny.cloud/docs/tinymce/6/expressjs-pm/

```sh
    $ npm i tinymce
```

index.js
```js
// TinyMCE static files:
app.use('/libs', express.static('./node_modules'))
yüklenilen diğer paketleri import ederken de aynı şekilde başına node_modules yerine artık libs yazabiliriz.
```

public/postForm.js
```html
<textarea id="tinymceEditor" name="content" class="form-control">{%= post?.content %}</textarea>
```
```html
<!-- Script element sourcing TinyMCE -->
https://www.tiny.cloud/docs/integrations/expressjs/
<script type="application/javascript" src= "/libs/tinymce/tinymce.min.js"></script>
<!-- Script element sourcing the TinyMCE configuration -->
<script type="application/javascript">
    // https://www.tiny.cloud/docs/configure
    tinymce.init({
        selector: 'textarea#tinymceEditor',
        plugins: 'lists link image table code wordcount',
        height: 750
    });
</script>
```
