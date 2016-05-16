var datagridD;
// 初始化datagrid

datagridD = [{
	field : 'id',
	title : '编号',
	//hidden : true,
	width : 50
}, {
	field : 'title',
	title : '标题',
	width : 400,
	align : 'center'
},{
	field : 'parseDate',
	title : '创建日期',
	width : 100,
	align : 'center'
},{
	field : 'author',
	title : '创建者',
	width : 100,
	align : 'center'
}

];

var tabrs;
tabrs = [ {

	text : '查询',
	iconCls : 'icon-search',
	handler : function() {
		queryNews();
	}

}, '-', {
	text : '新增',
	iconCls : 'icon-add',
	handler : function() {
		add();
	}
}, '-', {
	text : '删除',
	iconCls : 'icon-remove',
	handler : function() {
		removeNews();
	}
}, '-', {
	text : '编辑',
	iconCls : 'icon-edit',
	handler : function() {
		modifyNews();
	}
}, '-', {
	text : '上首页',
	iconCls : 'icon-thumb',
	handler : function() {
		upToIndex();
	}
}, '-', {
	text : '取消首页',
	iconCls : 'icon-down',
	handler : function() {
		downToIndex();
	}
}

];


/**
 *将该文章选为首页展示 
 */
function upToIndex(){
	var all = $('#news_list').datagrid("getData") ;
	var is_index = 0 ;//表示所有数据中已经是首页的文章的数量
	for ( var i = 0; i < all.total; i++) {
		if(all.rows[i].is_index == "1"){
			is_index = is_index+1 ;
		}
	}
	if(is_index >=6){
		$.messager.show({
			msg : "已经有六张文章置顶了！",
			title : '提示'
		});
		return ;
	}
	
	
	var list = new Array();
	var rows = $('#news_list').datagrid('getSelections');
	var selectNum = rows.length;
	if((is_index + selectNum)>6 ){
		var can = 6-is_index ;
		$.messager.show({
			msg : "最多只能置顶六张，您还可以选择"+can+"张",
			title : '提示'
		});
		return ;
	}
	
	if (rows.length != 0) {
		$.messager.confirm('询问', '您确定要置顶所选中的数据吗?', function(answer) {
			if (answer) {
				for ( var i = 0; i < rows.length; i++) {
					list.push(rows[i].id);
					if(rows[i].is_index=="1"){
						$.messager.show({
							msg : "有已经是首页的文章，请重新选择！",
							title : '提示'
						});
						return ;
					};
					if(rows[i].img_path==undefined){
						$.messager.show({
							msg : "有文章内容中没有图片，不能置顶！",
							title : '提示'
						});
						return ;
					};
				}
				$.ajax( {
					type:"POST", 
					url : 'news/upToIndex?ids=' + list,
					cache : false,
					success : function(r) {
					$("#news_list").datagrid('clearSelections'); // 清空选择状态
					$("#news_list").datagrid('reload');
					$.messager.show( {
						msg : "置顶成功！",
						title : '提示'
					});
				}
				});
			}
		});
	} else {
		$.messager.show( {
			msg : '请至少选中一行!',
			title : '提示'
		});
	}
}


/**
 *将文章取消首页展示 
 */
function downToIndex(){

	var list = new Array();
	var rows = $('#news_list').datagrid('getSelections');
	if (rows.length != 0) {
		$.messager.confirm('询问', '您确定要置顶所选中的数据吗?', function(answer) {
			if (answer) {
				for ( var i = 0; i < rows.length; i++) {
					list.push(rows[i].id);
					if(rows[i].is_index !="1"){
						$.messager.show({
							msg : "有已经不是首页的文章，请重新选择！",
							title : '提示'
						});
						return ;
					};
				}
				$.ajax( {
					type:"POST", 
					url : 'news/downToIndex?ids=' + list,
					cache : false,
					success : function(r) {
					$("#news_list").datagrid('clearSelections'); // 清空选择状态
					$("#news_list").datagrid('reload');
					$.messager.show( {
						msg : "置顶成功！",
						title : '提示'
					});
				}
				});
			}
		});
	} else {
		$.messager.show( {
			msg : '请至少选中一行!',
			title : '提示'
		});
	}
}


function queryNews(){
	$("#queryNewsWin").window("open") ;
}
function add(){
	$("#addNewsWin").window("open") ;
//	CKEDITOR.instances.content_add.setData("请输入内容"); 
}

function submitQuery(){
	var title = $("#news_name_query").val() ;
	var content = $("#news_content_query").val() ;
	var is_index =$("#is_index_query").combobox("getValue") ;
	if(title==""){
		title=undefined;
	}
	if(content ==""){
		content = undefined;
	}
	if(is_index==""){
		is_index=undefined;
	}
	var json ={
		"title":title,
		"content":content,
		"is_index":is_index
	};
	$("#news_list").datagrid('options').url = 'news/getNewsList';
	$("#news_list").datagrid('options').queryParams = json;
	$("#news_list").datagrid('load');
	$('#queryNewsWin').window("close");
	
}

