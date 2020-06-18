FROM electron_builder:1.0.3

COPY . /root/electron_build/electron_build_docker/entrypoint.sh /root/entrypoint.sh

RUN chmod 777 -R /root/electron_build

EXPOSE 3300

ENTRYPOINT [ "/root/entrypoint.sh" ]