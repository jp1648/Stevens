import java.util.List;

public class TestCases {

    public static void main(String[] args) {
        testUpgradeSystem();
    }
    public static void testUpgradeSystem() {
        // Upgrade System object is made
        UpgradeSystem upgradeSystem = new UpgradeSystem();

        // flyer objects
        Flyer f1 = new Flyer("Jay", FlyerStatus.GOLD, 100);
        Flyer f2 = new Flyer("Professor",FlyerStatus.PLATINUM,50);
        Flyer f3 = new Flyer("Bill",FlyerStatus.SILVER,50);
        Flyer f4 = new Flyer("Janet",FlyerStatus.GOLD,150);
        Flyer f5 = new Flyer("Monique",FlyerStatus.PLATINUM,75);

        // Request upgrades for the  flyers
        UpgradeReq r1 = new UpgradeReq("CODE1", f1);
        UpgradeReq r2 = new UpgradeReq("CODE2", f2);
        UpgradeReq r3 = new UpgradeReq("CODE3", f3);
        UpgradeReq r4 = new UpgradeReq("CODE4", f4);
        UpgradeReq r5 = new UpgradeReq("CODE5", f5);
        upgradeSystem.requestUpgrade(r1);
        upgradeSystem.requestUpgrade(r2);
        upgradeSystem.requestUpgrade(r3);
        upgradeSystem.requestUpgrade(r4);
        upgradeSystem.requestUpgrade(r5);

        // Cancel an upgrade request
        upgradeSystem.cancelUpgrade("CODE4");

        // Get the k (3) highest-priority frequent flyers on the waiting list
        List<Flyer> highestPriorityFlyers = upgradeSystem.getHighestPriorityFlyers(3);
        for (Flyer f : highestPriorityFlyers) {
          System.out.println(f.getName());
        }
      
    

        // Assertions
        assert highestPriorityFlyers.size() == 3;
        assert highestPriorityFlyers.get(0).getName().equals("Jay");
        assert highestPriorityFlyers.get(1).getName().equals("Professor");
        assert highestPriorityFlyers.get(2).getName().equals("Bill");
    
    }
}
