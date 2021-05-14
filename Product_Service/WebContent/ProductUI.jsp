<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Product Service</title>
<link rel="stylesheet" href="Views/bootstrap.min.css"> 
<script src="Components/jquery-3.4.1.min.js"></script> 
<script src="Components/validation.js"></script> 
</head>
<body>
<div class="container"> 
	<div class="row">  
		<div class="col-6"> 
			<h1>PRODUCT SERVICE</h1>
				<form id="formProduct" name="formProduct" method="post" action="ProductUI.jsp">  
					Product ID:  
 	 				<input id="pID" name="pID" type="text"  class="form-control form-control-sm">
					<br> Researcher ID:   
  					<input id="rID" name="rID" type="text" class="form-control form-control-sm">   
  					<br> Product Name:   
  					<input id="pname" name="pname" type="text"  class="form-control form-control-sm">
					<br> Product Description:
					<input id="pdesc" name="pdesc" type="text"  class="form-control form-control-sm">
					<br> Product Quality:
					<input id="pQuality" name="pQuality" type="text"  class="form-control form-control-sm">
					<br> Price:
					<input id="price" name="price" type="text"  class="form-control form-control-sm">
					<br> 
					<input id="btnSave" name="btnSave" type="button" value="SAVE" class="btn btn-primary">  
					<input type="hidden" id="hidProductIDSave" name="hidProductIDSave" value=""> 
				</form>
				
				<div id="alertSuccess" class="alert alert-success"> </div>
				
			   <div id="alertError" class="alert alert-danger"></div>
				
			   <br>
				<div id="divProductGrid">
					<%
					    Product productObj = new Product();
						out.print(productObj.readProduct());
					%>
				</div>
				
				 
			</div>
		</div>
</div>

</body>
</html>