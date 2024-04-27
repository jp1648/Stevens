
public class ItemToPurchase {
	   private String itemName;
	   private int itemPrice;
	   private int itemQuantity;
	   private String itemDescription;
	   
	   public ItemToPurchase() {
	      itemName = "none";
	      itemDescription = "none";
	      itemPrice = 0;
	      itemQuantity = 0;
	      return;
	   }
	   
	   
	   public ItemToPurchase(String itemName, String itemDescription, int itemPrice, int itemQuantity) {
		      this.itemName = itemName;
		      this.itemDescription = itemDescription;
		      this.itemPrice = itemPrice;
		      this.itemQuantity = itemQuantity;
		      return;
		   }
	   
	   public void setName(String name) {
	      itemName = name;
	      return;
	   }
	   
	   public void setPrice(int price) {
	      itemPrice = price;
	      return;
	   }
	   
	   public void setQuantity(int quantity) {
	      itemQuantity = quantity;
	      return;
	   }
	   
	   public String getName() {
	      return itemName;
	   }
	   
	   public int getPrice() {
	      return itemPrice;
	   }
	   
	   public int getQuantity() {
	      return itemQuantity;
	   }
	   
	   
	   public void setDescription(String description) {
		   this.itemDescription = description;

	   }
	   
	   public String getDescription() {
		   return itemDescription;

	   }
	   
	   
	   public void printItemCost() {
		   System.out.println(itemName + " " + itemQuantity + " @ " +  itemPrice + " = " + itemQuantity * itemPrice );
	   }
	   
	   public void printItemDescription() {
		   System.out.println(itemName + ": " + itemDescription);
	   }

	   public void printItemPurchase() {
	      System.out.println(itemQuantity + " " + itemName + " $" + itemPrice +  
	                         " = $" + (itemPrice * itemQuantity));
	   }
	}
