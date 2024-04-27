import java.util.Scanner;

public class ProgrammingAssignment3 {
	

		
		


	public static void main(String[] args) {
		Scanner scnr = new Scanner(System.in);
		int input = scnr.nextInt();
		
		if (input < 11 || input > 100) {
	    	  System.out.println("Input must be 11-100"); 
	    	  }
		
		while (input >= 11 && input <= 100) {
			 if (input % 11 == 0) {
		    	  System.out.println(input + " ");
		    	  
		        break; 
		        }
		        
		    else {
		      System.out.print(input + " ");
		      input--;
		    }
		}

	}

}
