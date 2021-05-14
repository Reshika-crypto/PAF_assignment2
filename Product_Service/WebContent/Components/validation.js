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
$(document).on("click", "#productid", function(event) 
{     
	
	$("#hidProductIDSave").val($(this).data("productid"));     
	$("#product_id").val($(this).closest("tr").find('td:eq(0)').text());    
	$("#researcher_id").val($(this).closest("tr").find('td:eq(1)').text());     
	$("#product_name").val($(this).closest("tr").find('td:eq(2)').text());
	$("#product_description").val($(this).closest("tr").find('td:eq(3)').text());
	$("#product_quality").val($(this).closest("tr").find('td:eq(4)').text());
	$("#product_price").val($(this).closest("tr").find('td:eq(5)').text()); 
	
	   
}); 




//REMOVE===========================================
$(document).on("click", "#btnRemove", function(event) 
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
	if ($("#product_id").val().trim() == "")  
	{   
		return "Insert Product ID.";  
	} 

	// Researcher ID------------------------  
	if ($("#researcher_id").val().trim() == "")  
	{   
		return "Insert Researcher ID.";  
	} 
	
	// Product Name------------------------  
	if ($("#product_name").val().trim() == "")  
	{   
		return "Insert Product Name.";  
	} 
	
	// Description------------------------  
	if ($("#product_description").val().trim() == "")  
	{   
		return "Insert Description.";  
	} 
	
	// Quality------------------------  
	if ($("#product_quality").val().trim() == "")  
	{   
		return "Insert Quality.";  
	} 
	
	// Price-------------------------------
	var tmpprice = $("#product_price").val().trim();
	if (!$.isNumeric(tmpprice)) 
	 {
	 return "Insert Price.";
	 }

	return true; 
}