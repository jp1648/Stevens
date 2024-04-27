import java.util.Scanner;

public class ProgrammingAssignment2 {

	public static void main(String[] args) {
		int par;
		int strokes;
		
		Scanner scnr = new Scanner(System.in);
		par = scnr.nextInt();
		strokes = scnr.nextInt();
		
		if ((par - 2) == strokes ) {
			
			System.out.println("Eagle");
		} else if ((par - 1) == strokes ) {
			
			System.out.println("Birdie");
		} else if (par == strokes ) {
			
			System.out.println("Par");
		} else if ((par + 1) == strokes ) {
			
			System.out.println("Bogey");
		} else {
			System.out.println("Error");
		}
		
		
		
	}
	
	}