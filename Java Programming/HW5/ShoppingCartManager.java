import java.util.Scanner;

public class ShoppingCartManager {
    public static void main(String[] args)
    {
        String customerName, currentDate;
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Customer's Name:");
        customerName = sc.nextLine();
        System.out.println("Enter Today's Date:");
        currentDate = sc.nextLine();
        System.out.println();
        ShoppingCart cart = new ShoppingCart(customerName, currentDate);
        System.out.println("Customer Name: "+cart.getCustomerName());
        System.out.println("Today's Date: "+cart.getDate());
        printMenu(cart);
    }

    
    public static void printMenu(ShoppingCart cart)
    {
        Scanner sc = new Scanner(System.in);
        System.out.println("\nMENU");
        System.out.println("a - Add item to cart");
        System.out.println("d - Remove item from cart");
        System.out.println("c - Change item quantity");
        System.out.println("i - Output items' descriptions");
        System.out.println("o - Output shopping cart");
        System.out.println("q - Quit");
        System.out.print("\nChoose an option:");
        String choice = sc.next();
        while(choice != "q")
        {
            if(choice != "a" && choice != "d" && choice != "c" && choice != "i" && choice != "o")
            {
                
                System.out.println("Choose an option:");
                choice = sc.next();
                continue;
            }
            else
            {
                switch (choice)
                {
                    case "o":
                    {
                        System.out.println("OUTPUT SHOPPING CART");
                        cart.printTotal();
                        break;
                    }

                    case "i":
                    {
                        System.out.println("OUTPUT ITEMS' DESCRIPTIONS");
                        cart.printDescriptions();
                        break;
                    }

                    case "a":
                    {
                        String name, desc;
                        int price, qty;
                        System.out.println("ADD ITEM TO CART");
                        System.out.println("Enter item name:");
                        name = sc.nextLine();
                        sc.nextLine();
                        System.out.println("Enter the item description:");
                        desc = sc.nextLine();
                        System.out.println("Enter the item price:");
                        price = sc.nextInt();
                        sc.nextLine();
                        System.out.println("Enter the item quantity:");
                        qty = sc.nextInt();
                        sc.nextLine();

                        ItemToPurchase itemToPurchase = new ItemToPurchase(name, desc, qty, price);
                        cart.addItem(itemToPurchase);
                        break;
                    }

                    case "d":
                    {
                        String itemToRemove;
                        System.out.println("REMOVE ITEM FROM CART");
                        System.out.println("Enter name of item to remove:");
                        itemToRemove = sc.nextLine();
                        cart.removeItem(itemToRemove);
                        break;
                    }

                    case "c":
                    {
                        String itemName;
                        int itemQty;
                        System.out.println("CHANGE ITEM QUANTITY");
                        System.out.println("Enter item name:");
                        itemName = sc.nextLine();
                        System.out.println("Enter the new quantity:");
                        itemQty = sc.nextInt();
                        sc.nextLine();

                        ItemToPurchase item = new ItemToPurchase(itemName, "none", itemQty, 0);
                        cart.modifyItem(item);
                        break;
                    }
                }
                System.out.println("\nMENU");
                System.out.println("a - Add item to cart");
                System.out.println("d - Remove item from cart");
                System.out.println("c - Change item quantity");
                System.out.println("i - Output items' descriptions");
                System.out.println("o - Output shopping cart");
                System.out.println("q - Quit");
                System.out.print("\nChoose an option:");
                choice = sc.next();
            }
        }
    }
}