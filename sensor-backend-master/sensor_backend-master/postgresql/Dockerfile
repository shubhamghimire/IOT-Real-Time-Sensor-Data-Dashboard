FROM postgres:12-alpine
MAINTAINER Shubham Ghimire

# Allow connections; we don't map out any ports so only linked docker containers can connect
RUN echo "host all  all    0.0.0.0/0  md5" >> /var/lib/postgresql/data/pg_hba.conf

# Customize default user/pass/db
ENV POSTGRES_DB realtime_db
ENV POSTGRES_USER realtime_user
ENV POSTGRES_PASSWORD realtime_password

# Include extra setup scripts (eg datastore)
ADD docker-entrypoint-initdb.d /docker-entrypoint-initdb.d