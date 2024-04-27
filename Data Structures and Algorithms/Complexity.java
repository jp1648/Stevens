//Program created by JAY PATEL


public class Complexity {
	
	
	public static void method1(int n) {
		
		
		int counter = 0;
		
		
		for (int i =0; i<n; i++) {
			for (int j = 0; j <n; j++ ) {
			
			System.out.println("Operation "+counter); 
			counter++; 
			
		
			}
	
		}

	}
			
	public static void method2(int n) {
		
		int counter = 0;
		
		
		for (int i =0; i<n; i++) {
			for (int j = 0; j <n; j++ )
				for(int y = 0; y <n; y++) {
			
					System.out.println("Operation "+counter); 
					counter++; 
			
				
			}
		}
	}
	
		
	public static void method3(int n) {
		
	    int counter = 0;
	    
	    while (n > 1) {
	        System.out.println("Operation " + counter);
	        counter++;
	        n = n / 2;
	        
	        
	    }
	   
	}
	
	
		
	public static void method4(int n) {
		
		int counter = 0;
		
		for (int i = 0; i < n; i++) {
		       
			method3(i);
		        
	        System.out.println("Operation " + counter); 
	    	counter++;
	    	
		    }
	

	}
	
	public static void method5(int n) {
		
		int counter = 0;
	
	    for (int i = 2; i <= n; i *= i) {
	        method4(i);
	        
			System.out.println("Operation " + counter); 
			counter++;
			
			
	        }
	    


	    
	    
	}
		
	
}
