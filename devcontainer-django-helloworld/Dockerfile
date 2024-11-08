FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

#Commented out because im just using this for dev container base

#COPY . .
#EXPOSE 8000
#RUN cd myproject
#CMD [ "python", "manage.py", "runserver"]
