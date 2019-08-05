package de.webapp.springboot.todos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.sql.DataSource;

@SpringBootApplication
public class SpringApp implements CommandLineRunner {

    @Autowired
    private DataSource dataSource;

    public static void main(String[] args) {
        SpringApplication.run(SpringApp.class,args);
    }


    @Override
    public void run(String... args) throws Exception {
        System.out.println("Datasource = "+dataSource);
        System.out.println("Connection is not closed = "+!dataSource.getConnection().isClosed());
        System.out.println(dataSource.getConnection().getMetaData());
    }
}
