$(document).ready(function() 
{  
		$("#alertSuccess").hide();  
	    $("#alertError").hide(); 
}); 
 
 
// SAVE ============================================ 
$(document).on("click", "#btnSave", function(event) 
{  
	// Clear alerts---------------------  
	$("#alertSuccess").text("");  
	$("#alertSuccess").hide();  
	$("#alertError").text("");  
	$("#alertError").hide(); 
 
	// Form validation-------------------  
	var status = validateProductForm();  
	if (status != true)  
	{   
		$("#alertError").text(status);   
		$("#alertError").show();   
		return;  
	} 
 
	// If valid------------------------  
	var type = ($("#hidProductIDSave").val() == "") ? "POST" : "PUT"; 

	$.ajax( 
	{  
			url : "ProductAPI",  
			type : type,  
			data : $("#formProduct").serialize(),  
			dataType : "text",  
			complete : function(response, status)  
			{   
				onProductSaveComplete(response.responseText, status);  
			} 
	}); 
}); 


function onProductSaveComplete(response, status) 
{  
	if (status == "success")  
	{   
		var resultSet = JSON.parse(response); 

		if (resultSet.status.trim() == "success")   
		{    
			$("#alertSuccess").text("Successfully saved.");    
			$("#alertSuccess").show(); 

			$("#divProductGrid").html(resultSet.data);   
		} else if (resultSet.status.trim() == "error")   
		{    
			$("#alertError").text(resultSet.data);    
			$("#alertError").show();   
		} 

	} else if (status == "error")  
	{   
		$("#alertError").text("Error while saving.");   
		$("#alertError").show();  
	} else  
	{   
		$("#alertError").text("Unknown error while saving..");   
		$("#alertError").show();  
	} 

	$("#hidProductIDSave").val("");  
	$("#formProduct")[0].reset(); 
} 

 
// UPDATE========================================== 
$(document).on("click", ".btnUpdate", function(event) 
{     
	$("#hidProductIDSave").val($(this).closest("tr").find('#hidProductIDUpdate').val());     
	$("#pID").val($(this).closest("tr").find('td:eq(0)').text());     
	$("#rID").val($(this).closest("tr").find('td:eq(1)').text());     
	$("#pname").val($(this).closest("tr").find('td:eq(2)').text();
	$("#pdesc").val($(this).closest("tr").find('td:eq(3)').text();
	$("#pQuality").val($(this).closest("tr").find('td:eq(4)').text();
	$("#price").val($(this).closest("tr").find('td:eq(5)').text());     
}); 




//REMOVE===========================================
$(document).on("click", ".btnRemove", function(event) 
{  
	$.ajax(  
	{   
		url : "ProductAPI",   
		type : "DELETE",   
		data : "pID=" + $(this).data("productid"),   
		dataType : "text",   
		complete : function(response, status)   
		{    
			onProductDeleteComplete(response.responseText, status);   
		}  
	}); 
}); 

function onProductDeleteComplete(response, status) 
{  
	if (status == "success")  
	{   
		var resultSet = JSON.parse(response); 

		if (resultSet.status.trim() == "success")   
		{    
			
			$("#alertSuccess").text("Successfully deleted.");    
			$("#alertSuccess").show(); 
		
			$("#divProductGrid").html(resultSet.data); 
			
		} else if (resultSet.status.trim() == "error")   
		{    
			$("#alertError").text(resultSet.data);    
			$("#alertError").show();   
		}
		

	} else if (status == "error")  
	{   
		$("#alertError").text("Error while deleting.");   
		$("#alertError").show();  
	} else  
	{   
		$("#alertError").text("Unknown error while deleting..");   
		$("#alertError").show();  
	}
}
 
// CLIENT-MODEL========================================================================= 
function validateProductForm() 
{  
	// Product ID  
	if ($("#pID").val().trim() == "")  
	{   
		return "Insert Product ID.";  
	} 

	// Researcher ID------------------------  
	if ($("#rID").val().trim() == "")  
	{   
		return "Insert Researcher ID.";  
	} 
	
	// Product Name------------------------  
	if ($("#pname").val().trim() == "")  
	{   
		return "Insert Product Name.";  
	} 
	
	// Description------------------------  
	if ($("#pdesc").val().trim() == "")  
	{   
		return "Insert Description.";  
	} 
	
	// Quality------------------------  
	if ($("#pQuality").val().trim() == "")  
	{   
		return "Insert Quality.";  
	} 
	
	// Price-------------------------------
	 var tmpprice = $("#price").val().trim();
	if (!$.isNumeric(tmpprice)) 
	 {
	 return "Insert Price.";
	 }

	return true; 
}