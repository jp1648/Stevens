import java.util.Scanner;

public class ProgrammingAssignment1 {

	public static void main(String[] args) {
		Scanner scnr = new Scanner(System.in);
		int a;
		int b;
		int c;
		int d;
		
		a = scnr.nextInt();
		b = scnr.nextInt();
		c = scnr.nextInt();
		d = scnr.nextInt();
		int z = a*b*c*d; 
		int x = (a+b+c+d)/4;
		float y = a*b*c*d;
		float p = (float)((a+b+c+d)/4.0);
		
		
		
		System.out.println(z+ " " + x);
		System.out.printf("%.3f", y);
		System.out.print(" ");
		System.out.printf("%.3f", p);
		System.out.println("");
		
		scnr.close();
			
}
}
