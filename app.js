//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var mongoose =require("mongoose");

const homeStartingContent = "There is hope, evn when your brain tells you there isn't";
const aboutContent = "Happiness can be found even in the darkest of times, if only one remembers to turn on the light.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var blogSchema = new mongoose.Schema({
  blogName: String,
  blogContent:String
});

var Blog = mongoose.model('Blog', blogSchema);
// var silence = new Blog({ blogName: 'Silence',blogContent:"assholes content is here" });
// console.log(silence.blogName);
// console.log(silence.blogContent);


//const password=8;
app.get("/",function(req,res){
  // res.render("login");
  res.render("home");
})
// app.post("/",function(req,res){
//   var pass=req.body.inputcode;
//   if(pass==password){
//     res.redirect("/blogs");
//   }
//   else{
//     res.send("wrong password")
//   }
// })

app.post("/post",function(req,res){   
  const post =new Blog({
    blogName  : req.body.title,
    blogContent : req.body.post
})
post.save(function(err){
  if(!err)
  {
    res.redirect("/blogs")
  }
})
})

app.get("/Consult",function(req,res)
{
  res.render("consult",{aboutp:aboutContent})
})
app.get("/Therapies",function(req,res)
{
  res.render("therapies")
})
app.get("/Activities",function(req,res)
{
  res.render("activities")
})

app.get("/Music",function(req,res)
{
  res.render("music")
  
})

app.get("/Tests",function(req,res)
{
  res.render("test")
})
app.get("/Books",function(req,res)
{
  res.render("books")
})
app.get("/blog",function(req,res)
{
  res.redirect("/blogs")
})

app.get("/compose",function(req,res)
{
  res.render("compose",{})
})

app.post("/abc",function(req,res){
  res.redirect("/compose");
})
app.post("/bcd",function(req,res){
  res.redirect("/blogs");
})
app.post("/home",function(req,res){   
  const post =new Blog({
    blogName  : req.body.title,
    blogContent : req.body.post
})
post.save(function(err){
  if(!err)
  {
    res.redirect("/blogs")
  }
})
});



app.get("/blogs",function(req,res){
  
  Blog.find({}, function(err, posts){
    res.render("post",{posts:posts})
  });
  
})


app.get("/blogs/:np",function(req,res){
  var current_post;
  current_post=req.params.np;
  // console.log(current_post);
  Blog.findOne({_id:current_post}, function(err, post){
    res.render("currentpost",{currentp:post.blogName,postc:post.blogContent});
  });
})

app.get("/delete/:np",function(req,res){
  var image=req.params.np;
  console.log(image);
  Blog.findByIdAndRemove(image,function(err)
  {
    if(!err)
    {
      res.redirect("/blogs");
    }
  })
})


mongoose.connect('mongodb+srv://dryptm:vinay26k@cluster0-ildsz.mongodb.net/blogs', {useNewUrlParser: true,useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("database connected!!!!");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
