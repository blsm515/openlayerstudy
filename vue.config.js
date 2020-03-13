const area = require('./data/area.json');
const summary = require('./data/summary.json');
const hotview = require('./data/hotview.json');
const travel = require('./data/travel.json');
const news = require('./data/news.json');
module.exports={
  devServer: {
	host:'localhost',
    port:8080,
    before(app){
	
      app.get('/area',(req,res,next)=>{
        res.json(area);
      }),
	  app.get('/sum',(req,res,next)=>{
	    res.json(summary);
	  }),
	  app.get('/hot',(req,res,next)=>{
	    res.json(hotview);
	  }),
	  app.get('/traveldata',(req,res,next)=>{
	    res.json(travel);
	  }),
	  app.get('/newsdata',(req,res,next)=>{
	    res.json(news);
	  })
    }
  },
  pages:{
          index:{
            // page 的入口
              entry:'src/main.js', 
            // 模板来源
              template:'public/index.html',
            // 在 dist/index.html 的输出
              filename:'index.html',
            // 当使用 title 选项时，
        	  // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
              title:'index',
            // 提取出来的通用 chunk 和 vendor chunk。
        	  //chunks: ["chunk-vendors", "chunk-common", "index"]
          },
          travel:{
              entry:'src/pages/travel.js',
              template:'public/travel.html',
              filename:'travel.html',
              title:'travel'
          }
}
}