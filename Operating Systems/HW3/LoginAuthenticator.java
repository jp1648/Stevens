
import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LoginAuthenticator {
    private static final String LOGIN_FILE = "LoginsAndPasswords.txt";
    private static final String LOG_FILE = "signIn.txt";
    private static Map<String, String> credentials = new HashMap<>();
    private static final int MAX_ATTEMPTS = 3;

    public static void main(String[] args) {
        loadCredentials();
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter login ID: ");
        String loginId = scanner.nextLine();

        if (credentials.containsKey(loginId)) {
            int attempts = 0;
            while (attempts < MAX_ATTEMPTS) {
                System.out.print("Enter password for " + loginId + ": ");
                String password = scanner.nextLine();

                if (authenticate(loginId, password)) {
                    logAttempt(loginId, true);
                    System.out.println("Login successful");
                    break;
                } else {
                    logAttempt(loginId, false);
                    System.out.println("Incorrect password.");
                    attempts++;
                }
            }

            if (attempts == MAX_ATTEMPTS) {
                System.out.println("Account has been locked out for 1 hour.");
            }
        } else {
            System.out.println("Login ID does not exist.");
            logAttempt(loginId, false);  
        }

        scanner.close();
    }

    private static void loadCredentials() {
        try {
            List<String> lines = Files.readAllLines(Paths.get(LOGIN_FILE));
            for (String line : lines) {
                String[] parts = line.split(",");
                credentials.put(parts[0].trim(), parts[1].trim());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static boolean authenticate(String loginId, String password) {
        return credentials.get(loginId).equals(password);
    }

    private static void logAttempt(String loginId, boolean success) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String logMessage = String.format("%s - Login attempt for %s %s\n", timestamp, loginId, success ? "successful" : "unsuccessful");

        try (FileWriter fw = new FileWriter(LOG_FILE, true);
             BufferedWriter bw = new BufferedWriter(fw);
             PrintWriter out = new PrintWriter(bw)) {
            out.print(logMessage);
        } catch (IOException e) {
            System.err.println("Error logging.");
            e.printStackTrace();
        }
    }
}
