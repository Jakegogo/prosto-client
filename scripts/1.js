(function (param) {
    var size = param.size;

    // Ö´ÐÐsql
    var result = presto.executeSync('select * from com_t_region limit ' + size);

    response.end(JSON.stringify(result, null, '\t'));

    //var request = require('urllib-sync').request;
    //var res = request('http://www.baidu.com');
    //response.end(res.data);

    //var result = ResultSet('select * from com_t_region limit ');

})