#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[5];
    int priority;
    int burst;
    int timeInProcessor;
} Process;

// This file executes jobs by the priorirty first scheduling algorithm


typedef struct Node {
    Process data;
    struct Node* next;
} Node;

Node* createNode(Process proc) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        printf("Memory alloc failed\n");
        exit(1);
    }
    newNode->data = proc;
    newNode->next = NULL;
    return newNode;
}

void insertNode(Node** head, Process proc) {
    Node* newNode = createNode(proc);
    if (*head == NULL) {
        *head = newNode;
    } else {
        Node* temp = *head;
        while (temp->next != NULL) {
            temp = temp->next;
        }
        temp->next = newNode;
    }
}

void removeNode(Node** head, Node* removeNode) {
    if (*head == removeNode) {
        *head = (*head)->next;
    } else {
        Node* temp = *head;
        while (temp->next != removeNode) {
            temp = temp->next;
        }
        temp->next = removeNode->next;
    }
    free(removeNode);
}

void displayExecutionOrder(Node* head) {
    if (head == NULL) {
        printf("No processes.\n");
        return;
    }

    printf("Process Name\tPriority\tBurst Time\tExecution Time\n");
    while (head != NULL) {
        printf("%s\t\t%d\t\t%d\t\t%d\n", head->data.name, head->data.priority, head->data.burst, head->data.burst);
        head = head->next;
    }
}

int main() {
    FILE* file = fopen("schedule.txt", "r");
    if (file == NULL) {
        printf("Error opening file.\n");
        return 1;
    }

    Node* head = NULL;
    char line[50];
    while (fgets(line, sizeof(line), file)) {
        Process proc;
        sscanf(line, "%[^,], %d, %d", proc.name, &proc.priority, &proc.burst);
        proc.timeInProcessor = 0;
        insertNode(&head, proc);
    }
    fclose(file);

    Node* current = head;
    Node* executedProcesses = NULL;
    while (current != NULL) {
        Node* highestPriority = current;
        Node* temp = current->next;
        while (temp != NULL) {
            if (temp->data.priority > highestPriority->data.priority) { 
                highestPriority = temp;
            }
            temp = temp->next;
        }
        insertNode(&executedProcesses, highestPriority->data);
        removeNode(&current, highestPriority);
    }

    displayExecutionOrder(executedProcesses);
  
  
    Node* temp;
    while (executedProcesses != NULL) {
        temp = executedProcesses;
        executedProcesses = executedProcesses->next;
        free(temp);
    }

    return 0;
}
            