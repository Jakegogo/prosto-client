(function (param) {
    var size = param.size;

    // ִ��sql
    presto.execute('select * from com_t_region limit ' + size, function(error, data, columns){
        // �ص����
        response.end(JSON.stringify({result: data, columns:columns, error:error}, null, '\t'));
    });

})