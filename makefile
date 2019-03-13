default:
	javac *.java
run:
	java -cp ".:sqlite-jdbc-3.23.1.jar" Main
clean:
	rm *.class