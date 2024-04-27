public String toString()
        {
        String str = ""; // set str to empty string
        Node<E> curr = head; // set curr to head

// loop over the list, appending data of nodes to str
        while(curr != null)
        {
        str += curr.data.toString();
        if(curr != tail) // not the last node
        str += " -> ";
        curr = curr.next;
        }

        return str;
        }

        }