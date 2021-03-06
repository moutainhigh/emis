﻿var mallgame_addGamblingManager = function() {
	var addressCount=3;
	
	var initSelect = function(){
		$.ajax({
			type : "GET",
			url : "queryProvinceRegion",
			dataType : "json",
			success : function(data) {
				var result="";
				result += "<option value=''>请选择省份</option>";
				$.each(data, function(index, value){
					result += "<option value=\"" + value.id + "\">" + value.name + "</option>";
                });
				for(var i=1;i<=addressCount;i++){
					$("#provinceId"+i).empty().append(result).change();					
				}
			}
		});
		
		 //选择省份事件
		for(var i=1;i<=addressCount;i++){
			$("#provinceId"+i).on("change", function(){
	            var regionId = $(this).val();
	            var provinceSelectOrder=$(this).attr("id").replace(/[^0-9]/ig, "");
	            if(regionId==''){
	                return;
	            }
	            $.ajax({
	                type : "post",
	                dataType : "json",
	                url : "queryRegionByParentId",
	                data : {parentRegionId : regionId},
	                success : function(data){
	                    var result = "";
	                    result += "<option value=''>请选择城市</option>";
	                    $.each(data, function(index, value){
	                        var editRegionCityId = $("#editRegionCityId").val();
	                            result += "<option value=\"" + value.id + "\">" + value.name + "</option>";
	                    });
	                    
	                    $("#cityId"+provinceSelectOrder).empty().append(result).change();
	                }
	            })
	        });
		};
		
		//选择城市事件
		for(var i=1;i<=addressCount;i++){
			$("#cityId"+i).on("change", function(){
				var regionId = $(this).val();
				var citySelectOrder=$(this).attr("id").replace(/[^0-9]/ig, "");
				
				if(regionId==''){
					return;
				}
				$.ajax({
					type : "post",
					dataType : "json",
					url : "queryRegionByParentId",
					data : {parentRegionId : regionId},
					success : function(data){
						var result = "";
						result += "<option value=''>请选择区域</option>";
						$.each(data, function(index, value){
							var editRegionAreaId = $("#editRegionAreaId").val();
								result += "<option value=\"" + value.name + "\">" + value.name + "</option>";
						});
						$("#countyId"+citySelectOrder).empty().append(result).change();
					}
				})
			});			
		};
		
	};
	// 初始化页面相关按钮事件
	var initEvent = function() {
		$("#singleAdd").on("click", function() {
			var submitForm = $("#submitForm");
			/*var submitForm1 = $("#submitForm1");
			var submitForm2 = $("#submitForm2");
			var submitForm3 = $("#submitForm3");*/
			if (!submitForm.valid()) {
				return;
			}
			/*if (!submitForm1.valid()){
				return;
			}*/
			var requestURL = "addWarehouse";
			var tips = "增加失败!";
			debugger;
			/*var company = serializeObject(submitForm.serializeArray());
			var addr1 = serializeObject(submitForm1.serializeArray());
			var addr2 = serializeObject(submitForm2.serializeArray());
			var addr3 = serializeObject(submitForm3.serializeArray());
			
			var obj = new Object();
			obj.company = company;
			
			var addresses=new Array(3)
			addresses[0]=addr1;
			addresses[1]=addr2;
			addresses[2]=addr3;
			obj.addresses=addresses;*/
			var param = serializeObject(submitForm.serializeArray());
			$.ajax({
				type : "POST",
				url : requestURL,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : JSON.stringify(param),
				success : function(data) {
					if (data.code == 0) {
						$("#backListPage").click();
					} else {
						bootbox.alert(tips);
					}
				}
			});
		});

		var options = {
			errorElement : 'span',
			errorClass : 'help-block',
			focusInvalid : true,
			ignore : "",
			rules : {
				deliveryArea : {
					min:0.0001,
					max:9999999,
					required : true
				},
				warehouseNumber : {
					required : true
				},
				warehouseAddress : {
					required : true
				},
				warehouseName : {
					required : true
				}
			},
			highlight : function(element) {
				$(element).closest('.form-group').addClass('has-error');
			},
			unhighlight : function(element) {
				$(element).closest('.form-group').removeClass('has-error');
			},
			success : function(label) {
				label.closest('.form-group').removeClass('has-error');
			}
		};
		
		// 验证表单
		$("#submitForm").validate(options);
		// $("#submitForm1").validate(options);
	};

	return {
		init : function() {
			initEvent();
			initSelect();
		},
	};
}();