function modifyNews(){
	var target = $('#news_list').datagrid('getSelections');
	if (target.length < 1) {
		$.messager.show( {
			msg : '请选择一条数据进行修改!',
			title : '提示'
		});
	}else if(target.length >1){
		$.messager.show( {
			msg : '只能选择一条数据进行修改!',
			title : '提示'
		});
	}else{
		$("#modifyNewsWin").window("open") ;
		$("#news_name_edit").val(target[0].title);
		CKEDITOR.instances.content_edit.setData(target[0].content); 
	}
}

function closeWin(obj){
	$("#"+obj).window('close') ;
}
/**
 * 保存修改
 */
function saveEdit(){
	var target = $('#news_list').datagrid('getSelections');
	var title = $("#news_name_edit").val() ;
	var content = CKEDITOR.instances.content_edit.getData() ;
	if(title ==""|| content ==""){
		$("#showMsg_edit").html("请将数据填写完整");
		return ;
	}else{
		$("#showMsg_edit").html("");
	}
	var json ={
		"id":target[0].id,
		"title":title,
		"content":content
	}
	
    $.ajax({            
        type:"POST",   //post提交方式默认是get
        url:"news/edit", 
        data:json, 
        error:function(request) {      // 设置表单提交出错                 
            $("#showMsg").html(request);  //登录错误提示信息
        },
        success:function(data) {
        	  if(data=="false"){
        		  $.messager.show( {
      				msg : '权限不足',
      				title : '提示'
      			});
        	  	  return ;
        	  }else{
        		  	$("#news_list").datagrid('reload');	
        		  	$("#modifyNewsWin").window("close") ;
        			$.messager.show( {
        				msg : '修改成功',
        				title : '提示'
        			});
        	  }
        }            
  });
}
/**
 * 新增用户之前的验证
 */
function turnToAdd(){
	var content = CKEDITOR.instances.content_add.getData();
	var title = $("#news_name_add").val() ;
	if(title =="" || content =="" ){
		$("#showMsg").html("请将数据填写完整");
		return ;
	}else{
		$("#showMsg").html("");
	}
	
	var json = {
		"title": title,
		"content":content
	};

    $.ajax({            
        type:"POST",   //post提交方式默认是get
        url:"news/create", 
        data:json, 
        error:function(request) {      // 设置表单提交出错                 
            $("#showMsg").html(request);  //登录错误提示信息
        },
        success:function(data) {
        	  if(data=="false"){
        	  	  $("#showMsg").html("系统错误");
        	  	  return ;
        	  }else{
        		  	$("#news_list").datagrid('reload');	
        		  	$("#addNewsWin").window("close") ;
        			$.messager.show( {
        				msg : '新增成功',
        				title : '提示'
        			});
        	  }
        }            
  }); 
}

//删除数据
function removeNews() {

	var list = new Array();
	var rows = $('#news_list').datagrid('getSelections');
	if (rows.length != 0) {
		$.messager.confirm('询问', '您确定要删除所选中的数据吗?', function(answer) {
			if (answer) {
				for ( var i = 0; i < rows.length; i++) {
					list.push(rows[i].id);
				}
				$.ajax( {
					type:"get", 
					url : 'news/delete?ids=' + list + '',
					cache : false,
					success : function(r) {
					$("#news_list").datagrid('clearSelections'); // 清空选择状态
					$("#news_list").datagrid('reload');
					$.messager.show( {
						msg : "删除成功！",
						title : '提示'
					});
				}
				});
			}
		});
	} else {
		$.messager.show( {
			msg : '请至少选中一行!',
			title : '提示'
		});
	}

}

$(function(){
	$("#addNewsWin").window("close") ;
	$("#modifyNewsWin").window("close") ;
	$("#queryNewsWin").window("close") ;

	$('#news_list').datagrid({
		url : 'news/getNewsList', // 这里可以是个json文件，也可以是个动态页面，还可以是个返回json串的function
		frozenColumns : [ [ {
			field : 'ck',
			checkbox : true
		} ] ],
		columns : [ datagridD ],
		rownumbers : true,
		idField : 'id',
		striped : true,
		pageSize : 25,
		pageList : [ 5,25, 35, 45, 55 ],
		nowrap : false,//可以换行显示
		loadMsg : '数据加载中...请稍等',
		pagination : true,
		height : 'auto',
		fit : true,
		toolbar : tabrs,
		border : false,
		rowStyler: function(index,row){
			if (row.is_index=='1'){
				return 'background-color:#6293BB;color:#fff;';
			}
		},
		onDblClickRow : function(rowIndex, rowData) {

		}
	});
}) ;

function formClear(obj){
	$("#"+obj).form("clear") ;
	CKEDITOR.instances.content_add.setData(""); 
}
