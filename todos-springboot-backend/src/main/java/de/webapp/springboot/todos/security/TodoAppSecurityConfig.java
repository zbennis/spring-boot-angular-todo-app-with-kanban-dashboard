package de.webapp.springboot.todos.security;

import de.webapp.springboot.todos.todo.mapper.TodoMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;


@Configuration
public class TodoAppSecurityConfig  {

    //@Override
    //protected void configure(HttpSecurity http) throws Exception {
        //http
                //.csrf().disable()
                //.authorizeRequests()
                //.antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                //.anyRequest().authenticated()
                //.and()
                //.formLogin().and()
                //.httpBasic();
    //}


    @Bean
    public TodoMapper todoMapper() {
       return Mappers.getMapper(TodoMapper.class);
    }

}
