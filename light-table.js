/**
 * ExcelTable 0.0.0-beta1
 * ExcelTable is a simple jQuery plugin for editable tables with basic functionality to create editable table, get selected records with changed data
 *
 * Copyright 2018, Vinod Sharma
 * Licensed under the MIT license.
 *
 * Date: Wed Jul 8 2018 14:18:10 GMT+0100 (CET)
 */


var lightTable;

$(function() {
	function LightTable() {
		var self = this;
		var tableData = {};
		var changedRows = [];
		var rootElement;
		var indexGotChanged = [];
		this.initTable = function(container, header, data, options) {
			console.log(data);
			self.rootElement = container;
			tableContent = $(container);
			$(tableContent).css(options.css);
			self.tableData = data;
			var table = $("<table/>").addClass("light-table");
			var thead = $("<thead/>");
			var tbody = $("<tbody/>");
			/************ build header *********************/
			$.each(data, function(rowIndex, r) {
		        var row = $("<tr/>");
		        
		        var checkbox;
		        if(rowIndex==0) {
		        	checkbox = $("<th/>")
		        	var headCheckBox = $("<input type='checkbox' class='head_check' checked>");
		        	$(headCheckBox).click(function(e){
		        		if($(this).prop('checked')==true){
		        			$(".light-table tbody .body_check").prop('checked', true);
		        		} else {
		        			$(".light-table tbody .body_check").prop('checked', false);
		        		}
		        	});
		        	checkbox.append(headCheckBox)
		        } 
		        row.append(checkbox);
		        $.each(r, function(colIndex, c) { 
		        	if(rowIndex==0){
		  	          row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+" />").text(colIndex));
		  	          thead.append(row);
		        	}
		        });
		        table.append(thead);
		        return false;
		    });
			
			/*************************************************/
			/************************build body****************/
			
			$.each(data, function(rowIndex, r) {
		        var row = $("<tr/>");
		        row.attr("rowid",rowIndex);
		        var checkbox;
		        checkbox = $("<td/>")
	        	var bodyCheckBox = $("<input type='checkbox' class='body_check' checked>");
	        	$(bodyCheckBox).click(function(e){
	        		if($(this).prop('checked')==true){
	        			var cl = $(".light-table tbody .body_check").length;
	        			var ccl = $(".light-table tbody .body_check:checked").length;
	        			if(cl==ccl) {
	        				$(".light-table thead .head_check").prop('checked', true);
	        			}
	        		} else {
	        			$(".light-table thead .head_check").prop('checked', false);
	        		}
	        	});
	        	checkbox.append(bodyCheckBox)
		        row.append(checkbox);
	        	table.append(tbody);
		        $.each(r, function(colIndex, c) { 
		        	
		        	var isEditable = options.editable.indexOf(colIndex)>-1;
		        	var trtd = $("<td/>")
		        	trtd.attr("colname",colIndex);
	        		if(isNaN(c)) {
	        			if(isEditable) {
	        				trtd.addClass("t_a_l");
	        				var input = $("<input class='t_input_t' type='text' value='"+c+"'>");
	        				
	        				$(input).change(function(e){
	        					self.updateChangedValue(this,e);
	        				});
	        				
	        				trtd.append(input);
		        			row.append(trtd);
	        			} else {
	        				trtd.addClass("t_a_l");
		        			row.append(trtd.text(c));
	        			}
	        		} else {
	        			if(isEditable) {
	        				trtd.addClass("t_a_l");
	        				var input = $("<input class='t_input_t' type='number' value='"+c+"'>");
	        				trtd.append(input);
	        				
	        				$(input).change(function(e){
	        					self.updateChangedValue(this, e);
	        				});
		        			
	        				row.append(trtd);
	        			} else {
	        				trtd.addClass("t_a_r");
		        			row.append(trtd.text(c));
	        			}
	        		}
	        	  tbody.append(row);
		          
		        });
		        
		    });
			
			/*****************************************************/
			
			tableContent.append(table);
		};
	    
		this.getChangedData = function() {
			var fullData = self.tableData;
			var selectedData = [];
			var checkedRecords = [];
			$.each(fullData, function(index, value){
				if($(self.rootElement+" table tbody tr[rowid='"+index+"'] td input[type=checkbox]").prop('checked')){
					checkedRecords.push(value);
				}
			});
			return checkedRecords;
	    };
	    
	    this.updateChangedValue = function(element, e) {
	    	var td = $(element).parent();
	    	var tr = td.parent();
	    	var columnName = td.attr('colname');
	    	var rowIndex = tr.attr('rowid');
	    	var newValue = $(element).val();
	    	var changedData = self.tableData[rowIndex];
	    	changedData[columnName] = isNaN(newValue)?newValue:parseInt(newValue);
	    }
		
	}
	
	var options = {};
	options.editable = ["name","lastname","lots_to_be_netted","column2","column3","column4","column5"];
	var cssProp = {"height": "495px", "overflow-x": "hidden", "overflow-y": "scroll", "background": "#FFF","display":"none"};
	options.css = cssProp;
	lightTable = new LightTable();
	
	/*var data1 = [
		            {'name': 'vinod23', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinod323', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinodew', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinodsd', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinodxc', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinodxc', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinodcx', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinerod', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinfadoder', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vifdfanodfdf', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinorerd', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinreodcx', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinreodeer', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinodeter', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinoderter', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinodgrt', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinodhrgh', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinodgg', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinodt', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinoddf', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vifadnod', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinfdod', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vicdnod', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vincdfod', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5},
		            {'name': 'vinofdfd', 'lastname': 'sharma5', 'lots_to_be_netted':5, 'column2':2, 'column3':3, 'column4':4, 'column5':5 , 'column6':5, 'column7':5, 'column8':5, 'column9':5, 'column10':5, 'column11':5, 'column12':5}
		            ];
	lightTable.initTable(".netting_qf5_data_container",{},data1, options);*/
});