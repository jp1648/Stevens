
import java.util.*;


public class Treap<E extends Comparable<E>> {

    private static class Node<E> {
        public E data;
        public int priority;
        public Node<E> left;
        public Node<E> right;

        public Node(E data, int priority) {
            if (data == null) {
                throw new IllegalArgumentException("Data can't be null");
            }
            this.data = data;
            this.priority = priority;
            this.left = null;
            this.right = null;
        }

        public Node<E> rotateRight() {
            Node<E> newRoot = this.left;
            this.left = newRoot.right;
            newRoot.right = this;
            return newRoot;
        }

        public Node<E> rotateLeft() {
            Node<E> newRoot = this.right;
            this.right = newRoot.left;
            newRoot.left = this;
            return newRoot;
        }
    
    }
    
    private Random priorityGenerator;
    private Node<E> root;

    public Treap() {
        this.priorityGenerator = new Random();
        this.root = null;
    }

    public Treap(long seed) {
        this.priorityGenerator = new Random(seed);
        this.root = null;
    }

    public boolean add(E key) {
        int priority = priorityGenerator.nextInt();
        return add(key, priority);
    }

    public boolean add(E key, int priority) {
        if (root == null) {
            root = new Node<E>(key, priority);
            return true;
        }
        Node<E> parent = null;
        Node<E> current = root;
        Stack<Node<E>> stack = new Stack<Node<E>>();
        while (current != null) {
            parent = current;
            stack.push(parent);
            if (key.compareTo(current.data) < 0) {
                current = current.left;
            } else if (key.compareTo(current.data) > 0) {
                current = current.right;
            } else {
                return false;
            }
        }
        Node<E> newNode = new Node<E>(key, priority);
        if (key.compareTo(parent.data) < 0) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }
        reheap(stack, newNode);
        return true;
    }

    private void reheap(Stack<Node<E>> stack, Node<E> node) {
        while (!stack.isEmpty() && node.priority > stack.peek().priority) {
            Node<E> parent = stack.pop();
            if (node.data.compareTo(parent.data) < 0) {
                parent.left = node.rotateRight();
            } else {
                parent.right = node.rotateLeft();
            }
        }
        if (root.priority < node.priority) {
            if (root.data.compareTo(node.data) < 0) {
                root = node.rotateLeft();
            } else {
                root = node.rotateRight();
            }
        }
    }
    
    
    public boolean delete(E key) {
        Node<E> parent = null;
        Node<E> current = root;
        Stack<Node<E>> stack = new Stack<Node<E>>();

        // Search for the node with the given key
        while (current != null && !current.data.equals(key)) {
            parent = current;
            stack.push(parent);
            if (key.compareTo(current.data) < 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        // If the node with the given key is not found, return false
        if (current == null) {
            return false;
        }

        // Trickle down the node using rotations until it becomes a leaf
        while (current.left != null || current.right != null) {
            if (current.left == null || current.right != null && current.left.priority < current.right.priority) {
                current = current.rotateLeft();
            } else {
                current = current.rotateRight();
            }
            if (parent == null) {
                root = current;
            } else if (parent.left == current.rotateRight()) {
                parent.left = current;
            } else {
                parent.right = current;
            }
        }

        // Remove the leaf node
        if (parent == null) {
            root = null;
        } else if (parent.left == current) {
            parent.left = null;
        } else {
            parent.right = null;
        }
        return true;
    }




	private boolean find(Node<E> root, E key) {
	    if (root == null) {
	        return false;
	    }
	    int cmp = key.compareTo(root.data);
	    if (cmp < 0) {
	        return find(root.left, key);
	    } else if (cmp > 0) {
	        return find(root.right, key);
	    } else {
	        return true;
	    }
	}


	public boolean find(E key) {
	    return find(root, key);
	}
	
	
	
	public String toString() {
	    return toString(root);
	}
	
	private String toString(Node<E> current) {
	    if (current == null) {
	        return "";
	    }
	    String result = "[" + current.data.toString() + ", " + current.priority + "]";
	    if (current.left == null && current.right == null) {
	        return result;
	    }
	    if (current.left == null) {
	        return result + " (null) " + toString(current.right);
	    }
	    if (current.right == null) {
	        return result + " " + toString(current.left) + " (null)";
	    }
	    return result + " " + toString(current.left) + " " + toString(current.right);
	}

	

	public static void main(String[] args) {
	    // create the test treap
	    Treap<Integer> testTree = new Treap<>();
	    testTree.add(4, 19);
	    testTree.add(2, 31);
	    testTree.add(6, 70);
	    testTree.add(1, 84);
	    testTree.add(3, 12);
	    testTree.add(5, 83);
	    testTree.add(7, 26);
	
	    // test delete method
	    System.out.println("Before:");
	    System.out.println(testTree);
	    boolean deleted = testTree.delete(3);
	    System.out.println("Boolean output for deleted 3: " + deleted);
	    System.out.println("After:");
	    System.out.println(testTree);
	}
	}
