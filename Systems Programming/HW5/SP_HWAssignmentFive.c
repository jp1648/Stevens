//JAY PATEL//
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <math.h>
#include <limits.h>
#include <sys/wait.h>

void sig_handler(int signum) {
    const char *error_messages[] = {
        "Unknown error occurred.",
        "Error: Divided by zero or FPE occurred.",
        "Error: Floating-point overflow occurred."
    };
    printf("%s\n", error_messages[signum]);
    exit(signum);
}

void perform_floating_point_operations() {
    float num1, num2;
    printf("Enter two floating-point numbers: ");
    if (scanf("%f %f", &num1, &num2) != 2) {
        printf("Invalid input. Exiting child process.\n");
        exit(SIGFPE);
    }

    if (fabs(num2) < 1e-6) {
        printf("Error: Dividing by zero is not allowed.\n");
        exit(SIGFPE);
    }

    float result = num1 / num2;
    printf("Result of floating-point division: %f\n", result);

    float product = num1 * num2;
    if (isfinite(product)) {
        product *= 1e9;
        printf("Product after multiplying by 1 billion: %f\n", product);
    } else {
        raise(SIGSEGV);
    }
}

void perform_integer_operations() {
    int intNum1, intNum2;
    printf("Enter two integer numbers: ");
    if (scanf("%d %d", &intNum1, &intNum2) != 2) {
        printf("Invalid input. Exiting child process.\n");
        exit(SIGFPE);
    }

    if (intNum2 == 0) {
        printf("Error: Integer division by zero is not allowed.\n");
        exit(SIGFPE);
    }

    int intResult = intNum1 / intNum2;
    printf("Result of integer division: %d\n", intResult);

    long long int intProduct = (long long int)intNum1 * intNum2;
    if (intProduct <= INT_MAX) {
        intProduct *= 1000000000LL;
        printf("Product after multiplying by 1 billion: %lld\n", intProduct);
    } else {
        raise(SIGFPE);
    }
}

int main() {
    signal(SIGFPE, sig_handler);
    signal(SIGSEGV, sig_handler);

    pid_t pid = fork();

    if (pid < 0) {
        perror("Fork failed.");
        exit(EXIT_FAILURE);
    } else if (pid == 0) {
        // Child process
        perform_floating_point_operations();
        perform_integer_operations();
    } else {
        // Parent process
        int status;
        if (wait(&status) == -1) {
            perror("Error waiting for child process.");
            exit(EXIT_FAILURE);
        }

        if (WIFEXITED(status)) {
            printf("Child process has finished.\n");
        } else {
            printf("Child process terminated abnormally.\n");
        }
    }

    return 0;
}
