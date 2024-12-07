# Specify the AWS provider
provider "aws" {
  region = "us-west-2" # Replace with your preferred AWS region
}

# Create an EC2 instance
resource "aws_instance" "hello_world" {
  ami           = "ami-0c55b159cbfafe1f0" # Replace with an AMI ID valid for your region
  instance_type = "t2.micro"              # Small instance to keep costs low

  # User data script to serve "Hello, World!" on a web server
  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World!" > /var/www/html/index.html
              yum install -y httpd
              systemctl start httpd
              EOF

  tags = {
    Name = "HelloWorldInstance"
  }
}

# Output the instance's public IP address
output "instance_ip" {
  value = aws_instance.hello_world.public_ip
  description = "The public IP of the Hello World instance"
}
