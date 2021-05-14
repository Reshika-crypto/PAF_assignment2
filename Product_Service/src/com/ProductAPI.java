package com;
import com.Product;
import java.io.IOException; 
import java.util.HashMap; 
import java.util.Map; 
import java.util.Scanner;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



/**
 * Servlet implementation class PaymentService
 */
@WebServlet("/ProductAPI")
public class ProductAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	Product productObj = new Product();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProductAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String output = productObj.insertProduct(request.getParameter("pID"),      
				request.getParameter("rID"),     
				request.getParameter("pname"),
				request.getParameter("pdesc"),
				request.getParameter("pQuality"),
				request.getParameter("price")); 
	 
				response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method

		/*Map paras = getParasMap(request); 
		 
		 String output = productObj.updateProduct(pID, rID, pname, pdesc, pQuality, price)(paras.get("hidProductIDSave").toString(),     
		    		paras.get("pID").toString(),     
		    		paras.get("rID").toString(),        
		    		paras.get("pname").toString(),
		    		paras.get("pdesc").toString(),
		    		paras.get("pQuality").toString(),
		    		paras.get("price").toString()); 
		 
		 			response.getWriter().write(output);*/
		 			
	Map paras = getParasMap(request);
	String output = productObj.updateProduct(paras.get("hidProductIDSave").toString(), paras.get("pID").toString(), paras.get("rID").toString(), 
											paras.get("pname").toString(),paras.get("pdesc").toString(),paras.get("pQuality").toString(),paras.get("price").toString()); 
	response.getWriter().write(output);
}
	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		Map paras = getParasMap(request); 
		 
		 String output = productObj.deleteProduct(paras.get("pID").toString());  
		 
		 response.getWriter().write(output);
	}
	
	// Convert request parameters to a Map
		private static Map getParasMap(HttpServletRequest request)
		{
		 Map<String, String> map = new HashMap<String, String>();
		try
		 { 
		 Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
		 String queryString = scanner.hasNext() ?
		 scanner.useDelimiter("\\A").next() : "";
		 scanner.close();
		 String[] params = queryString.split("&");
		 for (String param : params)
		 { 
		
		String[] p = param.split("=");
		 map.put(p[0], p[1]);
		 }
		 }
		catch (Exception e)
		 {
		 }
		return map;
		}

}