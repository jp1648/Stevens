#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

#define LOWER_CYLINDER 0
#define UPPER_CYLINDER 4999
#define MAX_REQUESTS 1000

void FCFS(int initial, int *req, int num_req);
void SSTF(int initial, int *req, int num_req);
void SCAN(int initial, int *req, int num_req);
void CSCAN(int initial, int *req, int num_req);
void LOOK(int initial, int *req, int num_req);
void CLOOK(int initial, int *req, int num_req);
int abs_diff(int a, int b);
int cmpfunc(const void *a, const void *b);

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s initial\n", argv[0]);
        return 1;
    }

    int initial = atoi(argv[1]);

    FILE *file = fopen("request.txt", "r");
    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    int req[MAX_REQUESTS];
    int num_req = 0;
    int cylinder;

    while (fscanf(file, "%d,", &cylinder) != EOF) {
        if (cylinder < LOWER_CYLINDER)
            cylinder = LOWER_CYLINDER;
        if (cylinder > UPPER_CYLINDER)
            cylinder = UPPER_CYLINDER;
        req[num_req++] = cylinder;
    }

    fclose(file);


    printf("\nFCFS:\n");
    FCFS(initial, req, num_req);
    
    printf("\nSSTF:\n");
    SSTF(initial, req, num_req);

    printf("\nSCAN:\n");
    SCAN(initial, req, num_req);

    printf("\nC-SCAN:\n");
    CSCAN(initial, req, num_req);

    printf("\nLOOK:\n");
    LOOK(initial, req, num_req);

    printf("\nC-LOOK:\n");
    CLOOK(initial, req, num_req);

    return 0;
}

int abs_diff(int a, int b) {
    return abs(a - b);
}


int cmpfunc(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}
void SSTF(int initial, int *req, int num_req) {
    int tot = 0;
    int cur = initial;
    int serviced[num_req]; 
    
    for (int i = 0; i < num_req; i++) {
        serviced[i] = 0;
    }

    printf("SSTF Order: ");
    for (int i = 0; i < num_req; i++) {
        int min_distance = INT_MAX;
        int next_req_index = -1;

        for (int j = 0; j < num_req; j++) {
            if (!serviced[j]) {
                int distance = abs(cur - req[j]);
                if (distance < min_distance) {
                    min_distance = distance;
                    next_req_index = j;
                }
            }
        }

        tot += min_distance;
        cur = req[next_req_index];
        serviced[next_req_index] = 1;

        printf("%d ", req[next_req_index]);
    }

    printf("\nTotal head movement: %d\n", tot);
}


void FCFS(int initial, int *req, int num_req) {
    int tot = 0;
    int cur = initial;

    printf("FCFS Order: ");
    for (int i = 0; i < num_req; i++) {
        tot += abs(cur - req[i]);
        printf("%d ", req[i]);
        cur = req[i];
    }
    printf("\nTotal head movement for FCFS: %d\n", tot);
}




void SCAN(int initial, int *req, int num_req) {
    qsort(req, num_req, sizeof(int), cmpfunc);

    int tot = 0;
    int cur = initial;
    int direction = 1; 

    int i;
    for (i = 0; i < num_req; i++) {
        if (req[i] >= cur) {
            break;
        }
    }

    while (i < num_req && i >= 0) {
        tot += abs_diff(cur, req[i]);
        cur = req[i];
        printf("%d ", req[i]);
        i += direction;
    }

    if (i < num_req && i >= 0) {
        direction = -direction;
        cur = initial;
        i += direction;

        while (i < num_req && i >= 0) {
            tot += abs_diff(cur, req[i]);
            cur = req[i];
            printf("%d ", req[i]);
            i += direction;
        }
    }

    printf("\nTotal head movement: %d\n", tot);
}


void CSCAN(int initial, int *req, int num_req) {
    qsort(req, num_req, sizeof(int), cmpfunc);
    int tot = 0, cur = initial, index = 0;

    while (index < num_req && req[index] < initial) {
        index++;
    }

    for (int i = index; i < num_req; i++) {
        printf("%d ", req[i]);
        tot += abs_diff(cur, req[i]);
        cur = req[i];
    }

    if (index > 0) { 
        tot += abs_diff(cur, UPPER_CYLINDER) + UPPER_CYLINDER;
        cur = LOWER_CYLINDER;

        for (int i = 0; i < index; i++) {
            printf("%d ", req[i]);
            tot += abs_diff(cur, req[i]);
            cur = req[i];
        }
    }

    printf("\nTotal head movement: %d\n", tot);
}

void LOOK(int initial, int *req, int num_req) {
    qsort(req, num_req, sizeof(int), cmpfunc);
    int tot = 0, cur = initial, index = 0;

    while (index < num_req && req[index] < initial) {
        index++;
    }

    for (int i = index; i < num_req; i++) {
        printf("%d ", req[i]);
        tot += abs_diff(cur, req[i]);
        cur = req[i];
    }

    for (int i = index - 1; i >= 0; i--) {
        printf("%d ", req[i]);
        tot += abs_diff(cur, req[i]);
        cur = req[i];
    }

    printf("\nTotal head movement: %d\n", tot);
}

void CLOOK(int initial, int *req, int num_req) {
    qsort(req, num_req, sizeof(int), cmpfunc);
    int tot = 0, cur = initial, index = 0;

    while (index < num_req && req[index] < initial) {
        index++;
    }

        for (int i = index; i < num_req; i++) {
        printf("%d ", req[i]);
        tot += abs_diff(cur, req[i]);
        cur = req[i];
    }

    if (index > 0) { 
        tot += abs_diff(cur, req[0]) + abs_diff(req[0], req[index-1]);
        cur = req[0];
        
        for (int i = 0; i < index; i++) {
            printf("%d ", req[i]);
            tot += abs_diff(cur, req[i]);
            cur = req[i];
        }
    }

    printf("\nTotal head movement: %d\n", tot);
}

