//JAY PATEL

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Anagrams {

	
	final Integer[] primes;
	Map<Character,Integer> letterTable;
	Map<Long,ArrayList<String>> anagramTable;
	
	public Anagrams(){
	primes = new Integer[] {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,67, 71, 73, 79, 83, 89, 97, 101};
	buildLetterTable();
	anagramTable = new HashMap<Long, ArrayList<String>>();
	}
	
	private void buildLetterTable(){
	letterTable= new HashMap<Character, Integer>();
	letterTable.put('a',2);
	letterTable.put('b',3);
	letterTable.put('c',5);
	letterTable.put('d',7);
	letterTable.put('e',11);
	letterTable.put('f',13);
	letterTable.put('g',17);
	letterTable.put('h',19);
	letterTable.put('i',23);
	letterTable.put('j',29);
	letterTable.put('k',31);
	letterTable.put('l',37);
	letterTable.put('m',41);
	letterTable.put('n',43);
	letterTable.put('o',47);
	letterTable.put('p',53);
	letterTable.put('q',59);
	letterTable.put('r',61);
	letterTable.put('s',67);
	letterTable.put('t',71);
	letterTable.put('u',73);
	letterTable.put('v',79);
	letterTable.put('w',83);
	letterTable.put('x',89);
	letterTable.put('y',97);
	letterTable.put('z',101);
	}
	
	
	private void processFile(String s) throws  IOException 
	{
		FileInputStream fstream = new FileInputStream(s);
		BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
		String strLine;
		while ((strLine = br.readLine ()) != null)    
		{
			this.addWord(strLine);
		}
		br.close();
	}	
	
	public Long myHashCode(String s){
		Long prod=1L;
		int i;
		int val;
		char a;
		int n = s.length();
		for(i=0 ; i<n ; i++){	
			a = s.charAt(i);
			val = letterTable.get(a);
			prod = prod * val;
		}
		
		return prod;
	}
	
	public void addWord(String s){
		Long len = myHashCode(s);
		ArrayList<String> temp;
		ArrayList<String> temp1 = new ArrayList<String>();
		temp = anagramTable.get(len);
		if(temp == null){
			
			temp1.add(s);
			anagramTable.put(len, temp1);
		}
		
		else if(temp!=null) {
			
			temp.add(s);
			
		}
		
	}
	
	
	private ArrayList<Map.Entry<Long,ArrayList<String>>> getMaxEntries(){
		
		ArrayList<Map.Entry<Long,ArrayList<String>>> a = new ArrayList<Map.Entry<Long,ArrayList<String>>>();
		int max = 0;
		for(Map.Entry<Long,ArrayList<String>> entry: anagramTable.entrySet()){	
			
			if(entry.getValue().size()>max){
			
			a.clear();
			max = entry.getValue().size();
			a.add(entry);
			
			}
			
			else if(entry.getValue().size() < max){
				continue;
			}
			
			else if(entry.getValue().size() == max){
				a.add(entry);
			}
			
			
		}
		
		return a;	
	}
	
	public static void main(String[] args) {

		Anagrams a = new Anagrams();
		
		final long startTime = System.nanoTime();
		try{
			a.processFile("words_alpha.txt");
		}
		catch (IOException  e1) {
			e1.printStackTrace ();
		}
		ArrayList <Map.Entry <Long,ArrayList <String >>> maxEntries = a.getMaxEntries();
		final long estimatedTime = System.nanoTime () - startTime;
		final double seconds = ((double) estimatedTime /1000000000);
		System.out.println(" Time: "+ seconds );
		int n=maxEntries.size();
		for(int i=0;i<n;i++){
			Map.Entry<Long,ArrayList<String>> entry=maxEntries.get(i);
			System.out.println("Key of Max Anagrams: "+entry.getKey());
			System.out.println("List of Max Anagrams: "+ maxEntries);
		}
		
		System.out.println("Length of the list: "+maxEntries.get(0).getValue().size());
		
	}
	
	

}