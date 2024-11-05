# define the base image
FROM alpine:latest

#copy hello.sh script into container
COPY hello.sh /hello.sh

#make executable
RUN chmod +x /hello.sh

#default command to run the script
CMD ["/hello.sh"]