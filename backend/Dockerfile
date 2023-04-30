FROM maven:3.9.0-eclipse-temurin-17 as builder

COPY pom.xml pom.xml
COPY src src

RUN mvn package -DskipTests

FROM eclipse-temurin:17-jre-focal as runtime

COPY --from=builder ./target/backend-0.0.1-SNAPSHOT.jar ./backend.jar

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar backend.jar ${0} ${@}"]