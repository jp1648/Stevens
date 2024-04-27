import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

// enum to associate levels of flyer status
enum FlyerStatus {
  SUPER,
  PLATINUM,
  GOLD,
  SILVER,
}
// Flyer class
class Flyer {
  private String name;
  private FlyerStatus status;
  private long waitingTime;

  public Flyer(String name, FlyerStatus status, long waitingTime) {
    this.name = name;
    this.status = status;
    this.waitingTime = waitingTime;
  }
  public String getName() {
    return name;
  }
  public FlyerStatus getStatus() {
    return status;
  }
  public long getWaitingTime() {
    return waitingTime;
  }
}
// Upgrade request class
class UpgradeReq {
  private String confirmationCode;
  private Flyer flyer;

  public UpgradeReq(String confirmationCode, Flyer flyer) {
    this.confirmationCode = confirmationCode;
    this.flyer = flyer;
  }
  public String getConfirmationCode() {
    return confirmationCode;
  }
  public Flyer getFlyer() {
    return flyer;
  }
}
// Comparator for comparing UpgradeRequests
class ReqCompare implements Comparator<UpgradeReq> {

  @Override
  public int compare(UpgradeReq r1, UpgradeReq r2) {
    Flyer f1 = r1.getFlyer();
    Flyer f2 = r2.getFlyer();
    if (f1.getStatus() != f2.getStatus()) {
      // Status comes before the waiting time
      return f1.getStatus().ordinal() - f2.getStatus().ordinal();
    } else {
      return Long.compare(f1.getWaitingTime(), f2.getWaitingTime());
    }
  }
}
// MAnages the upgrade requests and edit the waiting list as such
class UpgradeSystem {
  
  private PriorityQueue<UpgradeReq> waitingList;
  private Map<String, UpgradeReq> requests;
  
  public UpgradeSystem() {
    requests = new HashMap<>();
    waitingList = new PriorityQueue<>(new ReqCompare());
  }

  // Make request to upgrade and add to the waiting list
  public void requestUpgrade(UpgradeReq request) {
    requests.put(request.getConfirmationCode(), request);
    waitingList.add(request);
  }

  // Cancel an upgrade 
  public void cancelUpgrade(String confirmationCode) {
    UpgradeReq request = requests.get(confirmationCode);
    if (request != null) {
      requests.remove(confirmationCode);
      waitingList.remove(request);
    }
  }

  // Return k-highest priority flyers
  public List<Flyer> getHighestPriorityFlyers(int k) {
    List<Flyer> result = new ArrayList<>();
    for (int i = 0; i < k; i++) {
      UpgradeReq request = waitingList.poll();
      if (request == null) {
        break;
      }
      result.add(request.getFlyer());
    }
    return result;
  }
}