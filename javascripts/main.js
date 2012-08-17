    
  
	 function lcz(){
	 		  
       	this.lrc_object = null;  //歌词显示父节点
     	this.lrc_lines=null;   //歌词字节点集合 
     	this.upkp = null;   //上一歌词行(如果有)
     	this.classV1="v1"; //一号className(原始) 
     	this.classV2="v2"; //二号className (设定)
     	this.classV3="v3"; //三号className  (另类)
     	this.initTop = 200;  //初始化显示位置 200 px
     	this.center = 150;   //歌词焦点中心位置   50 px 
     	this.empty = 20;   //初始化构建多少个 空对象 （ 同时表示 头和尾）
     	this.isDropLrc = true;  //是否启用本地歌词 拖入功能
     		// 解读歌词过程中用到的 标记
     	this.tag = {
         	sname :"ti",  //歌曲名
         	cname :"cl",  //作词
         	qname :"cs",  //作曲
         	bname :"ps",   //编曲
         	sgname :"ar",    //歌手名称
         	special :"al",   //所属专辑
         	kname :"by",		//歌词制作
         	end :"end"    //结束 语
     	};
     	
     	
     	
     			//设置  歌词焦点中心位置
     	this.setCenter = function(IntCenter){
     		this.center = IntCenter;
     		return this.center;
     	};
     		//  设置 显示父节点
     	this.setLrc_object = function(objId){
     		this.lrc_object= document.getElementById(objId);
     		return this.lrc_object;
     	};
     	
     	
     	this.toTimer = function( time ) {
        var  m, s;
        m =  Math.floor( time / 60 );
        m = isNaN( m ) ? '--' : ( m >= 10 ) ? m : '0' + m;
        s = Math.floor( time % 60 );
        s = isNaN( s ) ? '--' : ( s >= 10 ) ? s : '0' + s;
        return m + ':' + s;
    };
    	 
    	this.addLrc = function(cla,text,val){
    	   var lrc_line = document.createElement("li");
    	   	lrc_line.innerHTML = text?text:"";
    	   	lrc_line.className = cla?cla:"";
    	   	lrc_line.lang = val?val:"";
			this.lrc_object.appendChild(lrc_line);
			this.lrc_lines.push(lrc_line);
    	};
    	
         this.getLrcByValue = function(val){
         		le = this.lrc_lines.length
         		val = "^"+val+".*";
             for ( var i = 0; i < le; i++) {
				if(this.lrc_lines[i].lang.search(val)==0)return this.lrc_lines[i];
             }
			return null;
         };
         this.getLrcByValueInd = function(val){
      		le = this.lrc_lines.length-1
          for ( var i = le; i >= 0; i--) {
        	  p = this.lrc_lines[i].lang;
        	  if(p)
				if(p<val)return this.lrc_lines[i];
          }
			return null;
      };
         	
         this.setClassName= function(obj,className){if(obj)obj.className=className;};
         
         this.upTop = function(obj){
         	var thisTop = obj.offsetTop;   
         	var st =  this.lrc_object.scrollTop;  
         	var nextTop = thisTop-this.center;  
         	this.myf(this.lrc_object, st, nextTop);
         };
         	
         this.remove = function(){	
          	
          	if(this.lrc_lines!=null)
        	for ( var i = 0; i < this.lrc_lines.length; i++) {
				this.lrc_object.removeChild(this.lrc_lines[i]);
			}
			
				this.lrc_lines=new Array();
				
				if(!this.empty)
					alert("empty 属性有误! 该值必须>=零");
			this.setNbsp();	
         };
         		
         	this.setNbsp=function(){
         		for ( var it = 0; it < this.empty; it++) {   //头空白
					this.addLrc("", "&nbsp;", "");
					}
         	}
         	
         	
         this.load = function(json,fun){
         	sname = json[this.tag.sname];  
         	cname = json[this.tag.cname];
         	qname = json[this.tag.qname];
         	bname = json[this.tag.bname];
         	sgname = json[this.tag.sgname];
         	special = json[this.tag.special];
         	kname = json[this.tag.kname];
         	lrcs = json["lrcs"];
         	end = json[this.tag.end];
         	this.remove();   //初始化变量
         	if(sname)sname["time"]? this.addLrc(this.classV1, sname["name"], sname["time"]):this.addLrc(this.classV1, sname);
         	if(cname)cname["time"]? this.addLrc(this.classV1, cname["name"], cname["time"]):this.addLrc(this.classV1, cname);
         	if(qname)qname["time"]? this.addLrc(this.classV1, qname["name"], qname["time"]):this.addLrc(this.classV1, qname);
         	if(bname)bname["time"]? this.addLrc(this.classV1, bname["name"], bname["time"]):this.addLrc(this.classV1, bname);
         	if(sgname)sgname["time"]? this.addLrc(this.classV1,sgname["name"], sgname["time"]):this.addLrc(this.classV1,sgname);
         	if(special)special["time"]? this.addLrc(this.classV1,special["name"], special["time"]):this.addLrc(this.classV1,special);
         	if(kname)kname["time"]? this.addLrc(this.classV1, kname["name"], kname["time"]): this.addLrc(this.classV1, kname);
         	   if(lrcs)
         		for ( var index in lrcs) {
					this.addLrc(this.classV1, lrcs[index]["name"], lrcs[index]["time"]);
				}
         	if(end)end["time"]? this.addLrc(this.classV1, end["end"], end["time"]):this.this.addLrc(this.classV1, end);
         		this.setNbsp();
         	if(typeof fun =='function')
         	  fun.call(null,null);
         };
       
         this.Read = function(lrc,fun){
           if(fun!=null && typeof fun == "function") // 如果传入了解析函数， 就应该使用它，而不是使用原来的
           		return fun.call(this,lrc);        //使用者可以自定义解析方法
           		var jsons = {};
           		jsons["lrcs"] =new Array();
         	var lrs = lrc.split('['); 
         	var lejt = lrs.length;
         	for ( var i = 0; i < lejt; i++) {
				var element = lrs[i];
				var dic =  element.split(']');
         		if(dic.length==2)
         			if(dic[0].search("^[0-9]{2}:[0-9]{2}.[0-9]{2}$")<0){
         				
         					title =  dic[0].split(':');
         						if(title.length===2)
         					switch(title[0]){
         						case this.tag.sname:jsons[this.tag.sname]=title[1]; break;
         						case this.tag.cname:jsons[this.tag.cname]=title[1]; break;
         						case this.tag.qname:jsons[this.tag.qname]=title[1]; break;
         						case this.tag.bname:jsons[this.tag.bname]=title[1]; break;
         						case this.tag.sgname:jsons[this.tag.sgname]=title[1]; break;
         						case this.tag.special:jsons[this.tag.special]=title[1]; break;
         						case this.tag.kname:jsons[this.tag.kname]=title[1]; break;
         						case this.tag.end:jsons[this.tag.end]=title[1]; break;
         					}
         		}else{
         				
         					var lt = {"time":dic[0],"name":dic[1]};
         					jsons["lrcs"].push(lt);
         		}
			}
			return jsons;
         };
         		// 一个高级解析器 能够解析如 [00:10.20][00:30.15] happy go 
        this.vls1 = function(lrc){
    	var jsons = {};
          jsons["lrcs"] =new Array();
    	var al = lrc.length;
    	var begin=0,end=0;
    	var arr = new Array();
    	for ( var i = 0; i < al; i++) {
			if(lrc[i]=='['){
				if(i>8)
				if((lrc.slice(i-9,i-1)+"").search("^[0-9]{2}:[0-9]{2}.[0-9]{2}$")<0){
					arr.push(lrc.substring(begin, i));	
					begin = i;
				}
			}
		}
    	  	arr.push(lrc.substring(begin, al));
    	  	var tempJson = {},times = [];
    	   for ( var i = 0; i < arr.length; i++) {
				var line =  arr[i]; 
				var li = line.split(']');
					if(li.length===2){    
						if((li[0]+"").search("^\\[[0-9]{2}:[0-9]{2}.[0-9]{2}$")<0){
									
								li[0] = li[0].slice(1);
								title = li[0].split(':');
         						if(title.length===2)
         					switch(title[0]){
         						case this.tag.sname:jsons[this.tag.sname]=title[1]; break;
         						case this.tag.cname:jsons[this.tag.cname]=title[1]; break;
         						case this.tag.qname:jsons[this.tag.qname]=title[1]; break;
         						case this.tag.bname:jsons[this.tag.bname]=title[1]; break;
         						case this.tag.sgname:jsons[this.tag.sgname]=title[1]; break;
         						case this.tag.special:jsons[this.tag.special]=title[1]; break;
         						case this.tag.kname:jsons[this.tag.kname]=title[1]; break;
         						case this.tag.end:jsons[this.tag.end]=title[1]; break;
         					}
						}else{
								
								
								time = li[0].slice(1)+"";
         					tempJson[time]=li[1];  
         					times.push(time);
						}
					}else if(li.length>2){   
						var time,lrc;
						lrc = li[li.length-1];
						for(var element in li){
							if(li[element].search	("^\\[[0-9]{2}:[0-9]{2}.[0-9]{2}$")==0){  
								time = li[element].slice(1)+"";
								tempJson[time]=lrc;
								times.push(time);
							}
						}
					}
				}
    	  	times = times.sort();
    	  	for ( var element in times) {
    	  	 t = times[element];
				var lt = {"time":t,"name":tempJson[t]};
				jsons["lrcs"].push(lt);
			}
    	  	return jsons;
         };
         	
         this.localPath = function(path){
         };
         	
         this.localFile = function(){
         };
        
         this.netRead = function(uri,song,songer){

         };
         
         		
         this.myf_Init = function(ol){
         	if(this.lrc_object==null){
         	this.setLrc_objec(ol);  
         		if(this.lrc_object==null){
         			alert("无法获取所需节点！ 请检查！");
         			return false;
         		}
         	}
			
         	if(this.isDropLrc){  //注册拖动
         		this.logon(false);
         	}
         	this.lrc_object.scrollTop=this.initTop+"px";
         };
         
	         	
         this.torun = function(){
          var time=this.toTimer(Math.round( event.srcElement.currentTime * 100 ) / 100); // 获取时间
          var line =this.getLrcByValueInd(time);
          	if(line)
	          if(this.upkp!=line){
		          this.setClassName(line,"v2");
		          this.upTop(line);
		          if(this.upkp)this.setClassName( this.upkp,"v1");
		          this.upkp = line;
	          }
         };
         
         	//注册鼠标拖入事件
         	//@param tag  接受拖入事件的 标签  的 id   默认为 body
         this.logon = function(tag){
         	if (window.FileReader) {

		var cnt = this.lrc_object;
          if(tag){
          cnt = document.getElementById(tag);
          }
		// 处理拖放文件列表
		function handleFileSelect(evt) {
			evt.stopPropagation();
			evt.preventDefault();

			var files = evt.dataTransfer.files;

		for (var i = 0, f; f = files[i]; i++) {
					var reader = new FileReader();
 					reader.onloadend = (function (theFile) {
						return function (e) {
							img = e.target.result;
							if(img)
							this.load(this.Read(img));
						};
					})(f)
    					reader.readAsText(f);
			}
		}
		
		// 处理插入拖出效果
		function handleDragEnter(evt){ this.setAttribute('style', 'border-style:dashed;'); }
		function handleDragLeave(evt){ this.setAttribute('style', ''); }

		// 处理文件拖入事件，防止浏览器默认事件带来的重定向
		function handleDragOver(evt) {
			evt.stopPropagation();
			evt.preventDefault();
		}
		
		cnt.addEventListener('dragenter', handleDragEnter, false);
		cnt.addEventListener('dragover', handleDragOver, false);
		cnt.addEventListener('drop', handleFileSelect, false);
		cnt.addEventListener('dragleave', handleDragLeave, false);
		cnt.addEventListener('ondragend', handleDragLeave, false);
		
	} else {
		alert('你的浏览器不支持啊，同学');
	}
   };
     	
     	var timer = null;  // 要用到的计时器
     this.myf=function(obj,f,m){
     		if(timer!=null){
     			clearTimeout(timer);
     		}
     		this.isUpOrDown(obj, f, m);
     };
	 getUpValue = function(f,m){
     	if((m-f)>100){
     				f+=30;
     			}else if((m-f)>50){
     			   f+=10;
     			}else if((m-f)>20){
     			   f+=5;
     			}else if((m-f)>1){
     			   f++;
     			}
     			return f;
     	};
     	
     	getDowmValue = function(f,m){
     	if((f-m)>100){
     			   f-=30;
     			}else if((f-m)>50){
     			   f-=10;
     			}else if((f-m)>20){
     			   f-=5;
     			}else if((f-m)>1){
     			   f--;
     			}
     			return f;
     	};
     this.isUpOrDown = function(obj,f,m){
     	(f<m)?this.toUp(obj, f, m):this.toDown(obj, f, m);
     };
	 
     this.toUp = function(obj,f,m){
	      timer = setInterval(function(){
	     			if(f>=m){
	     				clearTimeout(timer);timer=null;obj.scrollTop = m;
	     			}
	     			
	     			obj.scrollTop = f;
	     			f=getUpValue(f,m);
	     			
	     		}, 10);
     };
     this.toDown = function(obj,f,m){
	    timer = setInterval(function(){
	     			if(f<=m){
	     				clearTimeout(timer);timer=null;obj.scrollTop = m;
	     			}
	     			obj.scrollTop = f;
	     			f=getDowmValue(f,m);
	     			
	     		}, 30);
     };
     	
       	
     
     }    