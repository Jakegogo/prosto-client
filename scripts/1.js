(function (param) {
    var size = param.size;

    // 执行sql
    presto.execute('select * from com_t_region limit ' + size, function(error, data, columns){
        // 回调输出
        response.end(JSON.stringify({result: data, columns:columns, error:error}, null, '\t'));
    });

})