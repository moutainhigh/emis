var OrderIdform_order = function () {
    var tableId = "orderIdTable";
    var oTable = null;

  //初始化加载表格数据的表头定义
    var initTableHeaderInfo = function(){
        var aoColumns = [
	        {
	             "sTitle":'<th class="table-checkbox"><input type="checkbox" class="group-checkable" data-set="#'+tableId+' .checkboxes"/></th>',
	             "bSortable": false,
	             "bSearchable": false,
	             'sWidth':'2%',
	             "mDataProp" : "",
	             "sDefaultContent" : "",
	             "sVisible" : false,
	             "fnCreatedCell" : function(nTd, sData, oData, iRow, iCol) {
	                 $(nTd).append('<td class="table-checkbox">');
	                 if(oData.paystatus=="待发货"){
	                     $(nTd).append('<input type="checkbox" class="checkboxes" value="'+ oData.id +'"/>');
	                 }else{	                	
	                	 $(nTd).append('');
	                 }
	                 $(nTd).append('</td>');
	             }
	        },
            {
				"sTitle": "",
				"mDataProp" : "",
				'sWidth':'2%',
				"sDefaultContent" : "",//此列默认值为""，以防数据中没有此值，DataTables加载数据的时候报错
				"sVisible" : false,
				"fnCreatedCell" : function(nTd,sData, oData, iRow, iCol) {
						$(nTd).append("<span class='row-details row-details-close'></span>");
						$(nTd).append("<input type='hidden' name='orderId' value="+oData.id+">");
				}
			},
            { "sTitle": "订单号", "mData": "outno"},
            {
				"sTitle": "总金额/积分",
				'sWidth':'7%',
				"mDataProp" : "",
				"sDefaultContent" : "",
				"sVisible" : false,
				"fnCreatedCell" : function(nTd,sData, oData, iRow, iCol) {
					if(oData.malltype=="wMall" || oData.malltype=="gMall"){
						$(nTd).append("￥"+"<input id='priceInput' style='width:45px;' type='text' value="+oData.fee/100+"  readonly='true'/> ");
					}else{
						$(nTd).append(oData.fee+"分");
					}
				}
			},
			{
				"sTitle": "运费",
				'sWidth':'3%',
				"mDataProp" : "",
				"sDefaultContent" : "",
				"sVisible" : false,
				"fnCreatedCell" : function(nTd,sData, oData, iRow, iCol) {
					$(nTd).append("￥"+oData.freight/100);
				}
			},
            { "sTitle": "数量",'sWidth':'4%', "mData": "nums" },
            { "sTitle": "会员手机号",'sWidth':'4%', "mData": "mobilephone" },
            { "sTitle": "流水号",'sWidth':'4%', "mData": "thirdno" },
            {
            	"sTitle": "商城类型",
            	"mDataProp" : "",
            	'sWidth':'7%',
            	"sDefaultContent" : "",
            	"sVisible" : false,
            	"fnCreatedCell" : function(nTd,sData, oData, iRow, iCol) {
            		$(nTd).append(
            				"<label class='label label-success'>"+convertMalltype(oData.malltype)+
            				"&nbsp;&nbsp;"+convertOrdertype(oData.ordertype) +"</label>"
            		);
            	}
            },
            {
            	"sTitle": "支付类型",
            	"mDataProp" : "",
            	'sWidth':'7%',
            	"sDefaultContent" : "",
            	"sVisible" : false,
            	"fnCreatedCell" : function(nTd,sData, oData, iRow, iCol) {
            		$(nTd).append(convertPayType(oData.paytype));
            	}
            },
			{
				"sTitle": "订单状态",
				"mDataProp" : "",
				'sWidth':'7%',
				"sDefaultContent" : "",
				"sVisible" : false,
				"fnCreatedCell" : function(nTd,sData, oData, iRow, iCol) {
					$(nTd).append("<label class='label label-success'>"+oData.paystatus+"</label>");
				}
			},
			{
				"sTitle": "下单时间",
				"mDataProp" : "",
				"sDefaultContent" : "",
				"sVisible" : false,
				"fnCreatedCell" : function(nTd,sData, oData, iRow, iCol) {
					$(nTd).append(changeDateFormat(oData.addtime));
				}
			},
			{
				"sTitle": "付款时间",
				"mDataProp" : "",
				"sDefaultContent" : "",
				"sVisible" : false,
				"fnCreatedCell" : function(nTd,sData, oData, iRow, iCol) {
					$(nTd).append((oData.paytime==null ? "" :changeDateFormat(oData.paytime)));
				}
			}
        ];
        //渲染特殊的列(操作列)
        var aoColumnDefs =[];
            aoColumns.push({
            	"sTitle": "操作",
            	"mDataProp" : "",
            	"sDefaultContent" : "",
            	"sVisible" : false, 
            	"fnCreatedCell": function(nTd,sData, oData, iRow, iCol){
            		
            	} 
            });

        return {
            aoColumns : aoColumns
            //aoColumnDefs : aoColumnDefs
        };
    };
    


    //加载表格数据
    var loadTableData = function(){
        var headerInfo = initTableHeaderInfo();
        var search = $("#orderSearchForm").serializeArray();
        oTable = $('#'+tableId).DataTable({
        	"fnServerParams": function (aoData) {
        		$.each(search, function(index, value){
        			aoData.push({"name": value.name, "value": value.value})
                });
        	},
            "sAjaxSource": "queryOrderIDByPage", 	//刷新页面
            "sAjaxDataProp": "queryResult", 
            "bFilter" : true,
            "bInfo": true,
            "bJQueryUI": true,
            "bLengthChange": true,
            "bPaginate": true,
            "bProcessing": true,
            "bSort": false,
            "bSortClasses": true,
            "bStateSave": true,
            "bAutoWidth":true,
            "bSortCellsTop": true,
            "iTabIndex": 1,
            "sServerMethod": "POST",
            "bServerSide": true,
            "aoColumns": headerInfo.aoColumns,
            "aoColumnDefs" : headerInfo.aoColumnDefs,
            "iDisplayLength": 10,
            "oLanguage": {
                "sLengthMenu": "显示 _MENU_ 条记录",
                "sInfo": "当前显示 _START_ 到 _END_ 总共 _TOTAL_ 条记录",
                "sInfoEmpty" : "",
                "sZeroRecords" : "当前没有记录",
                "sSearch" : "搜索：",
                "oPaginate": {
                    "sFirst":"首页",
                    "sPrevious": "上一页",
                    "sNext": "下一页",
                    "sLast":"末页"
                }
            }
        });
    };

    
	//修改价格按钮
    var editPriceBtn = function(btn){  	 
    	 var $price = $(btn).prev('input');
         if($price.attr("readonly")=="readonly"){
         	$(btn).html("确定");
         	$price.attr("readonly",false);
         	}else{
        	 if(isNaN($price.val())){
        		return false;
        	}
         	$price.attr("readonly",true);
         	$(btn).html("修改");
         	$.ajax({
                 type: "post",
                 data: {
                 	 fee : $price.val()*100,
                 	 id  : $(btn).attr("dealId") 
                 },
                 url: 'modifyOrder',
                 success: function (data) {
                    oTable.fnDestroy();
                    Orderform_order.loadTableData();
                 }
             });
         }
     
    };
    	
  
    var initToolBar = function(){
        $("#confirmWin").on("show.bs.modal", function(e){
            var orderFormId = $(e.relatedTarget).attr("orderFormId");
            $("#orderFormId").val('').val(orderFormId);
        });
        
        
        //确认退款按钮出发时间
        $("#confirmBtn").on("click", function(){
        	 $.ajax({
                 type : "post",
                 dataType : "json",
                 url : "refund",
                 data : { 
                	 id : $("#orderFormId").val(),
                	 process : 7,
                 	 status : 2  //退款状态
                 },
                 success : function(data){
                 	 $("#confirmWin").modal("hide");
                 	 oTable.fnReloadAjax();       //刷新datatable列表
                 }
             })
        });
        
      //筛选tab页点击事件
  	  $("#orderListTab").delegate('li', 'click', function(){
  		$("#process").attr("value",$(this).attr("process"));
  		$("#status").attr("value",$(this).attr("status"));
			if(oTable && $(this).attr("class")=="active"){
	             return false;
	        }
			oTable.fnDestroy();
        	loadTableData(); 
        });
    	
  	  //清空input框等
  	 function clean() {
         $(':input').not(':text',':button, :submit, :reset, :hidden').val('').removeAttr('checked') .removeAttr('selected');
    };
  	  
  	  //绑定日历
      if (jQuery().timepicker) {
      	$('.timepicker').timepicker({
      		  template: 'dropdown' ,
              showMeridian: false,
              autoclose: true,
              language: "zh-CN",
              defaultTime:""
          });
      }
  	  
    	
        //绑定日历
        if (jQuery().datepicker) {
        	$('.date-picker').datepicker({
                format: 'yyyy-mm-dd',
                weekStart: 1,
                todayBtn: 'linked',
                rtl: App.isRTL(),
                language: "zh-CN",
                autoclose: true
            });
        }
        
        //订单确认收货
        $("#confirmWin3").on("show.bs.modal", function(e){ //触发相关赋值
            var id = $(e.relatedTarget).attr("id");
            $("#id").val('').val(id);
        });
        $("#confirmBut2").on("click", function(){
        	var param = {orderId : $("#id").val()};
        	console.log(param);
            $.ajax({
                type : "post",
                dataType : "json",
                url : "merriplusApi/receiveOrderProduct",
                data : param,
                success : function(data) {
                    if(data.status=="00"){
                        oTable.fnReloadAjax();
                        bootbox.alert("确认收货成功");
                        $("#confirmWin3").modal("hide");
                    }else{
                        bootbox.alert("确认收货失败");
                    }
                }
            });
        });
        
        //订单发货
        $("#confirmWin2").on("show.bs.modal", function(e){ //触发相关赋值
            var id = $(e.relatedTarget).attr("id");
            $("#id").val('').val(id);
        });
        $("#confirmBut").on("click", function(){
        	var param = {orderId : $("#id").val()};
        	console.log(param);
            $.ajax({
                type : "post",
                dataType : "json",
                url : "merriplusApi/sendOrder",
                data : param,
                success : function(data) {
                    if(data.status=="00"){
                        oTable.fnReloadAjax();
                        bootbox.alert("发货成功");
                        $("#confirmWin2").modal("hide");
                    }else{
                        bootbox.alert("发货失败");
                    }
                }
            });
        });
    	
	   //jQuery('#'+tableId+' .group-checkable').change(function () {
	   jQuery('#'+tableId).on('change', '.group-checkable', function(){
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).attr("checked", true);
                    $(this).parents('tr').addClass("active");
                } else {
                    $(this).attr("checked", false);
                    $(this).parents('tr').removeClass("active");
                }
            });
            jQuery.uniform.update(set);
        });
        
    	//批量发货操作
        $("#sendOrderBut").on("click", function(){
            var orderIds = getSelectOrderIds();
    		
    		var str = [];
    		//var len=seachboxs.length;
			$('#'+tableId +' tbody tr .checkboxes:checked').each(function() {
				this.checked = !this.checked;
				str += $(this).val()+",";
				console.log(str)
			});
			//s=s.substring(0,s.Length-1)；
    		if (str == "") {
    		alert("请至少选择一个");
    		return;
    		}
            $.ajax({
                type: "post",
                data: {
                	"orderId":str
                },
                url: 'batchSendOrder',
                success: function (data) { 
                }               
            });
            bootbox.alert("所有订单已发货成功!");                                
        	oTable.fnDestroy();
	    	loadTableData();  
        });
        
	    jQuery('#'+tableId).on('change', 'tbody tr .checkboxes', function(){
	    	console.log($(this).parents('tr'))
	    	$(this).parents('tr').toggleClass("active");
	    });
	    	
		
	
	    //保存
	    $("#statusSearch").on("click", function(){
	    	oTable.fnDestroy();
	    	var a = $("#telPhone").val();
	        console.log(a);
	    	loadTableData();	
	    	clean();
	    });
	        
	    	
		//注册点击查看详情事件
	    $('#'+tableId).on('click', ' tbody td .row-details', function () {
	        var nTr = $(this).parents('tr')[0];
	        //获取隐藏域的userId值
	        var orderId = $(this).parents('tr').find("input:hidden").val();
	        if (oTable.fnIsOpen(nTr)){
	            /* 关闭 */
	            $(this).addClass("row-details-close").removeClass("row-details-open");
	            oTable.fnClose(nTr);
	        }else{
	            /* 打开 */
	            $(this).addClass("row-details-open").removeClass("row-details-close");
	            Orderform_order.fnFormatDetails(oTable, nTr, orderId);
	        }
	    });
	    	
	
	    $("#exportExcel").on("click", function(){
	    	var params = 'payType='+payType+'&merchantId='+merchantId+'&province='+province+
            '&city='+city+'&area='+area+'&process='+process+'&status='+status+
            '&startTime='+startTime+'&endTime='+endTime+'&startDate='+startDate+'&endDate='+endDate;
	    	window.open(url + '?' + params);
	    });
		};
    
    
    //加载用户详情函数
    var fnFormatDetails = function(oTable, nTr, orderId)
    {
       $.ajax({
	   		 type : "post",
	   		 dataType : "json",
	   		 data : {orderId : orderId},
	   		 url : "merriplusApi/getOrderInfoByOrderId",
	   		 success : function(data){
                 var sOut = '<table>';
                 if(data.status =="00"){
                     var orderInfo = data.data.orderInfo;
	                 var addressInfo= data.data.addressInfo;
	                 var orderProductsInfo= data.data.orderProductsInfo;
	                 var parentMemberInfo= data.data.member;
	                 if(addressInfo==null){}else{
	                	 sOut +='<tr><td style="font-weight:bold;">收货信息:</td>' +
                         '<td style="padding-right:30px;">'+(addressInfo.name==null ? "" :  addressInfo.name)+'，&nbsp;'+addressInfo.phone
                         +'，&nbsp;'+addressInfo.regson+'&nbsp;'+addressInfo.address+'</td></tr>';
	                 }
	                 sOut += '<tr><td style="font-weight:bold;">商品信息:</td>';
                    
                      $.each(orderProductsInfo, function(index, item){
                      	      sOut +='<td style="float:left;padding-right:30px;"><img src="'+ item.productcoverimg +'" width=45px height=45px style="border-radius:10px;"/> '+
                      	      		  '<span>'+item.productname+'，'+item.nums+'份，￥'+item.price/100 + '；' +'</span></td>';
                      });
                      sOut += '<tr>'+
                      '<td style="font-weight:bold;">订单信息:</td>' +
                      '<td>配送方式：'
                      +(orderInfo.deliveryname==null ? "" :  orderInfo.deliveryname) 
                      +'&nbsp;&nbsp;&nbsp;&nbsp;物流单号：'
                      +(orderInfo.deliveryorderno==null ? "" :  orderInfo.deliveryorderno)
                      +'&nbsp;&nbsp;&nbsp;&nbsp;发货时间：'
                      +(orderInfo.sendtime==null ? "" :  changeDateFormat(orderInfo.sendtime)) 
                      +'&nbsp;&nbsp;&nbsp;&nbsp;确认收货时间：'
                      +(orderInfo.receivetime==null ? "" :  changeDateFormat(orderInfo.receivetime)) 
                      +'&nbsp;&nbsp;&nbsp;&nbsp;申请退换货时间：'
                      +(orderInfo.returntime==null ? "" :  changeDateFormat(orderInfo.returntime)) +
                      '</td></tr>';
                      sOut += '<tr>'+
                      '<td style="font-weight:bold;">优惠信息:</td>' +
                	  '<td>优惠类型：'
                      +(orderInfo.ordertype==null ? "" :  convertOrderType(orderInfo.ordertype))
                      +'&nbsp;&nbsp;&nbsp;&nbsp;优惠券码：'
                      +(orderInfo.cardcode==null ? "" :  orderInfo.cardcode) 
                      +'&nbsp;&nbsp;&nbsp;&nbsp;现金券类型：'
                      +(orderInfo.cartypename==null ? "" :  orderInfo.cartypename)
                      +'&nbsp;&nbsp;&nbsp;&nbsp;优惠金额：'
                      +(orderInfo.feereduce==null ? "" :  "￥"+orderInfo.feereduce/100) +
                      '</td></tr>';
                      sOut += '<tr>'+
                      	'<td style="font-weight:bold;">其他信息:</td>' +
                      	'<td>品牌：'+(orderInfo.orderbrand==null ? "" :convertOrderBrand(orderInfo.orderbrand))
                      	+'&nbsp;&nbsp;&nbsp;&nbsp;交易流水号：'
                      	+(orderInfo.thirdno==null ? "" :  orderInfo.thirdno) +
                      	'&nbsp;&nbsp;&nbsp;&nbsp;订单来源：'+(orderInfo.orderpayresource==null ? "" :  orderInfo.orderpayresource) +'</td></tr>';
                      if(parentMemberInfo==null){}else{
                    	  sOut +='<tr><td style="font-weight:bold;">上级信息:</td>' +
                    	  '<td style="padding-right:30px;">'+(parentMemberInfo.nickName==null ? "" :  parentMemberInfo.nickName)+'</td></tr>';
                      }
                 }
                 sOut += '</table>';
                 oTable.fnOpen( nTr, sOut, 'details');
	   		 }
	   	});
    }
    
    return {
        init: function () {
           loadTableData();
           initToolBar();
        },
        loadTableData:loadTableData,
        fnFormatDetails:fnFormatDetails,
        editPriceBtn : editPriceBtn
    };
}();