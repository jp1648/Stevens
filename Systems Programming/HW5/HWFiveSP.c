#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <math.h>
#include <limits.h>

// Signal handler for division by zero and overflow
void signal_handler(int signum) {
    switch (signum) {
        case SIGFPE:
            printf("Error: Division by zero or floating-point exception occurred.\n");
            break;
        case SIGSEGV:
            printf("Error: Floating-point overflow occurred.\n");
            break;
        default:
            printf("Unknown error occurred.\n");
            break;
    }
    exit(1);
}

int main() {
    // Set signal handlers
    signal(SIGFPE, signal_handler);
    signal(SIGSEGV, signal_handler);

    // Create the child process
    pid_t pid = fork();

    if (pid < 0) {
        perror("Fork failed.");
        exit(1);
    } else if (pid == 0) {
        // Child process

        // Floating-point calculation
        float num1, num2, result;
        printf("Enter two floating-point numbers: ");
        if (scanf("%f %f", &num1, &num2) != 2) {
            printf("Invalid input. Exiting child process.\n");
            exit(1);
        }

        // Check for division by zero
        if (fabs(num2) < 1e-6) {
            printf("Error: Division by zero is not allowed.\n");
            exit(1);
        }

        // Division
        result = num1 / num2;
        printf("Result of floating-point division: %f\n", result);

        // Floating-point multiplication
        float product = num1 * num2;
        // Check for floating-point overflow
        if (isfinite(product)) {
            // Multiply by 1 billion
            product *= 1e9;
            printf("Product after multiplying by 1 billion: %f\n", product);
        } else {
            raise(SIGSEGV); // Raise signal for overflow
        }

        // Integer calculation
        int intNum1, intNum2;
        printf("Enter two integer numbers: ");
        if (scanf("%d %d", &intNum1, &intNum2) != 2) {
            printf("Invalid input. Exiting child process.\n");
            exit(1);
        }

        // Check for integer division by zero
        if (intNum2 == 0) {
            printf("Error: Integer division by zero is not allowed.\n");
            exit(1);
        }

        // Integer division
        int intResult = intNum1 / intNum2;
        printf("Result of integer division: %d\n", intResult);

        // Integer multiplication
        long long int intProduct = (long long int)intNum1 * intNum2;
        // Check for integer overflow
        if (intProduct <= INT_MAX) {
            // Multiply by 1 billion
            intProduct *= 1000000000LL;
            printf("Product after multiplying by 1 billion: %lld\n", intProduct);
        } else {
            raise(SIGFPE); // Raise signal for overflow
        }

    } else {
        // Parent process
        wait(NULL); // Wait for the child process to finish
        printf("Child process has finished.\n");
    }

    return 0;
}