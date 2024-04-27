public class IDLListTest {
    public static void main(String[] args) {
        IDLList<Integer> list = new IDLList<>();

        System.out.println("ADD");
        list.add(0);
        list.add(7);
        list.add(7);
        list.add(9);
        list.add(1);
        System.out.println("Size: " + list.size());
        System.out.println(list);


        System.out.println("Appending");
        list.append(1);
        list.append(1);
        System.out.println("Size: " + list.size());
        System.out.println(list);

        System.out.println("Removing");
        list.remove();
        list.removeLast();
        list.remove(6);
        System.out.println("Size: " + list.size());
        System.out.println(list);
    }
}
