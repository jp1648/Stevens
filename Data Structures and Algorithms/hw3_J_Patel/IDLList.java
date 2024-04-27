//JAY PATEL//



import java.util.ArrayList;

public class IDLList<E> {
	
    private class Node<E> {
    	
        E data;
        Node<E> next;
        Node<E> prev;

        // constructor
        
        public Node(E data) {
            this.data = data;
            next = null;
            prev = null;
        }

        public Node(E data, Node<E> next, Node<E> prev) {
            this.data = data;
            this.next = next;
            this.prev = prev;
        }
    }


    private Node<E> head;
    private Node<E> tail;
    private int size;
    private ArrayList<Node<E>> indices;

    // constructor
    public IDLList() {
        head = tail = null;
        size = 0;
        indices = new ArrayList<>();
    }


    public boolean add(int index, E elem) {
      
        if (index < 0 || index > size) {
            return false;
        }

    
        if (size == 0) {
            head = tail = new Node<>(elem);
            indices.add(head);
        }

        else if (index == size) {
            Node<E> newNode = new Node<>(elem, null, tail);
            tail.next = newNode;
            tail = newNode;
            indices.add(newNode);
        }

        else if (index == 0) {
            return add(elem);
        }

        else {
            Node<E> newNode = new Node<>(elem, indices.get(index), indices.get(index - 1));
            indices.get(index - 1).next = newNode;
            indices.get(index).prev = newNode;
            indices.add(index, newNode);
        }

        size++;
        return true;
    }

    public boolean add(E elem) {
        if (size == 0) {
            head = tail = new Node<>(elem);
            indices.add(head);
        }
        else {
            Node<E> newNode = new Node<>(elem, head, null);
            head.prev = newNode;
            head = newNode;
            indices.add(0, newNode);
        }

        size++;
        return true;
    }

        public boolean append(E elem) {
        if (size == 0) {
            head = tail = new Node<>(elem);
            indices.add(head);
        }

        else {
            Node<E> newNode = new Node<>(elem, null, tail);
            tail.next = newNode;
            tail = newNode;
            indices.add(newNode);
        }

        size++;
        return true;
    }

        public E get(int index) {
        if (index < 0 || index >= size) {
        
        
            return null;
        }
        

        return indices.get(index).data;
    }

    public E getHead() {
        if (size == 0) {
            return null;
        }

        return head.data;
    }

    public E getLast() {
        if (size == 0) {
            return null;
        }
        return tail.data;
    }

    public int size() {
        return size;
    }

    public E remove() {
        if (size == 0) {
            return null;
        }

        if (size == 1) {
            head = tail = null;
        }
        else {
            head = head.next;
            head.prev = null;
        }

        size--;
        return indices.remove(0).data;
    }

    public E removeLast() {
        if (size == 0) {
            return null;
            
        }

        if (size == 1) {
            head = tail = null; }
        else {
            tail = tail.prev;
            tail.next = null;
        }

        size--;
        return indices.remove(size).data;
    }

    public E remove(int index) {
        if (index < 0 || index >= size) {
            return null;
        }
        else if (index == 0) {
            return remove();
        }
        else if (index == size - 1) {
        	
       
            return removeLast();
        }
        else {
            indices.get(index - 1).next = indices.get(index + 1);
            indices.get(index + 1).prev = indices.get(index - 1);
        }

        return indices.remove(index).data;
    }

    public boolean remove(E elem) {
        int index = 0;
        while (indices.get(index).data != elem && index < size) {
            index++;
        }
        if (index == size()) {
            return false;
        }
        
        remove(index);
        return true;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("IDLList: ");
        for (Node<E> node : indices) {
            sb.append(node.data + " ");
        }

        return sb.toString();
    }
}
