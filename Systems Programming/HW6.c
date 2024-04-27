/*JAYPATEL*/
/* Server code */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/select.h>
#define BUF_SIZE 1024
#define LISTEN_PORT 8080

int main(int argc, char *argv[])
{ 
	int sock_listen, sock_recv;
	int i, addr_size, bytes_received;
	int incoming_len;
	int recv_msg_size;
	int max_fd, fd;
	struct sockaddr_in my_addr, recv_addr;
	int select_ret;
	
	fd_set readfds, activefds;

	struct timeval timeout={0,0};	
	struct sockaddr remote_addr;
	
	char buf[BUF_SIZE];

	/* create socket for listening */
	sock_listen = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
	if (sock_listen < 0)
	{
		printf("socket() failed\n");
		exit(0);
	}

	/* make local address structure */
	memset(&my_addr, 0 sizeof(my_addr));
	my_addr.sin_family = AF_INET;
	my_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	my_addr.sin_port = htons((unsigned short)LISTEN_PORT);

	/* bind socket to the local address */
	i = bind(sock_listen, (struct sockaddr *) &my_addr, sizeof(my_addr));
	if (i < 0)
	{
		printf("bind() failed\n");
		exit(0);
	}

	/* listen */
	i = listen(sock_listen, 5);
	if (i < 0)
	{
		printf("listen() failed\n");
		exit(0);
	}

	/* get new socket to receive data on */
	FD_ZERO(&activefds);
    FD_SET(sock_listen, &activefds);
    max_fd = sock_listen;

   while (1)
   {
       readfds = activefds;
       select_ret = select(max_fd+1, &readfds, NULL, NULL, &timeout);

       if (select_ret < 0)
       {
           printf("select() failed\n");
           exit(0);
       }

       for (fd = 0; fd <= max_fd; fd++)
       {
           if (FD_ISSET(fd, &readfds))
           {
               if (fd == sock_listen)
               {
                   addr_size = sizeof(recv_addr);
                   sock_recv = accept(sock_listen, (struct sockaddr *) &recv_addr, &addr_size);
                   FD_SET(sock_recv, &activefds);
                   if (sock_recv > max_fd)
                       max_fd = sock_recv;

                   printf("New client connected %s:%d\n", inet_ntoa(recv_addr.sin_addr), ntohs(recv_addr.sin_port));
               }
               else
               {
                   bytes_received = recv(fd, buf, BUF_SIZE, 0);
                   if (bytes_received <= 0)
                   {
                       printf("Client disconnected\n");
                       close(fd);
                       FD_CLR(fd, &activefds);
                   }
                   else
                   {
                       buf[bytes_received] = 0;
                       printf("Received from client %d: %s\n", fd, buf);
                       if (strcmp(buf, "shutdown") == 0)
                       {
                           printf("Shutting down server...\n");
                           close(fd);
                           FD_CLR(fd, &activefds);
                           close(sock_listen);
                           exit(0);
                       }
                   }
               }
           }
       }
   }

   close(sock_listen);
}


/* Client code */

#define BUF_SIZE 1024
#define SERVER_IP "127.0.0.1"
#define SERVER_PORT 8080

int main(int argc, char *argv[])
{
	int sock_send;
	int i;
	int send_len, bytes_sent;

	char text[80], buf[BUF_SIZE];

	struct sockaddr_in addr_send;

	/* create socket for sending data */
	sock_send = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
	if (sock_send < 0)
	{
		printf("socket() failed\n");
		exit(0);
	}

	/* create socket address structure to connect to */
	memset(&addr_send, 0, sizeof(addr_send));
	addr_send.sin_family = AF_INET;
	addr_send.sin_addr.s_addr = inet_addr(SERVER_IP);
	addr_send.sin_port = htons((unsigned short) SERVER_PORT);

	/* connect to server */
	i = connect(sock_send, (struct sockaddr *) &addr_send, sizeof(addr_send));	
	if (i < 0)
	{
		printf("connect() failed\n");
		exit(0);
	}

	while (1)
	{
		/* send some data */
		printf("Send? ");
		scanf("%s", text);
		if (strcmp(text, "quit") == 0)
			break;

		strcpy(buf, text);
		send_len = strlen(text);
		bytes_sent = send(sock_send, buf, send_len, 0);
	}

	close(sock_send);
}


	