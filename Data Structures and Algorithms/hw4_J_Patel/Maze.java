// JAY PATEL


package Maze;

import java.util.ArrayList;

/**
 * Class that solves maze problems with backtracking.
 * @author Koffman and Wolfgang
 **/
public class Maze implements GridColors {

    /** The maze */
    private TwoDimGrid maze;

    public Maze(TwoDimGrid m) {
        maze = m;
    }

    /** Wrapper method. */
    public boolean findMazePath() {
        return findMazePath(0, 0); // (0, 0) is the start point.
    }

    /**
     * Attempts to find a path through point (x, y).
     * @pre Possible path cells are in BACKGROUND color;
     *      barrier cells are in ABNORMAL color.
     * @post If a path is found, all cells on it are set to the
     *       PATH color; all cells that were visited but are
     *       not on the path are in the TEMPORARY color.
     * @param x The x-coordinate of curLoc point
     * @param y The y-coordinate of curLoc point
     * @return If a path through (x, y) is found, true;
     *         otherwise, false
     */
    public boolean findMazePath(int x, int y) {
        
    	if (x >= 0 && y >= 0 && x < maze.getNCols()  && maze.getColor(x, y) == NON_BACKGROUND && y < maze.getNRows()) {
    		
    		if((x == (maze.getNCols() - 1)) && (y == (maze.getNRows() - 1))){
    				maze.recolor(x, y, PATH);
    				return true;
    			}
    			
    		else {
    			maze.recolor(x, y, PATH);
    			if(findMazePath (x+1,y) || findMazePath(x, y+1) || findMazePath (x-1,y) || findMazePath(x, y-1)){
    				return true;
    			}
    			else{
    				maze.recolor(x, y, TEMPORARY);
    				return false;
    		}
    	}
    	
    }
    	return false;
    }

    
    	public ArrayList<ArrayList<PairInt>> findAllMazePaths(int x, int y){
        	
        	if(findMazePath()){
    	    	maze.recolor(PATH, NON_BACKGROUND);
    	    	maze.recolor(TEMPORARY, NON_BACKGROUND);
    	    	return findAllMazePathsHelper(0,0, new ArrayList<PairInt>());
        	}
        	else{
        		maze.recolor(PATH, NON_BACKGROUND);
        		maze.recolor(TEMPORARY, NON_BACKGROUND);
        		ArrayList<ArrayList<PairInt>> back = new ArrayList<ArrayList<PairInt>>();
        		ArrayList<PairInt> empty = new ArrayList<PairInt>();
        		back.add(empty);
        		return back;
        	}
        }
    	
    	public ArrayList<ArrayList<PairInt>> findAllMazePathsHelper(int x, int y, ArrayList<PairInt> curLoc){
        	if(x < maze.getNCols() && x >= 0 && y < maze.getNRows() && y >= 0  && maze.getColor(x, y).equals(NON_BACKGROUND)){
        		curLoc.add(new PairInt(x,y));
    	    	if(x == (maze.getNCols()-1) && y == (maze.getNRows()-1)){
    	    		ArrayList<PairInt> curCopy = (ArrayList<PairInt>) curLoc.clone();
    	    		ArrayList<ArrayList<PairInt>> fin = new ArrayList<ArrayList<PairInt>>();
    	    		fin.add(curCopy);
    	    		curLoc.remove(new PairInt(x,y));
    	    		return fin;
    	    	}
    	    	else{
    	    		maze.recolor(x, y, PATH);
    	    		ArrayList<ArrayList<PairInt>> r = findAllMazePathsHelper(x+1, y, curLoc);
    	    		ArrayList<ArrayList<PairInt>> l = findAllMazePathsHelper(x-1, y, curLoc);
    	    		ArrayList<ArrayList<PairInt>> up = findAllMazePathsHelper(x, y+1, curLoc);
    	    		ArrayList<ArrayList<PairInt>> down = findAllMazePathsHelper(x, y-1, curLoc);
    	    		ArrayList<ArrayList<PairInt>> fin = new ArrayList<ArrayList<PairInt>>();
    	    		fin.addAll(r);
    	    		fin.addAll(l);
    	    		fin.addAll(up);
    	    		fin.addAll(down);
    	    		maze.recolor(x, y, NON_BACKGROUND);
    	    		curLoc.remove(new PairInt(x,y));
    	    		return fin;
    	    	}
        	}
        	else{
        		return new ArrayList<ArrayList<PairInt>>();
        	}
        }

    	
    	
    	public ArrayList<PairInt> findMazePathMin(int x, int y){
        	maze.recolor(PATH, NON_BACKGROUND);
        	ArrayList<ArrayList<PairInt>> fin = findAllMazePaths(x,y);
        	if(fin.size() != 0){
    	    	ArrayList<PairInt> min = fin.get(0);
    	    	int length = min.size();
    	    	for(int i=1; i<fin.size(); i++){
    	    		if(length >= fin.get(i).size()){
    	    			min = fin.get(i);
    	    			length = min.size();
    	    		}
    	    	}
    	    	return min;
        	}
        	else{
        		return new ArrayList<PairInt>();
        	}
        }
        

    	   
    

    /*<exercise chapter="5" section="6" type="programming" number="2">*/
    public void resetTemp() {
        maze.recolor(TEMPORARY, BACKGROUND);
    }
    /*</exercise>*/

    /*<exercise chapter="5" section="6" type="programming" number="3">*/
    public void restore() {
        resetTemp();
        maze.recolor(PATH, BACKGROUND);
        maze.recolor(NON_BACKGROUND, BACKGROUND);
    }
    /*</exercise>*/
}
/*</listing>*/
