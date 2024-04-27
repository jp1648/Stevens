import java.util.ArrayList;

class ShoppingCart {
    private String customerName;
    private String currentDate;
    private ArrayList<ItemToPurchase> cartItems;

    
    public ShoppingCart()
    {
    	customerName = "none";
    	currentDate = "January 1, 2016";
    	cartItems = new ArrayList<ItemToPurchase>();
    }

    
    public ShoppingCart(String customerName, String currentDate)
    {
        this.customerName = customerName;
        this.currentDate = currentDate;
        this.cartItems = new ArrayList<ItemToPurchase>(); 
        
    }
    
    public String getCustomerName() {
    	return customerName; 
    	
    }
    
    public String getDate()
    {
        return currentDate;
    }

   
    public void addItem(ItemToPurchase itemToPurchase)
    {
        
            cartItems.add(itemToPurchase);
    
    }

   
    public void removeItem(String itemName)
    {
    	boolean found = false;
    	
    	for(int i = 0; i<cartItems.size(); ++i) {
    		
    		if (cartItems.get(i).getName().equals(itemName)){
    			cartItems.remove(i);
    		found = true;
    		break;
    		}
    	} if(!found) {
    		System.out.println("Item not found in cart. Nothing removed."); 
    		
    	}
    }

    
    public void modifyItem(ItemToPurchase itemToPurchase)
    {
        boolean itemFound = false;
       
        for(int i = 0; i<cartItems.size(); ++i)
        {
            if(cartItems.get(i).equals(itemToPurchase))
            {
                itemFound = true;
                //Checking if itemToPurchaseToPurchase has default value for description
                if(!itemToPurchase.getDescription().equals("none"))
                {
                    itemToPurchase.setDescription(itemToPurchase.getDescription());
                }
                //Checking if itemToPurchaseToPurchase has default value for quantity
                if(itemToPurchase.getQuantity() != 0)
                {
                    itemToPurchase.setQuantity(itemToPurchase.getQuantity());
                }
                //Checking if itemToPurchaseToPurchase has default value for price
                if(itemToPurchase.getPrice() != 0)
                {
                    itemToPurchase.setPrice(itemToPurchase.getPrice());
                }
            }
        }
            if(itemFound != true)
            {
                System.out.println("Item not found in cart. Nothing modified");
            }
        }
    

   
    public int getNumItemsInCart()
    {
        int totalQuantity = 0;
        for(int i = 0; i<cartItems.size(); ++i)
            {
                totalQuantity += cartItems.get(i).getQuantity();
            }
        
        return totalQuantity;
    }

    
    public int getCostOfCart()
    {
        int totalCostOfCart = 0;
       
        for(int i = 0; i<cartItems.size(); ++i)
            {
                totalCostOfCart += (cartItems.get(i).getQuantity() * cartItems.get(i).getPrice());
            }
        
        return totalCostOfCart;
    }

    
    public void printTotal()
    {
        if(cartItems == null || cartItems.size() == 0)
        {
           
            System.out.println(customerName+"\'s"+" Shopping Cart - "+currentDate);
            System.out.println("Number of Items: "+getNumItemsInCart());
            System.out.println("\nSHOPPING CART IS EMPTY.");
            System.out.println("\nTotal: $"+getCostOfCart());
            return;
        }

        System.out.println(customerName+"\'s"+" Shopping Cart - "+currentDate);
        System.out.println("Number of Items: "+getNumItemsInCart());
        for(int i = 0; i<cartItems.size(); ++i)
        {
            cartItems.get(i).printItemCost();
        }
        System.out.println("Total: $"+getCostOfCart());
    }

    
    public void printDescriptions()
    {
        if(cartItems == null || cartItems.size() == 0)
        {
            System.out.println("SHOPPING CART IS EMPTY");
            return;
        }
        System.out.println(customerName+"\'s"+" Shopping Cart - "+currentDate);
        System.out.println("\nItem Descriptions");
        for(int i = 0; i<cartItems.size(); ++i)
        {
            cartItems.get(i).printItemDescription();
        }
    }
}