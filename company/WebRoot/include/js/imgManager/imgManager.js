var datagridD;

datagridD = [{
	field : 'id',
	title : '编号',
	//hidden : true,
	width : 50
}, {
	field : 'name',
	title : '名称',
	width : 200,
	align : 'center'
},{
	field : 'path',
	title : '图片地址',
	width : 250,
	align : 'center'
},{
	field : 'url',
	title : '图片',
	width : 180,
	align : 'center'
},{
	field : 'img_size',
	title : '图片大小',
	width : 180,
	align : 'center'
},{
	field : 'remark',
	title : '备注',
	width : 150,
	align : 'center'
},{
	field : 'parseDate',
	title : '创建日期',
	width : 150,
	align : 'center'
}

];

var tabrs;
tabrs = [ {

	text : '查询',
	iconCls : 'icon-search',
	handler : function() {
		queryImg();
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
		removeImg();
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
 *将图片选为首页展示 
 */
function upToIndex(){
	var all = $('#img_list').datagrid("getData") ;
	var is_index = 0 ;//表示所有数据中已经是首页的图片的数量
	for ( var i = 0; i < all.total; i++) {
		if(all.rows[i].is_index == "1"){
			is_index = is_index+1 ;
		}
	}
	if(is_index >=6){
		$.messager.show({
			msg : "已经有六张图片置顶了！",
			title : '提示'
		});
		return ;
	}
	
	
	var list = new Array();
	var rows = $('#img_list').datagrid('getSelections');
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
							msg : "有已经是首页的图片，请重新选择！",
							title : '提示'
						});
						return ;
					};
				}
				$.ajax( {
					type:"POST", 
					url : 'img/upToIndex?ids=' + list,
					cache : false,
					success : function(r) {
					$("#img_list").datagrid('clearSelections'); // 清空选择状态
					$("#img_list").datagrid('reload');
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
 *将图片取消首页展示 
 */
function downToIndex(){

	var list = new Array();
	var rows = $('#img_list').datagrid('getSelections');
	if (rows.length != 0) {
		$.messager.confirm('询问', '您确定要置顶所选中的数据吗?', function(answer) {
			if (answer) {
				for ( var i = 0; i < rows.length; i++) {
					list.push(rows[i].id);
					if(rows[i].is_index !="1"){
						$.messager.show({
							msg : "有已经不是首页的图片，请重新选择！",
							title : '提示'
						});
						return ;
					};
				}
				$.ajax( {
					type:"POST", 
					url : 'img/downToIndex?ids=' + list,
					cache : false,
					success : function(r) {
					$("#img_list").datagrid('clearSelections'); // 清空选择状态
					$("#img_list").datagrid('reload');
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

function queryImg(){
	$("#queryImgWin").window("open") ;
}
function add(){
	$("#addImgWin").window("open") ;
}

function submitQuery(){
	var name = $("#img_name_query").val() ;
	var is_index =$("#is_index_query").combobox("getValue") ;
	if(name==""){
		name=undefined;
	}
	if(is_index==""){
		is_index=undefined;
	}
	var json ={
		"name":name,
		"is_index":is_index
	};
	$("#img_list").datagrid('options').url = 'img/getImgList';
	$("#img_list").datagrid('options').queryParams = json;
	$("#img_list").datagrid('load');
	$('#queryImgWin').window("close");
	
}

function modifyImg(){
	var target = $('#img_list').datagrid('getSelections');
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
		$("#modifyImgWin").window("open") ;
		$("#function_name_edit").val(target[0].name);
		$("#function_url_edit").val(target[0].function_url);
		$("#remark_edit").val(target[0].remark) ;
	}
}

function closeWin(obj){
	$("#"+obj).window('close') ;
}
/**
 * 保存修改
 */
function saveEdit(){
	var target = $('#img_list').datagrid('getSelections');
	var function_name = $("#function_name_edit").val() ;
	var function_url = $("#function_url_edit").val() ;
	var remark = $("#remark_edit").val() ;
	if(function_name =="" ){
		$("#showMsg_edit").html("请将数据填写完整");
		return ;
	}else{
		$("#showMsg_edit").html("");
	}
	var json ={
		"id":target[0].id,
		"function_name":function_name,
		"function_url":function_url,
		"remark":remark
	}
	
    $.ajax({            
        type:"POST",   //post提交方式默认是get
        url:"function/edit", 
        data:json, 
        error:function(request) {      // 设置表单提交出错                 
            $("#showMsg").html(request);  //登录错误提示信息
        },
        success:function(data) {
        	  if(data=="false"){
        	  	  $("#showMsg_edit").html("系统错误");
        	  	  return ;
        	  }else{
        		  	$("#img_list").datagrid('reload');	
        		  	$("#modifyImgWin").window("close") ;
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
	var file = $("#file").val() ;
	var index = file.lastIndexOf(".");
	file = file.substring(index + 1);
	alert(file == "jpg" || file == "gif" || file == "png") 
	$("#addImgForm").submit(function(){
		if( file == "jpg" || file == "gif" || file == "png" ){
			alert("进入了图片");
			return true;
		}else{
//			alert("只能上传图片") ;
			alert("没有进入了图片");
			$('#error').modal('show');
			return false ;
		}
	});
	
}

//删除数据
function removeImg() {

	var list = new Array();
	var names = new Array() ;
	var rows = $('#img_list').datagrid('getSelections');
	if (rows.length != 0) {
		$.messager.confirm('询问', '您确定要删除所选中的数据吗?', function(answer) {
			if (answer) {
				for ( var i = 0; i < rows.length; i++) {
					list.push(rows[i].id);
					names.push(rows[i].path) ;
				}
				$.ajax( {
					type:"POST", 
					url : 'img/delete?ids=' + list+"&names="+names,
					cache : false,
					success : function(r) {
					$("#img_list").datagrid('clearSelections'); // 清空选择状态
					$("#img_list").datagrid('reload');
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
	
	$("#addImgForm").submit(function(){
		var file = $("#file").val() ;
		var index = file.lastIndexOf(".");
		file = file.substring(index + 1);
		if( file == "jpg" || file == "gif" || file == "png" ){
			return true;
		}else{
//			alert("只能上传图片") ;
			$('#error').modal('show');
			return false ;
		}
	});
	
	
	$("#addImgWin").window("close") ;
	$("#modifyImgWin").window("close") ;
	$("#queryImgWin").window("close") ;
	
	$('#img_list').datagrid({
		url : 'img/getImgList', // 这里可以是个json文件，也可以是个动态页面，还可以是个返回json串的function
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
		nowrap : true,
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
}

