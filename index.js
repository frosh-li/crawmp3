var request = require("request");
var urlparse = require('url');
var url = process.argv[2];
var fs = require("fs");
if(url == ""){
    console.log('请输入网址');
	return;	
}

function parse(url){
    request.get(url,function(err,response,body){
        if(err){
            console.log('解析失败',err.message);
            return;
        }
        var playlists = body.toString().match(/([^\']+\.mp3)/gmi);
        console.log(playlists);
        playlists.forEach(function(playlist){
            var download_url = urlparse.resolve(url,playlist);
            var save_url = download_url.match(/[0-9a-zA-Z_]+\.mp3/)[0];
            console.log('开始下载，下载完成后会自动退出进程，请等待',urlparse.resolve(url,playlist));
            request(download_url).pipe(fs.createWriteStream(save_url));
        });
    });
}

parse(url);